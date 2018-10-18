import Vue from 'vue'
//引入路由插件
import VueRouter from 'vue-router'
//use一下
Vue.use(VueRouter)

//路由懒加载
const index = () => import('@/components/index.vue');
const detail = () => import('@/components/detail.vue');
const cart = () => import('@/components/cart.vue');
const orderlist = () => import('@/components/orderlist.vue');
const login = () => import('@/components/login.vue');
const detailList = () => import('@/components/detailList.vue');
const successPay = () => import('@/components/successPay.vue');
//引入会员中心组件
const infoCenter = () => import('@/components/infoCenter.vue');
//引入会员中心子组件
const info = () => import('@/components/infoPage/info.vue');
const orderList = () => import('@/components/infoPage/orderList.vue');
const orderInfo = () => import('@/components/infoPage/orderInfo.vue');

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
        },
        {
            path: '/successPay',
            name: 'successPay',
            component: successPay,
            meta: {
                checkLogin: true,
                zhName:'支付成功'
            }
        },
        {
            path: '/infoCenter',
            name: 'infoCenter',
            component: infoCenter,
            meta: {
                checkLogin: true,
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
                        zhName:'会员中心'
                    }
                },
                {
                    path:'orderInfo/:orderId',
                    name:'orderInfo',
                    component:orderInfo,
                    meta: {
                        checkLogin: true,
                        zhName:'订单详情'
                    }
                },
                {
                    path:'orderList',
                    name:'orderList',
                    component:orderList,
                    meta: {
                        checkLogin: true,
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