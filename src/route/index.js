import Vue from 'vue'
//引入路由插件
import VueRouter from 'vue-router'
//use一下
Vue.use(VueRouter)

//路由懒加载 引入首页组件
const index = () => import('@/components/index.vue');
//引入商品详情页组件
const detail = () => import('@/components/detail.vue');
//引入购物车组件
const cart = () => import('@/components/cart.vue');
//引入确认订单组件
const orderlist = () => import('@/components/orderlist.vue');
//引入登录组件
const login = () => import('@/components/login.vue');
//引入支付页组件
const detailList = () => import('@/components/detailList.vue');
//引入支付成功组件
const successPay = () => import('@/components/successPay.vue');
//引入会员中心组件
const infoCenter = () => import('@/components/infoCenter.vue');
//引入会员中心子组件
const info = () => import('@/components/infoPage/info.vue');
//订单列表组件
const orderList = () => import('@/components/infoPage/orderList.vue');
//订单详情组件
const orderInfo = () => import('@/components/infoPage/orderInfo.vue');

export default new VueRouter({
    routes: [{
            path: '/',
            component: index,
            meta: {
                zhName: '首页',
                //设置页面是否要缓存
                keepAlive: true
            }
        },
        {
            path: '/index',
            name: 'index',
            component: index,
            meta: {
                zhName: '首页',
                keepAlive: true
            }
        },
        {
            path: '/detail/:goodId',
            name: 'detail',
            component: detail,
            meta: {
                zhName: '详情页',
                keepAlive: true
            }
        },
        {
            path: '/cart',
            name: 'cart',
            component: cart,
            meta: {
                zhName: '购物车',
                keepAlive: false
            }
        },
        {
            path: '/orderlist/:ids',
            name: 'orderlist',
            component: orderlist,
            meta: {
                zhName: '生成订单',
                keepAlive: false,
                // 增加的标示字段 有这个字段 就需要 登录判断
                checkLogin: true
            }
        },
        {
            path: '/login',
            name: 'login',
            component: login,
            meta: {
                zhName: '登录',
                keepAlive: false
            }
        },
        {
            path: '/detailList/:orderId',
            name: 'detailList',
            component: detailList,
            meta: {
                zhName: '支付中心',
                keepAlive: false,
                checkLogin: true
            }
        },
        {
            path: '/successPay',
            name: 'successPay',
            component: successPay,
            meta: {
                checkLogin: true,
                keepAlive: false,
                zhName:'支付成功'
            }
        },
        {
            path: '/infoCenter',
            component: infoCenter,
            meta: {
                checkLogin: true,
                keepAlive: true,
                zhName:'会员中心'
            },
            children:[
                {
                    path:'',
                    redirect:'info'
                },
                {
                    path:'info',
                    name:'info',
                    component:info,
                    meta: {
                        checkLogin: true,
                        keepAlive: false,
                        zhName:'会员中心'
                    }
                },
                {
                    path:'orderInfo/:orderId',
                    name:'orderInfo',
                    component:orderInfo,
                    meta: {
                        checkLogin: true,
                        keepAlive: false,
                        zhName:'订单详情'
                    }
                },
                {
                    path:'orderList',
                    name:'orderList',
                    component:orderList,
                    meta: {
                        checkLogin: true,
                        keepAlive: false,
                        zhName:'订单列表'
                    }
                },
            ]
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