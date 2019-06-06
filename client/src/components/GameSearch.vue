<template>
  <div class="search-component">
    <div class="search-form" v-if="!showCreateAliasForm">
      <button class="pure-button pure-button-success" @click="search()">Search</button>
      <input type="text" placeholder="Game to Search" v-model="searchText" />
    </div>
    <ul class="search-results" v-if="!showCreateAliasForm && searchResults && searchResults.length > 0">
      <li v-for="(result, i) in searchResults" :key="'search-result-' + i">
        <button class="pure-button pure-button-error" @click="doBan(result)">Ban Game</button>
        <button class="pure-button pure-button-secondary" @click="promptCreateAlias(result)">Create Alias</button>
        {{ result.name }}
      </li>
    </ul>
    <div class="alias-form-wrapper" v-if="showCreateAliasForm">
      <label class="form-help">Creating alias for {{ aliasData.gameName }}</label>
      <div class="alias-form">
        <input type="text" v-model="aliasData.name" placeholder="alias" />
        <button class="pure-button pure-button-success" @click="doCreateAlias()">Create</button>
        <button class="pure-button pure-button-error" @click="cancelCreateAlias()">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script>
import { fetchJSON } from '@/lib'
import { serverAddress } from '@/consts'

export default {
  name: 'gameSearch',
  props: ['ban', 'createAlias'],

  data () {
    return {
      searchResults: [],
      searchText: '',
      showCreateAliasForm: false,
      aliasData: { name: '', gameId: '', gameName: '' }
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
          if (!result.success) throw new Error(result.error)

          return this.ban(result.data.id)
        })
        .then(result => {
          if (!result.success) throw new Error(result.error)
        })
        .catch(console.error)
    },

    promptCreateAlias: function (game) {
      if (!game) return

      fetchJSON(`${serverAddress}/api/games`, {
        method: 'POST',
        body: JSON.stringify({ data: game }),
        headers: { 'Content-Type': 'application/json' }
      })
        .then(result => {
          if (!result.success) throw new Error(result.error)

          this.aliasData.gameId = result.data.id
          this.aliasData.gameName = result.data.name
          this.showCreateAliasForm = true
        })
        .catch(console.error)
    },

    doCreateAlias: function () {
      this.createAlias(this.aliasData)
        .then(() => this.cancelCreateAlias())
    },

    cancelCreateAlias: function () {
      this.aliasData.name = ''
      this.aliasData.gameId = ''
      this.aliasData.gameName = ''
      this.showCreateAliasForm = false
    }
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

.search-form, .alias-form {
  width: 100%;
  display: flex;
  align-items: row;
}

.search-form button, .alias-form button  {
  flex-grow: 1;

  border-radius: 0;
  border-size: 2px;

  height: 34px;
  margin-right: -4px;
  padding-top: 8px;
  padding-bottom: 8px;

  vertical-align: baseline;
}

.search-form input, .alias-form input {
  flex-grow: 4;

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
