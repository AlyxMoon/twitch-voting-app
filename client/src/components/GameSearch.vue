<template>
  <div class="search-component">
    <div class="search-form">
      <button class="pure-button pure-button-success" @click="search()">Search</button>
      <input type="text" placeholder="Game to Search" v-model="searchText" />
    </div>
    <ul class="search-results" v-if="searchResults && searchResults.length > 0">
      <li v-for="(result, i) in searchResults" :key="'search-result-' + i">
        <button class="pure-button pure-button-error" @click="doBan(result)">Ban Game</button>
        {{ result.name }}
      </li>
    </ul>
  </div>
</template>

<script>
import { fetchJSON } from '@/lib'
import { serverAddress } from '@/consts'

export default {
  name: 'gameSearch',
  props: ['ban'],

  data () {
    return {
      searchResults: [],
      searchText: ''
    }
  },

  methods: {
    search: function () {
      if (!this.searchText) return

      fetchJSON(`${serverAddress}/api/games/searchByName/${this.searchText}`)
        .then(games => {
          if (!games.success) throw new Error(games.error)

          this.searchResults = games.data.results
        })
        .catch(console.error)
    },

    doBan: function (game) {
      if (!game) return

      fetchJSON(`${serverAddress}/api/games`, {
        method: 'POST',
        body: JSON.stringify({ data: game }),
        headers: { 'Content-Type': 'application/json' }
      })
        .then(result => {
          console.log('am I the error?', result)
          if (!result.success) throw new Error(result.error)

          console.log('guess not')
          return this.ban(result.data.id)
        })
        .then(result => {
          if (!result.success) throw new Error(result.error)
        })
        .catch(console.error)
    }

    // alias: TODO: Fill in this stuff
  }
}
</script>

<style scoped>

.search-component {
  display: flex;
  flex-direction: column;

  margin: 1rem;
  margin-bottom: 2rem;
  width: 95%;
}

.search-form {
  width: 100%;
  display: flex;
  align-items: row;
}

.search-form button {
  flex-grow: 1;

  border-radius: 0;
  border-size: 2px;

  height: 34px;
  margin-right: -4px;
  padding-top: 8px;
  padding-bottom: 8px;

  vertical-align: baseline;
}

.search-form input {
  flex-grow: 4;

  color: black;

  height: 28px;

  padding-left: 10px;
  padding-top: 1px;
  padding-bottom: 1px;
}

.search-results {
  display: flex;
  flex-direction: column;

  background-color: #E0E0E0;
  border: 1px solid black;
  color: black;
  list-style: none;
  margin: 0;
  margin-left: -1px;
  padding-left: 0;
  padding-right: 0;
  width: 100%;
}

.search-results li {
  padding: 0.5rem;
  border-top: 1px solid black;
}
.search-results li:first-child {
  border-top: none;
}

</style>
