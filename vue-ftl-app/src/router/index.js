import Vue from 'vue'
import VueRouter from 'vue-router'
//import Home from '../views/Home.vue'
import MainScreen from '../views/MainScreen.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'MainScreen',
    component: MainScreen,
    props: (route) => ({ mode: route.query.mode })
  },
  
  /*{
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */// '../views/About.vue')
  //},*/
  /*
  {
    path: '/message',
    name: 'Message',
    
    component: () => import( '../views/Message.vue')
  },*/
  {
    path: '/ship',
    name: 'Ship',
    
    component: () => import(/* webpackChunkName: "about" */ '../views/Ship.vue')
  },
  {
    path: '/galaxymap',
    name: 'GalaxyMap',

    component: () => import(/* webpackChunkName: "about" */ '../views/GalaxyView.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
