import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    meta: { index: 1 },
    component: Home
  },
  {
    path: '/Room',
    name: 'Room',
    meta: { index: 2 },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Room.vue')
    // component: About
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
