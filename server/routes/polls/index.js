const path = require('path')

const routes = require('express').Router()
const routesVotes = require('./votes')
const db = require(path.join(__dirname, '..', '..', 'db'))

const model = { model: 'Poll' }

// FIND ALL
routes.get('/', (req, res) => {
  res.setHeader('Content-Type', 'application/json')

  db.find({ ...model })
    .then(result => {
      res.json({ success: true, data: result })
    })
    .catch(error => {
      console.error(error.message, error.stack)
      res.json({ success: false, error: error.message })
    })
})

// GET
routes.get('/:id', (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  let id = req.params.id

  db.get({ ...model, id })
    .then(result => {
      res.json({ success: true, data: result })
    })
    .catch(error => {
      console.error(error.message, error.stack)
      res.json({ success: false, error: error.message })
    })
})

// Child route for votes
routes.use('/:id/votes', (req, res, next) => {
  req.pollId = req.params.id
  next()
}, routesVotes)

// CREATE
routes.post('/', (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  let { data } = req.body
  if (!data) {
    return res.json({ success: false, error: 'a required field was not included' })
  }
  if (data.id) delete data.id

  db.create({ ...model, data })
    .then(result => {
      res.json({ success: true, data: result })
    })
    .catch(error => {
      console.error(error.message, error.stack)
      res.json({ success: false, error: error.message })
    })
})

// UPDATE
routes.post('/:id', (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  let id = req.params.id
  let { data } = req.body
  if (!data) {
    return res.json({ success: false, error: 'a required field was not included' })
  }
  if (data.id) delete data.id

  db.update({ ...model, id, data })
    .then(result => {
      res.json({ success: true, data: result })
    })
    .catch(error => {
      console.error(error.message, error.stack)
      res.json({ success: false, error: error.message })
    })
})

// Set a poll to active, which will set all others to inactive
routes.get('/:id/active', (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  let id = req.params.id
  let newPolls = []

  db.updateAll({ ...model, data: { active: false } })
    .then(result => {
      newPolls = result
      return db.update({ ...model, id, data: { active: true } })
    })
    .then(result => {
      newPolls[newPolls.findIndex(poll => poll.id === id)] = result
      return res.json({ success: true, data: newPolls })
    })
    .catch(error => {
      console.error(error.message, error.stack)
      res.json({ success: false, error: error.message })
    })
})

// DELETE
routes.delete('/:id', (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  let id = req.params.id

  db.delete({ ...model, id })
    .then(result => {
      res.json({ success: true, data: result })
    })
    .catch(error => {
      res.json({ success: false, error: error.message })
    })
})

module.exports = routes
