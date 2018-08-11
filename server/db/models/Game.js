const path = require('path')
const { format } = require('date-fns')

const thinkagain = require(path.join(__dirname, 'shared', 'thinkagain'))

const Game = thinkagain.createModel('Game', {
  type: 'object',
  properties: {
    id: { type: 'string' },
    guid: { type: 'string' },
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
  required: ['guid', 'name']
})

module.exports = Game
