import Vue from 'vue'
//引入vuex来管理数据
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
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