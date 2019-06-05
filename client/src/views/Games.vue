<template>
  <div>
    <componentGameSearch :ban="ban"></componentGameSearch>

    <div class="table-wrapper">
      <div class="table-header-wrapper">
        <h1 class="table-header">Game Alias</h1>
      </div>
      <table class="pure-table pure-table-horizontal full-width">
        <thead>
          <tr>
            <th>Name</th>
            <th>GUID</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="game in aliases" :key="'game-' + game.id">
            <td>{{ game.name }}</td>
            <td>{{ game.guid }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="table-wrapper">
      <div class="table-header-wrapper">
        <h1 class="table-header">Banned Games</h1>
      </div>
      <table class="pure-table pure-table-horizontal full-width">
        <thead>
          <tr>
            <th>Name</th>
            <th>GUID</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(game, i) in banned" :key="'game-' + game.id">
            <td><button class="pure-button pure-button-success" @click="unban(game.id, i)">Unban</button> {{ game.name }}</td>
            <td>{{ game.guid }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { fetchJSON } from '@/lib'
import { serverAddress } from '@/consts'
import { GameSearch } from '@/components'

export default {
  name: 'Games',
  components: {
    'componentGameSearch': GameSearch
  },

  data () {
    return {
      aliases: [],
      banned: [],
      games: []
    }
  },

  beforeRouteEnter (to, from, next) {
    fetchJSON(`${serverAddress}/api/games`)
      .then(result => {
        if (!result.success) throw result.error

        return next(vm => vm.setData({ games: result.data }))
      })
      .catch(error => next(vm => vm.setData({ error: error })))
  },

  methods: {
    setData ({ error, aliases, games }) {
      if (error) {
        console.error(error)
        this.error = error
      }

      if (aliases) this.aliases = aliases
      if (games) {
        this.games = games
        this.banned = games.filter(game => game.banned)
      }
    },

    ban (id) {
      return fetchJSON(`${serverAddress}/api/games/ban/${id}`)
        .then(result => {
          this.banned.push(result.data)
          return result
        })
        .catch(error => console.error(error))
    },

    unban (id, i) {
      fetchJSON(`${serverAddress}/api/games/unban/${id}`)
        .then(result => {
          this.banned.splice(i, 1)
        })
        .catch(error => console.error(error))
    }
  }
}
</script>

<style scoped>

</style>
