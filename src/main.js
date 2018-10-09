import Vue from 'vue'
import App from './App.vue'
//引入路由插件
import VueRouter from 'vue-router'

import index from './components/index.vue';
//use一下
Vue.use(VueRouter)

Vue.config.productionTip = false

const routes = [
  {
    path:'/',
    component:index
  },
  {
    path:'/index',
    component:index
  }
];

//实例化路由
const router = new VueRouter({
  routes
});

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
