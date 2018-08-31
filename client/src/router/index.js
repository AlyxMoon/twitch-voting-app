import Vue from 'vue'
import Router from 'vue-router'

import { AdminPolls, Home, TwitchAuth } from '@/views'

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
      path: '/polls',
      name: 'adminPolls',
      component: AdminPolls
    },
    {
      path: '/twitch/redirect',
      name: 'TwitchAuth',
      component: TwitchAuth
    }
  ]
})
