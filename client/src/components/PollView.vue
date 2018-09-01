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
        <th>Change Reaction</th>
      </thead>
      <tbody>
        <tr v-for="vote in poll.votes" :key="'vote-' + vote.id">
          <td>{{ vote.gameInfo.name }}</td>
          <td>{{ vote.count }}</td>
          <td v-if="vote.emoteLink"><img class="center" :src="vote.emoteLink" /></td>
          <td v-else></td>
          <td>
            <div class="image-dropdown">
              <template v-for="emote in emotes">
                <input
                  :id="`vote-${vote.id}-emote-${emote.id}`"
                  :name="`vote-${vote.id}`"
                  :key="`vote-${vote.id}-emote-${emote.id}`" v-model="newEmoteLink[vote.id]"
                  type="radio" :value="emote.url" />
                <label
                  :for="`vote-${vote.id}-emote-${emote.id}`"
                  :key="`vote-${vote.id}-emote-${emote.id}-label`">
                  <img :src="emote.url" /> {{ emote.regex }}
                </label>
              </template>
            </div>
            <button
              class="pull-right pure-button pure-button-success"
              @click="setReaction(poll.id, vote.id, newEmoteLink[vote.id])">
              Save
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <h4 v-else>There are no votes yet!</h4>
  </div>
</template>

<script>
export default {
  name: 'pollView',
  props: ['emotes', 'poll', 'setReaction', 'unviewPoll'],
  data () {
    return { newEmoteLink: {} }
  }
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

.image-dropdown {
  border: 1px solid black;
  display: inline-block;
  height: 32px;
  overflow-y: scroll;
  position: relative;
  transition: height 0.1s;
  width: 200px;
  z-index: 10;
}
.image-dropdown:hover {
  height: 200px;
  overflow-y: scroll;
  transition: height 0.5s;
}

.image-dropdown input {
  left: 0;
  opacity: 0;
  position: absolute;
  z-index: 11;
  top: 0;
}

.image-dropdown label {
  display: none;
  margin: 2px;
  opacity: 0.2;
  z-index: 12;
}
.image-dropdown:hover label {
  display: block;
}

.image-dropdown label img {
  vertical-align: middle;
}

.image-dropdown input:checked + label {
  display: block;
  opacity: 1;
}

td > img {
  display: table-cell;
}

</style>
