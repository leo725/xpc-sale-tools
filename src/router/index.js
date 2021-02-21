import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
  },
  {
    path: '/temp',
    name: '模板分享',
    component: () => import('../views/temp.vue')
  },
  {
    path: '/poster',
    name: '海报',
    component: () => import('../views/poster.vue')
  },
  {
    path: '/subject',
    name: '专题分享',
    component: () => import('../views/subject.vue')
  }
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
})

export default router
