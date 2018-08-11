<template>
  <div v-if="polls && polls.length > 0">
    <div class="card" v-for="(poll, i) of polls" :key="i">
      <div class="card-header">
        <div class="header-left">{{ poll.name }}</div>
        <div class="header-right">{{ poll.active ? 'active' : 'inactive' }}</div>
      </div>
      <div class="card-body" v-if="poll.votes && poll.votes.length > 0">
        <table>
          <thead>
            <tr>
              <th>Game ID</th>
              <th>Vote Count</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(vote, j) of poll.votes" :key="j">
              <td>{{ vote.gameInfo.name }}</td>
              <td>{{ vote.count }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
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
.card {
  border: 1px solid black;
  margin: 1rem;
  max-width: 500px;
}

.card-header {
  border-bottom: 1px solid black;
  text-align: center;
}

.header-left {
  border-right: 1px solid black;
  display: inline-block;
  margin: 0;
  width: 49%;
}

.header-right {
  display: inline-block;
  margin: 0;
  width: 49%;
}

td {
  text-align: center;
}

</style>
