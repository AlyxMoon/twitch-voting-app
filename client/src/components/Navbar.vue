<template>
  <section class="navbar pure-menu pure-menu-horizontal">
    <a href="/" class="pure-menu-heading pure-menu-link">App</a>
    <ul class="navbar-right pure-menu-list">
      <li v-if="!username" class="pure-menu-item">
        <a href="http://localhost:8081/twitch/auth" class="pure-menu-link">Twitch Login</a>
      </li>
      <li v-if="username" class="pure-menu-item">
        <span class="pure-menu-link">Logged in as: {{ username }}</span>
      </li>
      <li v-if="username" class="pure-menu-item">
        <a @click="logout" href="#" class="pure-menu-link">Logout</a>
      </li>
    </ul>
  </section>
</template>

<script>
import fetch from 'isomorphic-unfetch'
import { serverAddress } from '@/consts'

export default {
  name: 'navbar',

  data () {
    return {
      username: null
    }
  },

  created () {
    fetch(`${serverAddress}/twitch/user`, {
      credentials: 'include'
    })
      .then(response => response.json())
      .then(response => {
        if (response.success) {
          this.username = response.data.username
        }
      })
  },

  methods: {
    logout () {
      fetch(`${serverAddress}/twitch/logout`, {
        credentials: 'include'
      })
        .then(response => response.json())
        .then(response => {
          if (response.success) {
            this.username = null
          }
        })
    }
  }
}
</script>

<style scoped>

.navbar {
  background-color: black;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
}

.navbar-right {
  float: right;
}

span.pure-menu-link:hover {
  background-color: inherit;
}

</style>
