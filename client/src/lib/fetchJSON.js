import fetch from 'isomorphic-unfetch'

export const fetchJSON = (url, options = {}) => {
  return fetch(url, options).then(response => response.json())
}
