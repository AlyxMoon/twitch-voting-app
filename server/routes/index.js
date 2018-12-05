const routesTwitch = require('./twitch')
const routesPolls = require('./polls')
const routesGames = require('./games')

module.exports = app => {
  app.use((req, res, next) => {
    res.setHeader('Content-Type', 'application/json')
    next()
  })

  app.get('/', (req, res) => {
    res.json({ success: true })
  })

  app.use('/twitch', routesTwitch)
  app.use('/api/polls', routesPolls)
  app.use('/api/games', routesGames)
}
