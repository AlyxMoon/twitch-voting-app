module.exports = {
  channel: process.env.TWITCH_CHANNEL || '',
  oauth: `oauth:${process.env.TWITCH_BOT_OAUTH}` || '',
  username: process.env.TWITCH_BOT_USERNAME || '',
  commandPrefix: '!'
}
