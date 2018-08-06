const path = require('path')
const fetch = require('isomorphic-unfetch')
const { differenceInHours } = require('date-fns')

const routes = require('express').Router()
const db = require(path.join(__dirname, '..', '..', 'db'))
const config = require(path.join(__dirname, '..', '..', 'config', 'games'))
const { buildQueryParamsString } = require(path.join(__dirname, '..', '..', 'util'))

routes.get('/search/:search', (req, res) => {
  res.setHeader('Content-Type', 'application/json')

  let search = req.params.search
  let query = {
    api_key: config.apiKey,
    field_list: 'name,guid',
    format: 'json',
    query: search,
    resources: 'game'
  }
  let filters = {
    search
  }

  db.find({ model: 'GameSearch', filters })
    .then(data => {
      if (data.length > 0) {
        if (differenceInHours((new Date()), data[0].updatedAt) < config.cacheFor) {
          return data[0]
        } else {
          return new Promise(resolve => {
            paginateResults(`${config.endpoint}/search`, query)
              .then(results => {
                resolve(db.update({
                  model: 'GameSearch',
                  id: data[0].id,
                  data: { search, results }
                }))
              })
          })
        }
      }

      return new Promise(resolve => {
        paginateResults(`${config.endpoint}/search`, query)
          .then(results => {
            resolve(db.create({
              model: 'GameSearch',
              data: { search, results }
            }))
          })
      })
    })
    .then(result => res.json({ sucess: true, data: result }))
    .catch(error => res.json({ success: false, error: error.message }))
})

module.exports = routes

const paginateResults = (url, queryParams, page = 1, results = []) => {
  queryParams.page = page
  let query = buildQueryParamsString(queryParams)

  return fetch(`${url}${query}`)
    .then(result => result.json())
    .then(result => {
      results = results.concat(result.results)
      if (result.number_of_page_results === result.limit) {
        return paginateResults(url, queryParams, page + 1, results)
      } else {
        return results
      }
    })
}