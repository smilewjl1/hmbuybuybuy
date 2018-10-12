import Vue from 'vue'
import App from './App.vue'

//引入路由插件
import VueRouter from 'vue-router'
//use一下
Vue.use(VueRouter)

import index from './components/index.vue';
//引入detail组件
import detail from './components/detail.vue';
//引入购物车组件
import cart from './components/cart.vue';

//引入element-ui框架
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)

//引入iview框架
import iView from 'iview';
import 'iview/dist/styles/iview.css';
Vue.use(iView);

//引入懒加载
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
  error: require('./assets/img/大眼睛.jpg'),
  loading: require('./assets/img/奶茶妹.png')
})

//引入axios
import axios from "axios";
//抽取基地址
axios.defaults.baseURL = 'http://111.230.232.110:8899';

//将其加到vue原型中
Vue.prototype.$axios = axios;

//引入放大镜插件
import ProductZoomer from 'vue-product-zoomer'
Vue.use(ProductZoomer)

//引入moment
import moment from "moment";

//引入vuex来管理数据
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    shopCartData:JSON.parse(window.localStorage.getItem('cartData')) || {}
  },
  mutations: {
    addCart(state,opt){
      if(state.shopCartData[opt.id] == undefined){
        Vue.set(state.shopCartData,opt.id,opt.buyCount);
      }else{
        state.shopCartData[opt.id] += opt.buyCount;
      }
    }
  },
  getters: {
    cartGoodCount(state) {
      let totalCount = 0;
      for (const key in state.shopCartData) {
          totalCount += state.shopCartData[key];
      }
      return totalCount;
    }
  }
})

Vue.config.productionTip = false

const routes = [
  {
    path:'/',
    component:index
  },
  {
    path:'/index',
    component:index
  },
  {
    path:'/detail/:goodId',
    component:detail
  },
  {
    path:'/cart',
    component:cart
  },
];

//实例化路由
const router = new VueRouter({
  routes
});

//抽取全局过滤器
Vue.filter('beautyTime', function (value) {
    return moment(value).format("YYYY年MM月DD日");
});
//美化全局时间过滤器
Vue.filter('beautyTimePro', function (value,timeStr) {
  return moment(value).format(timeStr);
});

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')

// 浏览器关闭事件
window.onbeforeunload = function(){
  window.localStorage.setItem('cartData',JSON.stringify(store.state.shopCartData));
}
