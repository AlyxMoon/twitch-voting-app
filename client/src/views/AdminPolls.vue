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
      :emotes="emotes" :poll="polls[selectedPoll]" :setReaction="setReaction" :unviewPoll="unviewPoll">
    </componentPollView>
    <componentPollList
      v-else
      :polls="polls" :deletePoll="deletePoll" :viewPoll="viewPoll" :setActive="setActive">
    </componentPollList>
  </div>
</template>

<script>
import fetch from 'isomorphic-unfetch'
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

    fetch(`${serverAddress}/api/polls`)
      .then(res => res.json())
      .then(result => {
        if (!result.success) throw result.error
        data.polls = result.data

        return fetch(`${serverAddress}/twitch/emotes`)
      })
      .then(res => res.json())
      .then(result => {
        if (!result.success) throw result.error
        data.emotes = result.data

        return next(vm => vm.setData(data))
      })
      .catch(error => next(vm => vm.setData({ error: error })))
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
        fetch(`${serverAddress}/api/polls`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json; charset=utf-8' },
          body: JSON.stringify({ data: this.newPoll })
        })
          .then(res => res.json())
          .then(res => {
            if (!res.success) {
              this.error = res.error
              return console.error(res.error)
            }
            this.polls.push(res.data)
          })
      }
    },

    deletePoll (index) {
      if (!isNaN(index) && this.polls[index]) {
        fetch(`${serverAddress}/api/polls/${this.polls[index].id}`, {
          method: 'DELETE'
        })
          .then(res => res.json())
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
        fetch(`${serverAddress}/api/polls/${this.polls[index].id}/active`)
          .then(res => res.json())
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
        fetch(`${serverAddress}/api/polls/${pollId}/votes/${voteId}/reaction`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json; charset=utf-8' },
          body: JSON.stringify({ emoteLink })
        })
          .then(res => res.json())
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
    }
  }
}
</script>

<style scoped>

</style>
