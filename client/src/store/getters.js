export const getUser = state => {
  return state.user
}

export const isUserModOrAdmin = state => {
  return state.user && state.user.role !== 'USER'
}
