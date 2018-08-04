<template>
  <h1>Twitch Auth Page</h1>
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
      let token = document.location.hash.replace('#id_token=', '')
      fetch(`${serverAddress}/twitch/auth/save?id_token=${token}`)
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            console.log('success!')
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
