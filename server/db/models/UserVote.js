const path = require('path')
const { format } = require('date-fns')

const thinkagain = require(path.join(__dirname, 'shared', 'thinkagain'))

const UserVote = thinkagain.createModel('UserVote', {
  type: 'object',
  properties: {
    id: { type: 'string' },
    poll_id: { type: 'string' },
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
  required: ['poll_id', 'vote_id', 'twitchId']
})

module.exports = UserVote
