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
    path: '/User',
    name: 'User',
    component: () => import(/* webpackChunkName: "about" */ '../views/User.vue')
  },
  {
    path: '/map/:mode',
    name: 'MapMode',
    props: true,
    component: () => import(/* webpackChunkName: "about" */ '../views/MapView.vue')
  },
  {
    path: '/map',
    name: 'Map',
    component: () => import(/* webpackChunkName: "about" */ '../views/MapView.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
