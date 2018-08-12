const path = require('path')
const { format } = require('date-fns')

const thinkagain = require(path.join(__dirname, 'shared', 'thinkagain'))

const User = thinkagain.createModel('User', {
  type: 'object',
  properties: {
    id: { type: 'string' },
    twitchId: { type: 'string' },
    displayname: { type: 'string' },
    username: { type: 'string' },
    createdAt: {
      type: 'string',
      default: format(new Date())
    },
    updatedAt: {
      type: 'string',
      default: format(new Date())
    }
  },
  required: ['twitchId', 'displayname', 'username']
})

module.exports = User
