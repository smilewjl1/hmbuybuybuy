<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/cart.html">购物车</a>
            </div>
        </div>

        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <!--购物车头部-->
                    <div class="cart-head clearfix">
                        <h2>
                            <i class="iconfont icon-cart"></i>我的购物车</h2>
                        <div class="cart-setp">
                            <ul>
                                <li class="first active">
                                    <div class="progress">
                                        <span>1</span>
                                        放进购物车
                                    </div>
                                </li>
                                <li>
                                    <div class="progress">
                                        <span>2</span>
                                        填写订单信息
                                    </div>
                                </li>
                                <li class="last">
                                    <div class="progress">
                                        <span>3</span>
                                        支付/确认订单
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!--购物车头部-->
                    <!--商品列表-->
                    <div class="cart-box">
                        <input id="jsondata" name="jsondata" type="hidden">
                        <table width="100%" align="center" class="cart-table" border="0" cellspacing="0" cellpadding="8">
                            <tbody>
                                <tr>
                                    <th width="48" align="center">
                                        <a>选择</a>
                                    </th>
                                    <th align="left" colspan="2">商品信息</th>
                                    <th width="84" align="left">单价</th>
                                    <th width="104" align="center">数量</th>
                                    <th width="104" align="left">金额(元)</th>
                                    <th width="54" align="center">操作</th>
                                </tr>
                                <tr v-show="goodslist.length == 0">
                                    <td colspan="10">
                                        <div class="msg-tips">
                                            <div class="icon warning">
                                                <i class="iconfont icon-tip"></i>
                                            </div>
                                            <div class="info">
                                                <strong>购物车没有商品！</strong>
                                                <p>您的购物车为空，
                                                    <router-link to="./index">
                                                        <!-- <a href="/index.html"> -->
                                                        马上去购物吧！
                                                        <!-- </a> -->
                                                    </router-link>
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr v-show="goodslist.length != 0" v-for="item in goodslist" :key="item.id">
                                    <td>
                                        <el-switch v-model="item.selected" active-color="#13ce66" inactive-color="#ff4949">
                                        </el-switch>
                                    </td>
                                    <td>
                                        <img :src="item.img_url" alt="" style="width: 65px;">
                                    </td>
                                    <td> {{item.title}}
                                    </td>
                                    <td>{{item.sell_price}}</td>
                                    <td>
                                        <el-input-number @goodsCountChange="getChangeCount(item.id)" v-model="item.buycount" @change="countChange(item.id,$event)" :min="1" :max="10" label="描述文字"></el-input-number>
                                    </td>
                                    <td>{{item.buycount*item.sell_price}}</td>
                                    <td>
                                        <button type="button" @click="delOne(item.id)" class="el-button el-button--danger is-circle">
                                            <i class="el-icon-delete"></i>
                                        </button>
                                    </td>
                                </tr>
                                <tr>
                                    <th align="right" colspan="8">
                                        已选择商品
                                        <b class="red" id="totalQuantity">{{getTotalCount}}</b> 件 &nbsp;&nbsp;&nbsp; 商品总金额（不含运费）：
                                        <span class="red">￥</span>
                                        <b class="red" id="totalAmount">{{getTotalPrice}}</b>元
                                    </th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <!--/商品列表-->
                    <!--购物车底部-->
                    <div class="cart-foot clearfix">
                        <div class="right-box">
                            <button class="button" @click="$router.push({ path: 'index' })">继续购物</button>
                            <button class="submit" @click="$router.push({ path:`/orderlist/${checkIds}`})">立即结算</button>
                        </div>
                    </div>
                    <!--购物车底部-->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: "cart",
  data: function() {
    return {
      goodslist: []
    };
  },
  created() {
    //console.log(this.$store.state.shopCartData);
    let ids = "";
    for (const key in this.$store.state.shopCartData) {
      ids += key;
      ids += ",";
    }
    //console.log(ids);
    //去掉最后一个','号
    ids = ids.slice(0, -1);
    this.$axios.get(`site/comment/getshopcargoods/${ids}`).then(response => {
      //console.log(response);
      response.data.message.forEach(v => {
        v.buycount = this.$store.state.shopCartData[v.id];
        v.selected = true;
      });
      //方法2进行赋值
      // this.goodList = response.data.message;
      // response.data.message.forEach(v => {
      //   // 当前这个商品的购买数量  = Vuex中的购买数量
      //   v.buycount = this.$store.state.shopCartData[v.id];
      //   // 修改选中的状态
      //   //   v.selected = true;
      //   // 参数1 对象 参数2 新属性名 参数3 属性值
      //   // 组件中 使用 $set 访问 Vue.set即可
      //   this.$set(v,'selected',true);
      // });
      this.goodslist = response.data.message;
    });
  },
  methods: {
      //修改商品数量事件
    countChange(id, newCount) {
      this.$store.commit("updateCart", {
        id,
        newCount
      });
    },
    //删除商品事件
    delOne(id) {
      this.$confirm("确定要删除该商品吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
             //从vuex中删除
            this.$store.commit("deleteCart",id);
            //从数组中删除
            this.goodslist.forEach((v,index) => {
                if(v.id == id){
                    this.goodslist.splice(index,1);
                }
            });
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  },
  computed: {
      //计算商品总数事件
    getTotalCount() {
      let totalCount = 0;
      this.goodslist.forEach(v => {
        if (v.selected) {
          totalCount += v.buycount;
        }
      });
      return totalCount;
    },
    //计算总金额
    getTotalPrice() {
      let totalPrice = 0;
      this.goodslist.forEach(v => {
        if (v.selected) {
          totalPrice += v.sell_price * v.buycount;
        }
      });
      return totalPrice;
    },
    //选中的商品id
    checkIds(){
        let ids = '';
        this.goodslist.forEach(v => {
            if(v.selected){
                ids += v.id;
                ids += ',';
            }
        })
        ids = ids.slice(0,-1);
        return ids;
    }
  }
};
</script>

<style>
</style>


