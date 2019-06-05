export const parseFiltersForURI = data => {
  if (!(typeof data === 'object')) return

  return encodeURI(JSON.stringify(data))
}
