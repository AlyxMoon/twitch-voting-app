const routesTwitch = require('./twitch')
const routesPolls = require('./polls')

module.exports = app => {
  app.get('/', (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    res.json({ success: true })
  })

  app.use('/twitch', routesTwitch)
  app.use('/api/polls', routesPolls)
}
