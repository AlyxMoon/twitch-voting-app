module.exports = {
  oauth: `oauth:${process.env.TWITCH_BOT_OAUTH}` || '',
  username: process.env.TWITCH_BOT_USERNAME || '',
  commandPrefix: '!'
}
