import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/login'
import Layout from '../views/layout'
import Home from '@/views/home'
import Article from '@/views/article'
import Publish from '@/views/publish'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Login
  },
  {
    path: '/layout',
    component: Layout,
    children: [
      {
        path: '',
        component: Home
      }, {
        path: '/publish',
        component: Publish
      },
      {
        path: '/article',
        component: Article
      }
    ]
  }

  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
