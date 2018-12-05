const fetch = require('isomorphic-unfetch')

module.exports = function fetchJSON (url, options = {}) {
  return fetch(url, options).then(response => response.json())
}
