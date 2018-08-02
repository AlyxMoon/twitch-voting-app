import Vue from 'vue'
import Router from 'vue-router'

import { Home, TwitchAuth } from '@/views'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/twitch/redirect',
      name: 'TwitchAuth',
      component: TwitchAuth
    }
  ]
})
