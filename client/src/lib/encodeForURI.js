export const encodeForURI = data => {
  if (!(typeof data === 'object')) return encodeURIComponent(data)

  return encodeURIComponent(JSON.stringify(data))
}
