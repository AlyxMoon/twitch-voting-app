import fetch from 'isomorphic-unfetch'

export const fetchJSON = (url, options = {}) => {
  options.headers = options.headers || {}
  options.headers['Content-Type'] = 'application/json'

  return fetch(url, options).then(response => response.json())
}
