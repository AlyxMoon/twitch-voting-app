const path = require('path')
const fetch = require('isomorphic-unfetch')

const routes = require('express').Router()
const config = require(path.join(__dirname, '..', 'config', 'games'))
const { buildQueryParamsString } = require(path.join(__dirname, '..', 'util'))

routes.get('/search/:search', (req, res) => {
  res.setHeader('Content-Type', 'application/json')

  let query = {
    api_key: config.apiKey,
    field_list: 'name,guid',
    format: 'json',
    query: req.params.search,
    resources: 'game'
  }

  paginateResults(`${config.endpoint}/search`, query)
    .then(results => res.json(results))
    .catch(error => res.json(error))
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
