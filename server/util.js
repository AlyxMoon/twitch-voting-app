module.exports = {
  buildQueryParamsString (queryParams) {
    let first = true
    let queryParamsString = ''

    for (let [key, value] of Object.entries(queryParams)) {
      let preChar = first ? '?' : '&'
      first = false

      queryParamsString += `${preChar}${key}=${value}`
    }

    return queryParamsString
  }
}
