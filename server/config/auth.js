module.exports = {
  channel: process.env.TWITCH_CHANNEL || '',
  authEndpoint: 'https://id.twitch.tv/oauth2/authorize',
  endpointHelix: 'https://api.twitch.tv/helix',
  endpointKraken: 'https://api.twitch.tv/kraken',
  clientId: process.env.TWITCH_CLIENT_ID || '',
  clientSecret: process.env.TWITCH_CLIENT_SECRET || '',
  redirectUri: 'http://localhost:8081/twitch/auth/callback',
  scopes: 'openid channel_check_subscription chat_login user_read'
}
