import Vue from 'vue'
//引入vuex来管理数据
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    shopCartData:JSON.parse(window.localStorage.getItem('cartData')) || {},
    isLogin:false
  },
  mutations: {
    addCart(state,opt){
      if(state.shopCartData[opt.id] == undefined){
        Vue.set(state.shopCartData,opt.id,opt.buyCount);
      }else{
        state.shopCartData[opt.id] += opt.buyCount;
      }
    },
    updateCart(state,opt){
      state.shopCartData[opt.id] = opt.newCount;
    },
    deleteCart(state,id){
      Vue.delete(state.shopCartData,id);
    },
    updateLoginState(state,loginState){
        state.isLogin = loginState;
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