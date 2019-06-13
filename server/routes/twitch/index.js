const path = require('path')
const fetch = require('isomorphic-unfetch')

const passport = require(path.join(__dirname, '..', '..', 'auth'))
const config = require(path.join(__dirname, '..', '..', 'config', 'auth'))
const bot = require(path.join(__dirname, '..', '..', 'chatbot'))
const { adminAccessOnly } = require(path.join(__dirname, '../../middleware'))

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
    req.session.user = req.user
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

routes.get('/emotes', adminAccessOnly, (req, res) => {
  res.setHeader('Content-Type', 'application/json')

  // Secret API Endpoint! I have no emoticons to test, so leaving pokket in statically to test features
  fetch(`https://api.twitch.tv/api/channels/pokket/product`, {
    headers: { 'Client-ID': config.clientId }
  })
    .then(response => response.json())
    .then(data => {
      return res.json({ success: true, data: data.emoticons })
    })
    .catch(error => {
      console.error(error.message, error.stack)
      return res.json({ success: false, error: error.message })
    })
})

module.exports = routes
