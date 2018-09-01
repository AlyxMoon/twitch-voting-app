<template>
  <div>
    <button class="pure-button" @click="unviewPoll">&lt; Go Back</button>
    <h2>Poll View</h2>
    <dl v-if="poll" class="pure-g">
      <div>
        <dt class="pure-u-1-3">Name:</dt>
        <dd class="pure-u-2-3">{{ poll.name }}</dd>
      </div>
      <div>
        <dt class="pure-u-1-3">Current Active Poll:</dt>
        <dd class="pure-u-2-3">{{ poll.active ? 'Yes' : 'No' }}</dd>
      </div>
    </dl>
    <h3>Votes</h3>
    <table v-if="poll.votes && poll.votes.length > 0" class="pure-table">
      <thead>
        <th>Game</th>
        <th>Current Votes</th>
        <th>Reaction</th>
      </thead>
      <tbody>
        <tr v-for="vote in poll.votes" :key="'vote-' + vote.id">
          <td>{{ vote.gameInfo.name }}</td>
          <td>{{ vote.count }}</td>
          <td>TODO</td>
        </tr>
      </tbody>
    </table>
    <h4 v-else>There are no votes yet!</h4>
  </div>
</template>

<script>
export default {
  name: 'pollView',
  props: ['poll', 'unviewPoll']
}
</script>

<style scoped>
dl {
  display: table;
  border-bottom: 1px solid #DDD;
}

dl div {
  display: table-row;
}

dd, dt {
  display: table-cell;
  margin: 0;
}
dt {
  font-weight: bold;
  padding-right: 20px;
  text-align: right;
}

</style>
