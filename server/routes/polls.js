const path = require('path')

const routes = require('express').Router()
const { create } = require(path.join(__dirname, '..', 'db'))

routes.get('/', (req, res) => {
  // TODO @allistermoon: Implement find all
})

routes.get('/:id', (req, res) => {
  // TODO @allistermoon: Implement find single
})

routes.delete('/:id', (req, res) => {
  // TODO @allistermoon: Implement delete
})

// CREATE
routes.post('/', (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  let { model, data } = req.body
  if (!model || !data) {
    return res.json({ success: false, error: 'a required field was not included' })
  }
  if (data.id) delete data.id

  create({ model, data })
    .then(res.json)
    .catch(error => {
      console.error(error.message, error.stack)
      res.json({ success: false, error: error.message })
    })
})

routes.post('/:id', (req, res) => {
  // TODO @allistermoon: Implement update
})

module.exports = routes
