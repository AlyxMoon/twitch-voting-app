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

.table-wrapper {
  margin: 1rem;
}

.table-header-wrapper {
  background-color: #E0E0E0;
  border-bottom: 2px solid black;
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
  padding: 0.2em 0.5em;
}

.table-header {
  color: black;
  font-size: 1.4em;
  font-weight: bold;
  margin-left: 1rem;
}

</style>
