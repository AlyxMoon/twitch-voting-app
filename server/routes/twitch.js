const path = require('path')

const routesTwitch = require('express').Router()
const twitchConfig = require(path.join(__dirname, '..', 'config', 'auth'))
const { buildQueryParamsString } = require(path.join(__dirname, '..', 'util'))

routesTwitch.get('/auth', (req, res) => {
  let query = buildQueryParamsString({
    client_id: twitchConfig.clientId,
    redirect_uri: twitchConfig.redirectUri,
    response_type: 'id_token',
    scope: twitchConfig.scopes
  })

  res.redirect(`${twitchConfig.authEndpoint}${query}`)
})

routesTwitch.get('/auth/redirect', (req, res) => {
  res.redirect('http://localhost:8080')
})

routesTwitch.get('/auth/save', (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  if (req.query.id_token) {
    // TODO @allistermoon: Save the id_token and do stuff
    res.json({ success: true })
  } else {
    res.json({ success: false })
  }
})

module.exports = routesTwitch
