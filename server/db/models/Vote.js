const path = require('path')

const thinkagain = require(path.join(__dirname, 'shared', 'thinkagain'))

const Vote = thinkagain.createModel('Vote', {
  type: 'object',
  properties: {
    id: { type: 'string' },
    count: { type: 'number' },
    game: { type: 'number' },
    poll_id: { type: 'string' }
  },
  required: ['count', 'game']
})

module.exports = Vote
