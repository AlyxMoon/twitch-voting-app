const routesTwitch = require('./twitch')
const routesPolls = require('./polls')
const routesGames = require('./games')

module.exports = app => {
  app.use((req, res, next) => {
    res.setHeader('Content-Type', 'application/json')
    res.setHeader('Access-Control-Allow-Credentials', true)
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080')
    next()
  })

  app.get('/', (req, res) => {
    res.json({ success: true })
  })

  app.use('/twitch', routesTwitch)
  app.use('/api/polls', routesPolls)
  app.use('/api/games', routesGames)
}
