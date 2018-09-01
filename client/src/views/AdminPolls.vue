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
      :poll="polls[selectedPoll]" :unviewPoll="unviewPoll">
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
      error: null,
      newPoll: { name: '', active: false },
      polls: null,
      selectedPoll: null,
      showNewPollForm: false
    }
  },

  beforeRouteEnter (to, from, next) {
    fetch(`${serverAddress}/api/polls`)
      .then(res => res.json())
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
    }
  }
}
</script>

<style scoped>

</style>
