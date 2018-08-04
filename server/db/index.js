const path = require('path')
const dateFns = require('date-fns')

const rethinkDB = require('rethinkdb')
const dbConfig = require(path.join(__dirname, '..', 'config', 'database'))

const { GameSearch, Poll, Vote } = require(path.join(__dirname, 'models'))
const knownModels = { GameSearch, Poll, Vote }
const protectedKeys = ['id', 'createdAt', 'updatedAt']

module.exports = {
  init: () => {
    rethinkDB.connect(dbConfig, (err, conn) => {
      if (err) throw err

      console.log('connection to rethinkDB success')
    })
  },

  get: ({ model = '', id = 0 }) => {
    return new Promise((resolve, reject) => {
      if (!isKnownModel(model)) {
        return reject(new Error(`Model ${model} was not recognized as a valid type`))
      }

      return resolve(knownModels[model].get(id).getJoin().run())
    })
  },

  find: ({ model = '', filters = {} }) => {
    return new Promise((resolve, reject) => {
      if (!isKnownModel(model)) {
        return reject(new Error(`Model ${model} was not recognized as a valid type`))
      }

      return resolve(knownModels[model].filter(filters).run())
    })
  },

  create: ({ model = '', data = {} }) => {
    return new Promise((resolve, reject) => {
      if (!isKnownModel(model)) {
        return reject(new Error(`Model ${model} was not recognized as a valid type`))
      }

      let dataToSave = removeProtectedKeys(data)

      const newModel = new knownModels[model](dataToSave)
      return resolve(newModel.saveAll())
    })
  },

  update: ({ model = '', id, data = {} }) => {
    return new Promise((resolve, reject) => {
      if (!isKnownModel(model)) {
        return reject(new Error(`Model ${model} was not recognized as a valid type`))
      }

      let dataToSave = {
        ...removeProtectedKeys(data),
        updatedAt: dateFns.format(new Date())
      }

      knownModels[model].get(id).getJoin().run().then(row => {
        resolve(row.merge(dataToSave).saveAll())
      })
    })
  },

  delete: ({ model = '', id }) => {
    return new Promise((resolve, reject) => {
      if (!isKnownModel(model)) {
        return reject(new Error(`Model ${model} was not recognized as a valid type`))
      }

      knownModels[model].get(id).getJoin().run().then(row => {
        resolve(row.deleteAll())
      })
    })
  }
}

const isKnownModel = (model) => {
  return Object.keys(knownModels).some(knownModel => knownModel === model)
}

const removeProtectedKeys = data => {
  const newData = Object.assign({}, data)
  protectedKeys.forEach(key => {
    delete newData[key]
  })

  return newData
}
