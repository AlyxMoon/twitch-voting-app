<template>
  <div v-if="polls && polls.length > 0">
    <h2>Polls List</h2>
    <table class="pure-table pure-table-horizontal">
      <thead>
        <tr>
          <th>Name</th>
          <th>Active</th>
          <th /><th /><th />
        </tr>
      </thead>
      <tbody>
        <tr v-for="(poll, index) in polls" :key="'poll-' + poll.id">
          <td>{{ poll.name }}</td>
          <td class="center">{{ poll.active ? 'X' : '' }}</td>
          <td><button class="pure-button pure-button-success" @click="viewPoll(index)">View Details</button></td>
          <td><button class="pure-button pure-button-secondary" @click="setActive(index)">Set Active</button></td>
          <td><button class="pure-button pure-button-error" @click="deletePoll(index)">Delete</button></td>
        </tr>
      </tbody>
    </table>
  </div>
  <h4 v-else>There are no polls yet!</h4>
</template>

<script>
export default {
  name: 'pollListMinimalist',
  props: ['polls', 'deletePoll', 'viewPoll', 'setActive']
}
</script>

<style scoped></style>
