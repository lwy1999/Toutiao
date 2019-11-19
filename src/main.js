import App from './App.vue'
import Vue from 'vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './styles/index.less'
import axios from 'axios'
import 'nprogress/nprogress.css' // 引入 nprogress.css样式
import JSONbig from 'json-bigint'
import moment from 'moment'

Vue.use(ElementUI)
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'
axios.defaults.transformResponse = [function (data, headers) {
  // Do whatever you want to transform the data

  // axios 默认使用 JSON.parse(data)
  // 我们这里手动配置使用 JSONbig.parse(data)
  try {
    return JSONbig.parse(data)
  } catch (err) {
    console.log(err)
    // 一旦 try 里面的代码执行引发异常，那么就进入 catch 执行
    return {}
  }
}]
// axios 请求拦截器
axios.interceptors.request.use(function (config) {
  // 请求拦截器函数中的 config 是本次请求相关的配置对象
  // config 是最后发给我们发给后端的数据配置
  // 可以在拦截中对 config 统一配置
  // console.log('请求拦截器', config)
  // 获取存储在本地的 user-token
  const token = window.localStorage.getItem('user-token')
  // 统一添加请求头
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  // return config 通行的规则
  return config
}, function (err) {
  // 请求错误处理
  return Promise.reject(err)
})
Vue.prototype.$axios = axios
Vue.config.productionTip = false
// 全局过滤器
Vue.filter('dateFormat', value => {
  return moment(value).format('YYYY-MM-DD')
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
