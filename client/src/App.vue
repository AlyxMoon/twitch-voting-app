<template>
  <div id="app">
    <component-navbar></component-navbar>
    <router-view/>
  </div>
</template>

<script>
import { Navbar } from '@/components'

export default {
  name: 'App',
  components: {
    'component-navbar': Navbar
  }
}
</script>

<style>
body {
  background-color: #17141F;
  color: #DDDDDD;
  margin: 1em;
  padding: 1em;
}

.full-width {
  width: 100%;
}
</style>
