import fetch from 'isomorphic-unfetch'

export default (url, options = {}) => {
  return fetch(url, options).then(response => response.json())
}
