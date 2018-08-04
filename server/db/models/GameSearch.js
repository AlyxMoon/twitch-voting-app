const path = require('path')
const { format } = require('date-fns')

const thinkagain = require(path.join(__dirname, 'shared', 'thinkagain'))

const GameSearch = thinkagain.createModel('GameSearch', {
  type: 'object',
  properties: {
    id: { type: 'string' },
    search: { type: 'string' },
    results: { type: 'array' },
    createdAt: {
      type: 'string',
      default: format(new Date())
    },
    updatedAt: {
      type: 'string',
      default: format(new Date())
    }
  },
  required: ['search', 'results']
})

module.exports = GameSearch
