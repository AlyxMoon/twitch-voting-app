const path = require('path')

const routes = require('express').Router()
const twitchConfig = require(path.join(__dirname, '..', '..', 'config', 'auth'))
const { buildQueryParamsString } = require(path.join(__dirname, '..', '..', 'util'))

routes.get('/auth', (req, res) => {
  let query = buildQueryParamsString({
    client_id: twitchConfig.clientId,
    redirect_uri: twitchConfig.redirectUri,
    response_type: 'token id_token',
    scope: twitchConfig.scopes
  })

  res.redirect(`${twitchConfig.authEndpoint}${query}`)
})

routes.get('/auth/redirect', (req, res) => {
  res.redirect('http://localhost:8080')
})

routes.get('/auth/save', (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  if (req.query.idToken && req.query.accessToken) {
    // TODO @allistermoon: Save the id_token and do stuff
    res.json({ success: true })
  } else {
    res.json({ success: false })
  }
})

module.exports = routes
