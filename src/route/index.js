import Vue from 'vue'
//引入路由插件
import VueRouter from 'vue-router'
//use一下
Vue.use(VueRouter)

//路由懒加载
const index = () =>
    import('@/components/index.vue');
const detail = () =>
    import('@/components/detail.vue');
const cart = () =>
    import('@/components/cart.vue');
const orderlist = () =>
    import('@/components/orderlist.vue');
const login = () =>
    import('@/components/login.vue');
const detailList = () =>
    import('@/components/detailList.vue');

//引入index组件
//import index from '@/components/index.vue';
//引入detail组件
//import detail from '@/components/detail.vue';
//引入购物车组件
//import cart from '@/components/cart.vue';
//引入下订单组件
//import orderlist from '@/components/orderlist.vue';
//引入注册组件
//import login from '@/components/login.vue';

export default new VueRouter({
    routes: [{
            path: '/',
            component: index,
            meta: {
                zhName: '首页'
            }
        },
        {
            path: '/index',
            name: 'index',
            component: index,
            meta: {
                zhName: '首页'
            }
        },
        {
            path: '/detail/:goodId',
            name: 'detail',
            component: detail,
            meta: {
                zhName: '详情页'
            }
        },
        {
            path: '/cart',
            name: 'cart',
            component: cart,
            meta: {
                zhName: '购物车'
            }
        },
        {
            path: '/orderlist/:ids',
            name: 'orderlist',
            component: orderlist,
            meta: {
                zhName: '生成订单',
                // 增加的标示字段 有这个字段 就需要 登录判断
                checkLogin: true
            }
        },
        {
            path: '/login',
            name: 'login',
            component: login,
            meta: {
                zhName: '登录'
            }
        },
        {
            path: '/detailList/:orderId',
            name: 'detailList',
            component: detailList,
            meta: {
                zhName: '支付中心',
                checkLogin: true
            }
        }
    ],
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return {
                x: 0,
                y: 0
            }
        }
    }
})