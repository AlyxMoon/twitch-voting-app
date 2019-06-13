export const getUser = state => {
  return state.user
}

export const isUserAdmin = state => {
  return state.user && state.user.role === 'ADMIN'
}

export const isUserModOrAdmin = state => {
  return state.user && state.user.role !== 'USER'
}
