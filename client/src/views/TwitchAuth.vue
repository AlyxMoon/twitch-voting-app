<template>
  <div>
    <h1>Twitch Auth Page</h1>
    <h2>Do new stuff</h2>
  </div>
</template>

<script>
import fetch from 'isomorphic-unfetch'
import { serverAddress } from '@/consts'

export default {
  name: 'twitchAuth',
  created: function () {
    if (!document.location.hash) {
      console.error('did not get a hash value!')
    } else {
      let hashQueryValues = document.location.hash.slice(1).split('&')
      let accessToken = hashQueryValues.find(value => {
        return value.includes('access_token=')
      }).replace('access_token=', '')
      let idToken = hashQueryValues.find(value => {
        return value.includes('id_token=')
      }).replace('id_token=', '')

      fetch(`${serverAddress}/twitch/auth/save?idToken=${idToken}&accessToken=${accessToken}`)
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            console.log('success!', data)
            this.$router.push('/')
          } else {
            console.error('did not have the token!')
          }
        })
        .catch(err => {
          console.error(err.message, err.stack)
        })
    }
  }
}
</script>

<style scoped>

</style>
