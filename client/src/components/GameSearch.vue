<template>
  <div class="search-component">
    <div class="search-form">
      <button class="pure-button pure-button-success" @click="search()">Search</button>
      <input type="text" placeholder="Game to Search" v-model="searchText" />
    </div>
    <ul class="search-results" v-if="searchResults && searchResults.length > 0">
      <li v-for="result in searchResults" :key="result">
        {{ result }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'gameSearch',
  data () {
    return {
      searchResults: [],
      searchText: '',
      placeholderGames: [
        'XCOM', 'XCOM 2', 'Racer Car Bois', 'Potato Smasher', 'Word Maker', 'Atom'
      ]
    }
  },

  methods: {
    search: function () {
      let search = this.searchText.toLocaleLowerCase()
      this.searchResults = this.placeholderGames.filter(game => game.toLocaleLowerCase().includes(search))
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
