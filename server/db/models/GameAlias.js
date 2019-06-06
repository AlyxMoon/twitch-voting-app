const path = require('path')
const { format } = require('date-fns')

const thinkagain = require(path.join(__dirname, 'shared', 'thinkagain'))

const GameAlias = thinkagain.createModel('GameAlias', {
  type: 'object',
  properties: {
    name: { type: 'string' },
    game_id: { type: 'string' },
    createdAt: {
      type: 'string',
      default: format(new Date())
    },
    updatedAt: {
      type: 'string',
      default: format(new Date())
    }
  },
  required: ['name', 'game_id']
}, {
  pk: 'name'
})

module.exports = GameAlias
