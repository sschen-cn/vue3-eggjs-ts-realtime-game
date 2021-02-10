import { defineAsyncComponent } from 'vue'
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import Room from '../views/Room.vue'
import DrawSome from '../views/DrawSome/index.vue'

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
    // component: defineAsyncComponent({
    //   loader: () => import(/* webpackChunkName: "room" */ '../views/Room.vue'),
    //   delay: 2000
    // })
    component: Room
  },
  {
    path: '/DrawSome',
    name: 'DrawSome',
    meta: { index: 2 },
    component: DrawSome
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
