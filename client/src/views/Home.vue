<template>
  <div v-if="polls && polls.length > 0">
    <div class="poll-wrapper" v-for="(poll, i) of polls" :key="i">
      <div class="poll-header">
        <div class="header">{{ poll.name }}</div>
      </div>
      <div class="poll-body">
        <table class="pure-table pure-table-horizontal full-width">
          <thead>
            <tr>
              <th>Game Name</th>
              <th class="center">Votes</th>
              <th class="center">Reaction</th>
            </tr>
          </thead>
          <tbody>
            <template v-for="(vote, j) of poll.votes">
              <tr :key="'game-info-' + j">
                <td>{{ vote.gameInfo.name }}</td>
                <td class="center">{{ vote.count }}</td>
                <td><img class="center" v-if="vote.emoteLink" :src="vote.emoteLink" /></td>
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
  margin: 1rem;
}

.poll-header {
  background-color: #E0E0E0;
  border-bottom: 2px solid black;
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
  color: black;
  font-size: 1.4em;
  font-weight: bold;
  padding: 0.2em 0.5em;
}

td > img {
  display: table-cell;
}

</style>
