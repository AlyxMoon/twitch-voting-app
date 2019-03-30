const path = require('path')
const fetch = require('isomorphic-unfetch')
const { differenceInHours } = require('date-fns')

const routes = require('express').Router()
const db = require(path.join(__dirname, '..', '..', 'db'))
const config = require(path.join(__dirname, '..', '..', 'config', 'games'))
const { buildQueryParamsString } = require(path.join(__dirname, '..', '..', 'util'))

routes.get('/', (req, res) => {
  db.find({ model: 'Game' })
    .then(response => res.json({ success: true, data: response }))
    .catch(error => {
      console.error(error.message, error.stack)
      return res.json({ success: false, error: error.message })
    })
})

routes.post('/', (req, res) => {
  res.setHeader('Content-Type', 'application/json')

  let { data } = req.body
  if (!data) {
    return res.json({ success: false, error: 'a required field was not included' })
  }

  db.findOrCreate({ model: 'Game', key: 'guid', data })
    .then(response => {
      res.json({ success: true, data: response })
    })
    .catch(error => {
      console.error(error.message, error.stack)
      res.json({ success: false, error: error.message })
    })
})

routes.get('/searchByID/:id', (req, res) => {
  res.setHeader('Content-Type', 'application/json')

  let search = req.params.id
  let query = {
    api_key: config.apiKey,
    format: 'json'
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
            paginateResults(`${config.endpoint}/game/${search}`, query)
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
        paginateResults(`${config.endpoint}/game/${search}`, query)
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

routes.get('/searchByName/:search', (req, res) => {
  res.setHeader('Content-Type', 'application/json')

  let search = req.params.search
  let query = {
    api_key: config.apiKey,
    field_list: 'name,guid',
    filter: `name:${search}`,
    format: 'json',
    limit: 100
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
            paginateResults(`${config.endpoint}/games`, query)
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
        paginateResults(`${config.endpoint}/games`, query)
          .then(results => {
            resolve(db.create({
              model: 'GameSearch',
              data: { search, results }
            }))
          })
      })
    })
    .then(result => {
      return res.json({ success: true, data: result })
    })
    .catch(error => res.json({ success: false, error: error.message }))
})

routes.get('/ban/:id', (req, res) => {
  let { id } = req.params

  // TODO look if game has been voted on for active poll and remove any existing votes
  db.update({ model: 'Game', id, data: { banned: true } })
    .then(response => res.json({ success: true, data: response }))
    .catch(error => {
      console.error(error.message, error.stack)
      return res.json({ success: false, error: error.message })
    })
})

routes.get('/unban/:id', (req, res) => {
  let { id } = req.params

  db.update({ model: 'Game', id, data: { banned: false } })
    .then(response => res.json({ success: true, data: response }))
    .catch(error => {
      console.error(error.message, error.stack)
      return res.json({ success: false, error: error.message })
    })
})

module.exports = routes

const paginateResults = (url, queryParams, offset = 0, results = [], attempts = 0) => {
  if (attempts > 83) { // Why 83? No clue, because. That's why
    return results
  }

  queryParams.offset = offset
  let query = buildQueryParamsString(queryParams)

  return fetch(`${url}${query}`)
    .then(result => result.json())
    .then(result => {
      if (result.results.length < 0) return results

      results = results.concat(result.results)
      if (result.limit + result.offset < result.number_of_page_results) {
        return paginateResults(url, queryParams, offset + queryParams.limit, results, attempts + 1)
      } else {
        return results
      }
    })
}
