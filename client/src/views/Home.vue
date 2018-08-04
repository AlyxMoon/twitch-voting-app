<template>
  <div>
    <h1>Home Page</h1>
    <ul v-for="(poll, i) of polls" :key="i">
      <li>
        {{ poll.name }}
      </li>
    </ul>
  </div>
</template>

<script>
import fetch from 'isomorphic-unfetch'
import { serverAddress } from '@/consts'

export default {
  name: 'home',

  data () {
    return {
      error: null,
      polls: null
    }
  },

  beforeRouteEnter (to, from, next) {
    fetch(fetch(`${serverAddress}/api/polls`)
      .then(res => res.json())
      .then(result => {
        if (!result.success) {
          return next(vm => vm.setData({ error: result.error }))
        }

        return next(vm => vm.setData({ polls: result.data }))
      }))
  },

  methods: {
    setData ({ error, polls }) {
      if (error) this.error = error
      if (polls) this.polls = polls
    }
  }
}
</script>

<style scoped>

</style>
