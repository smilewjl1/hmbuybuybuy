import Vue from 'vue'
import App from './App.vue'

//引入路由插件
import VueRouter from 'vue-router'

//use一下
Vue.use(VueRouter)

import index from './components/index.vue';
//引入detail组件
import detail from './components/detail.vue';
//引入element-ui框架
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
 
Vue.use(ElementUI)

//引入懒加载
import VueLazyload from 'vue-lazyload'

Vue.use(VueLazyload, {
  error: require('./assets/img/大眼睛.jpg'),
  loading: require('./assets/img/奶茶妹.png')
})
//引入axios
import axios from "axios";
//将其加到vue原型中
Vue.prototype.$axios = axios;

Vue.config.productionTip = false

const routes = [
  {
    path:'/',
    component:index
  },
  {
    path:'/index',
    component:index,
  },
  {
    path:'/detail/:goodId',
    component:detail
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
