import Vue from 'vue'
import App from './App.vue'
import router from './route'
import store from './store'

//引入carvos动画
import './assets/js/cavars.js'

//引入element-ui框架
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

//引入iview框架
import iView from 'iview'
import 'iview/dist/styles/iview.css'
Vue.use(iView);

//引入懒加载
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
  error: require('./assets/img/大眼睛.jpg'),
  loading: require('./assets/img/奶茶妹.png')
})

//引入axios
import axios from "axios"
//抽取基地址
axios.defaults.baseURL = 'http://111.230.232.110:8899'

//将其加到vue原型中
Vue.prototype.$axios = axios

//引入放大镜插件
import ProductZoomer from 'vue-product-zoomer'
Vue.use(ProductZoomer)

//引入moment
import moment from "moment"

Vue.config.productionTip = false

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
