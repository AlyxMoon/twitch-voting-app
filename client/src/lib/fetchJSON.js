import fetch from 'isomorphic-unfetch'

export const fetchJSON = (url, options = {}) => {
  options.credentials = 'include'

  return fetch(url, options).then(response => response.json())
}
