<template>
  <div>
    <h1>Polls</h1>
    <div v-if="polls && polls.length > 0">
      <table class="pure-table pure-table-horizontal">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Active</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(poll, index) in polls" :key="'poll-' + poll.id">
            <td>{{ poll.id }}</td>
            <td>{{ poll.name }}</td>
            <td>{{ poll.active ? 'X' : '' }}</td>
            <td><button class="pure-button pure-button-secondary" @click="setActive(index)">Set Active</button></td>
            <td><button class="pure-button pure-button-error" @click="deletePoll(index)">Delete</button></td>
          </tr>
        </tbody>
      </table>
    </div>
    <h4 v-else>There are no polls yet!</h4>
  </div>
</template>

<script>
import fetch from 'isomorphic-unfetch'
import { serverAddress } from '@/consts'

export default {
  name: 'adminPolls',

  data () {
    return {
      error: null,
      polls: null
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

    deletePoll (index) {
      if (!isNaN(index) && this.polls[index]) {
        fetch(`${serverAddress}/api/polls/${this.polls[index].id}`, {
          method: 'delete'
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
