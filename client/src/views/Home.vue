<template>
  <div v-if="polls && polls.length > 0">
    <div class="table-wrapper" v-for="(poll, i) of polls" :key="i">
      <div class="table-header-wrapper">
        <div class="table-header">{{ poll.name }}</div>
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
                <td>
                  <button v-if="isUserModOrAdmin" class="pure-button pure-button-error" @click="ban(vote.gameInfo.id)">Ban</button>
                  {{ vote.gameInfo.name }} {{ vote.gameInfo.banned ? '(banned)' : ''}}
                </td>
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
import { mapGetters } from 'vuex'
import { fetchJSON } from '@/lib'
import { serverAddress } from '@/consts'

export default {
  name: 'home',

  data () {
    return {
      error: null,
      polls: null
    }
  },
  computed: {
    ...mapGetters({
      user: 'getUser',
      isUserModOrAdmin: 'isUserModOrAdmin'
    })
  },

  beforeRouteEnter (to, from, next) {
    fetchJSON(`${serverAddress}/api/polls`)
      .then(result => {
        if (!result.success) {
          return next(vm => vm.setData({ error: result.error }))
        }

        return next(vm => vm.setData({ polls: result.data }))
      })
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
    },

    ban (id) {
      fetchJSON(`${serverAddress}/api/games/ban/${id}`)
        .then(result => {
          this.banned.push(result.data)
        })
        .catch(error => console.error(error))
    }
  }
}
</script>

<style scoped>

td > img {
  display: table-cell;
}

</style>
