const path = require('path')
const { format } = require('date-fns')

const thinkagain = require(path.join(__dirname, 'shared', 'thinkagain'))

const Poll = thinkagain.createModel('Poll', {
  type: 'object',
  properties: {
    id: { type: 'string' },
    active: { type: 'boolean' },
    name: { type: 'string' },
    createdAt: {
      type: 'string',
      default: format(new Date())
    },
    updatedAt: {
      type: 'string',
      default: format(new Date())
    }
  },
  required: ['active', 'name']
})

module.exports = Poll
