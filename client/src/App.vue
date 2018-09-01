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

.center {
  margin-left: auto;
  margin-right: auto;
  text-align: center;
}

.pull-right {
  float: right;
}

.pure-form input, select, option {
  color: #777;
}

.full-width {
  width: 100%;
}
</style>
