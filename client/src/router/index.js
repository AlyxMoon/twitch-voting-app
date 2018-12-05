import Vue from 'vue'
import Router from 'vue-router'

import * as views from '@/views'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: views.Home
    },
    {
      path: '/games',
      name: 'Games',
      component: views.Games
    },
    {
      path: '/polls',
      name: 'adminPolls',
      component: views.AdminPolls
    },
    {
      path: '/twitch/redirect',
      name: 'TwitchAuth',
      component: views.TwitchAuth
    }
  ]
})
