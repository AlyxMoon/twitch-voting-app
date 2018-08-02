module.exports = {
  allowedUsers: ['pokket'],
  authEndpoint: 'https://id.twitch.tv/oauth2/authorize',
  endpointHelix: 'https://api.twitch.tv/helix',
  endpointKraken: 'https://api.twitch.tv/kraken',
  clientId: process.env.TWITCH_CLIENT_ID || '',
  clientSecret: process.env.TWITCH_CLIENT_SECRET || '',
  redirectUri: 'http://localhost:8080/twitch/redirect',
  scopes: 'openid channel_check_subscription chat_login'
}
