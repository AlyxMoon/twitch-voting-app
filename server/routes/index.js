const routesTwitch = require('./twitch')

module.exports = app => {
  app.get('/', (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    res.json({ success: true })
  })

  app.use('/twitch', routesTwitch)
}
