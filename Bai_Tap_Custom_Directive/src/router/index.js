import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Image from '../views/Image.vue'
import PaginationDemo from '../views/PaginationDemo.vue'

import TableFilterLearn from '../views/TableFilterLearn.vue'
import DirectiveDemo from '../views/DirectiveDemo'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/About.vue')
    }
  },
  {
    path: '/image/:id',
    component: Image
  },
  {
    path: '/tablefilter',
    component: TableFilterLearn
  },
  {
    path: '/pagidemo',
    component: PaginationDemo
  },
  {
    path: '/directivedemo',
    component: DirectiveDemo
  }
]

const router = new VueRouter({
  routes
})

export default router
