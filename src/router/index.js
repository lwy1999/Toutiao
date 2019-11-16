import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/login'
import Layout from '../views/layout'
import Home from '@/views/home'
import Article from '@/views/article'
import Publish from '@/views/publish'
import Nprofress from 'nprogress'

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
router.beforeEach((to, from, next) => {
  Nprofress.start()
  //  参数1：to ：表示路由对象
  //  参数2：from：表示正要离开的路由
  //  参数3：next： 是一个方法，用于路由放行
  // 如果是访问页面，则执行
  if (to.path === '/') {
    return next()
  }
  // 非登录页面
  const token = window.localStorage.getItem('user-token')
  if (token) {
    // 有token
    next()
  } else {
    // 没有token就跳转到登录页
    next('/')
    Nprofress.done()
  }
  router.afterEach((to, from) => {
    Nprofress.done()
  })
})

export default router
