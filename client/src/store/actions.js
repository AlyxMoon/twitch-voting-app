import { fetchJSON } from '@/lib'
import { serverAddress } from '@/consts'

export const getUserFromSession = ({ commit }) => {
  fetchJSON(`${serverAddress}/twitch/user`)
    .then(response => {
      if (!response.success) throw new Error(response.error)
      commit('SET_USER', response.data)
    })
    .catch(console.error)
}

export const logout = ({ commit }) => {
  fetchJSON(`${serverAddress}/twitch/logout`)
    .then(response => {
      if (response.success) {
        commit('SET_USER', null)
      }
    })
}
