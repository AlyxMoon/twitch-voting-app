const path = require('path')
const fetch = require('isomorphic-unfetch')
const passport = require(path.join(__dirname, '..', '..', 'auth'))
const config = require(path.join(__dirname, '..', '..', 'config', 'auth'))
const bot = require(path.join(__dirname, '..', '..', 'chatbot'))

const routes = require('express').Router()

routes.get('/auth', passport.authenticate('twitch'))

routes.get('/auth/callback',
  passport.authenticate('twitch', { failureRedirect: '/' }),
  (req, res) => {
    // Check twitch API for role of user in channel
    fetch(`${config.endpointKraken}`)
    res.redirect('http://localhost:8080')
  }
)

routes.get('/mods', (req, res) => {
  res.setHeader('Content-Type', 'application/json')

  bot.mods(config.channel)
    .then(data => {
      return res.json({ success: true, data })
    })
    .catch(error => {
      return res.json({ success: false, error: error.message })
    })
})

module.exports = routes
