const path = require('path')

const routes = require('express').Router()
const db = require(path.join(__dirname, '..', '..', '..', 'db'))

const model = { model: 'Vote' }

// Place a vote
routes.get('/add/:gameId', (req, res) => {
  res.setHeader('Content-Type', 'application/json')

  db.find({
    ...model,
    filters: { poll_id: req.pollId, game: parseInt(req.params.gameId, 10) }
  })
    .then(response => {
      if (response && response.length > 0) {
        return db.update({
          ...model,
          id: response[0].id,
          data: {
            count: response[0].count + 1
          }
        })
      } else {
        return db.create({
          ...model,
          data: {
            count: 1,
            game: parseInt(req.params.gameId, 10),
            poll_id: req.pollId
          }
        })
      }
    })
    .then(response => {
      res.json({ success: true, data: response })
    })
    .catch(error => {
      res.json({ success: false, error: error.message })
    })
})

// Remove a vote
routes.get('/remove/:gameId', (req, res) => {
  res.setHeader('Content-Type', 'application/json')

  db.find({
    ...model,
    filters: { poll_id: req.pollId, game: parseInt(req.params.gameId, 10) }
  })
    .then(response => {
      if (response && response.length > 0) {
        return db.update({
          ...model,
          id: response[0].id,
          data: {
            count: response[0].count - 1 > 0 ? response[0].count - 1 : 0
          }
        })
      }
      return response
    })
    .then(response => {
      res.json({ success: true, data: response })
    })
    .catch(error => {
      res.json({ success: false, error: error.message })
    })
})

module.exports = routes
