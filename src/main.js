// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import VueRouter from 'vue-router'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import WelcomePage from './components/WelcomePage.vue'
import WindowsList from './components/WindowsList.vue'
import RoomsList from './components/RoomsList.vue'
import WindowDetails from './components/WindowDetails.vue'
import RoomDetails from './components/RoomDetails.vue'
import WindowAdd from './components/WindowAdd.vue'
import RoomAdd from './components/RoomAdd.vue'

Vue.config.productionTip = false
Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [{
    path: '/',
    component: WelcomePage
  },
  {
    path: '/windows-list',
    component: WindowsList
  },
  {
    path: '/rooms-list',
    component: RoomsList
  }, 
  {
    path: '/room-add',
    component: RoomAdd
  }, 
  {
    path: '/window-add',
    component: WindowAdd
  }, 
  {
    path: '/window/:id',
    component: WindowDetails
  },
  {
    path: '/room/:id',
    component: RoomDetails
  }]
})

/* eslint-disable no-new */
new Vue({
  router,
  el: '#app',
  components: { App },
  template: '<App/>'
})
