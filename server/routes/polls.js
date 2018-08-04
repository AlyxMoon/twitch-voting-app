const path = require('path')

const routes = require('express').Router()
const db = require(path.join(__dirname, '..', 'db'))

const model = { model: 'Poll' }

// FIND ALL
routes.get('/', (req, res) => {
  res.setHeader('Content-Type', 'application/json')

  db.find({ ...model })
    .then(result => {
      res.json({ success: false, data: result })
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
