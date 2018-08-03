const path = require('path')

const thinkagain = require(path.join(__dirname, 'shared', 'thinkagain'))

const Poll = thinkagain.createModel('Poll', {
  type: 'object',
  properties: {
    id: { type: 'string' },
    active: { type: 'boolean' },
    name: { type: 'string' }
  },
  required: ['active', 'name']
})

module.exports = Poll
