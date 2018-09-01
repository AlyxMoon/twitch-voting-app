const path = require('path')
const { format } = require('date-fns')

const thinkagain = require(path.join(__dirname, 'shared', 'thinkagain'))

const Vote = thinkagain.createModel('Vote', {
  type: 'object',
  properties: {
    id: { type: 'string' },
    count: { type: 'number' },
    emoteLink: { type: 'string' },
    game_id: { type: 'string' },
    poll_id: { type: 'string' },
    createdAt: {
      type: 'string',
      default: format(new Date())
    },
    updatedAt: {
      type: 'string',
      default: format(new Date())
    }
  },
  required: ['count', 'game_id', 'poll_id']
})

module.exports = Vote
