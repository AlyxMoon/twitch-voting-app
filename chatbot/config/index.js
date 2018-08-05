module.exports = {
  channels: process.env.TWITCH_CHANNELS.split(',') || [],
  oauth: `oauth:${process.env.TWITCH_OATH}` || '',
  username: process.env.TWITCH_USERNAME || '',
  commandPrefix: '!'
}
