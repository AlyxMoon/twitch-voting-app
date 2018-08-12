const path = require('path')
const { format } = require('date-fns')

const thinkagain = require(path.join(__dirname, 'shared', 'thinkagain'))

const UserVote = thinkagain.createModel('UserVote', {
  type: 'object',
  properties: {
    id: { type: 'string' },
    vote_id: { type: 'string' },
    twitchId: { type: 'string' },
    createdAt: {
      type: 'string',
      default: format(new Date())
    },
    updatedAt: {
      type: 'string',
      default: format(new Date())
    }
  },
  required: ['vote_id', 'twitchId']
})

module.exports = UserVote
