<template>
  <div v-if="polls && polls.length > 0">
    <div class="poll-wrapper" v-for="(poll, i) of polls" :key="i">
      <div class="poll-header">
        <div class="header">{{ poll.name }}</div>
      </div>
      <div class="poll-body" v-if="poll.votes && poll.votes.length > 0">
        <table class="pure-table pure-table-horizontal full-width">
          <thead>
            <tr>
              <th>Game Name</th>
              <th>Votes</th>
            </tr>
          </thead>
          <tbody>
            <template v-for="(vote, j) of poll.votes">
              <tr :key="'game-info-' + j">
                <td>{{ vote.gameInfo.name }}</td>
                <td>{{ vote.count }}</td>
              </tr>
              <tr v-for="(user, k) of getUsersPerVote(i, vote.id)" :key="'user-votes-' + vote.id + '-' + k">
                <td colspan="2">{{ user.user ? user.user.username : user.id }}</td>
              </tr>
            </template>
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
    },

    getUsersPerVote (pollIndex, voteId) {
      if (!this.polls || !this.polls[pollIndex] || !this.polls[pollIndex].userVotes) return []

      return this.polls[pollIndex].userVotes.filter(userVote => {
        return userVote.vote_id === voteId
      })
    }
  }
}
</script>

<style scoped>
.poll-wrapper {
  background-color: #6C2FB3;
  border: 3px solid #2F76B4;
  border-radius: 10px;
  box-shadow: 2px 2px 2px 1px #2F76B4;
  font-weight: bold;
  margin: 1em 0;
  overflow: hidden;
}

.poll-header {
  font-size: 1.4em;
  padding: 0.2em 0.5em;
}

table {
  border: 10px solid black;
}

thead {
  background-color: #D5C7E6;
  font-size: 1.2em;
}

</style>
