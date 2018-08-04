const path = require('path')
const { format } = require('date-fns')

const thinkagain = require(path.join(__dirname, 'shared', 'thinkagain'))

const Vote = thinkagain.createModel('Vote', {
  type: 'object',
  properties: {
    id: { type: 'string' },
    count: { type: 'number' },
    game: { type: 'number' },
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
  required: ['count', 'game']
})

module.exports = Vote
