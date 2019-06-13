<template>
  <div>
    <h1>Polls</h1>
    <button
      class="pure-button pure-button-primary"
      v-if="!showNewPollForm"
      @click="showNewPollForm = !showNewPollForm">
      Add New Poll
    </button>
    <form class="pure-form" v-if="showNewPollForm">
      <fieldset>
        <input type="text" placeholder="Poll Name" v-model="newPoll.name" />
        <button class="pure-button pure-button-success" @click.prevent="createPoll()">Create</button>
        <button class="pure-button" @click.prevent="showNewPollForm = false">Cancel</button>
      </fieldset>
    </form>

    <hr />
    <componentPollView
      v-if="selectedPoll !== null"
      :emotes="emotes" :poll="polls[selectedPoll]" :setReaction="setReaction" :setAllowVoteChange="setAllowVoteChange" :unviewPoll="unviewPoll">
    </componentPollView>
    <componentPollList
      v-else
      :polls="polls" :deletePoll="deletePoll" :viewPoll="viewPoll" :setActive="setActive">
    </componentPollList>
  </div>
</template>

<script>
import { fetchJSON } from '@/lib'
import { serverAddress } from '@/consts'

import { PollListMinimalist, PollView } from '@/components'

export default {
  name: 'adminPolls',
  components: {
    'componentPollList': PollListMinimalist,
    'componentPollView': PollView
  },

  data () {
    return {
      emotes: null,
      error: null,
      newPoll: { name: '', active: false },
      polls: null,
      selectedPoll: null,
      showNewPollForm: false
    }
  },

  beforeRouteEnter (to, from, next) {
    let data = {}

    Promise.all([
      fetchJSON(`${serverAddress}/api/polls`),
      fetchJSON(`${serverAddress}/twitch/emotes`)
    ]).then(([polls, emotes]) => {
      if (!polls.success) throw polls.error
      data.polls = polls.data

      if (emotes.success) {
        data.emotes = emotes.data
      }

      return next(vm => vm.setData(data))
    }).catch(error => next(vm => vm.setData({ error: error })))
  },

  methods: {
    setData ({ emotes, error, polls }) {
      if (error) {
        console.error(error)
        this.error = error
      }

      if (emotes) this.emotes = emotes
      if (polls) this.polls = polls
    },

    createPoll () {
      if (this.newPoll && this.newPoll.name !== '') {
        fetchJSON(`${serverAddress}/api/polls`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json; charset=utf-8' },
          body: JSON.stringify({ data: this.newPoll })
        })
          .then(res => {
            if (!res.success) {
              this.error = res.error
              return console.error(res.error)
            }
            this.polls.push(res.data)
          })
          .catch(err => {
            console.error(err)
          })
      }
    },

    deletePoll (index) {
      if (!isNaN(index) && this.polls[index]) {
        fetchJSON(`${serverAddress}/api/polls/${this.polls[index].id}`, {
          method: 'DELETE'
        })
          .then(res => {
            if (!res.success) {
              this.error = res.error
              return console.error(res.error)
            }
            this.polls.splice(index, 1)
          })
      }
    },

    unviewPoll () {
      this.selectedPoll = null
    },

    viewPoll (index) {
      if (!isNaN(index) && this.polls[index]) {
        this.selectedPoll = index
      }
    },

    setActive (index) {
      if (!isNaN(index) && this.polls[index]) {
        fetchJSON(`${serverAddress}/api/polls/${this.polls[index].id}/active`)
          .then(res => {
            if (!res.success) {
              this.error = res.error
              return console.error(res.error)
            }
            this.polls = res.data
          })
      }
    },

    setReaction (pollId, voteId, emoteLink) {
      if (pollId && emoteLink) {
        fetchJSON(`${serverAddress}/api/polls/${pollId}/votes/${voteId}/reaction`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json; charset=utf-8' },
          body: JSON.stringify({ emoteLink })
        })
          .then(res => {
            if (!res.success) {
              this.error = res.error
              return console.error(res.error)
            }
            let poll = this.polls.find(poll => poll.id === pollId)
            let index = poll.votes.findIndex(vote => vote.id === voteId)
            poll.votes.splice(index, 1, res.data)
          })
      }
    },

    setAllowVoteChange (pollId, allow) {
      if (pollId && allow !== undefined) {
        fetchJSON(`${serverAddress}/api/polls/${pollId}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json; charset=utf-8' },
          body: JSON.stringify({ data: { allowVoteChange: allow } })
        })
          .then(res => {
            if (!res.success) {
              this.error = res.error
              return console.error(res.error)
            }

            let index = this.polls.findIndex(poll => poll.id === pollId)
            this.polls.splice(index, 1, res.data)
          })
      }
    }
  }
}
</script>

<style scoped>

</style>
