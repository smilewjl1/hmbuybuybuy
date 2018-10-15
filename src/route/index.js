import Vue from 'vue'
//引入路由插件
import VueRouter from 'vue-router'
//use一下
Vue.use(VueRouter)

//引入index组件
import index from '@/components/index.vue';
//引入detail组件
import detail from '@/components/detail.vue';
//引入购物车组件
import cart from '@/components/cart.vue';
//引入下订单组件
import orderlist from '@/components/orderlist.vue';
//引入注册组件
import login from '@/components/login';

export default new VueRouter({
    routes : [{
            path: '/',
            component: index
        },
        {
            path: '/index',
            component: index
        },
        {
            path: '/detail/:goodId',
            component: detail
        },
        {
            path: '/cart',
            component: cart
        },
        {
            path:'/orderlist',
            component:orderlist
        },
        {
            path:'/login',
            component:login
        }
    ]
})
