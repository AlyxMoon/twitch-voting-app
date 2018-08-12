const path = require('path')
const passport = require(path.join(__dirname, '..', '..', 'auth'))
const config = require(path.join(__dirname, '..', '..', 'config', 'auth'))
const bot = require(path.join(__dirname, '..', '..', 'chatbot'))

const routes = require('express').Router()

routes.get('/user', (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080')

  let success = !!req.user
  res.json({ success, data: req.user })
})

routes.get('/auth', passport.authenticate('twitch', { forceVerify: true }))

routes.get('/auth/callback',
  passport.authenticate('twitch', { failureRedirect: '/' }),
  (req, res) => {
    req.login(req.user, error => {
      if (error) console.error(error)
      return res.redirect('http://localhost:8080')
    })
  }
)

routes.get('/logout', (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080')

  req.logout()
  res.json({ success: true })
})

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
