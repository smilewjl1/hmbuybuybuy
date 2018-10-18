<template>
    <div class="center">
        <div class="el-row">
            <div class="el-col el-col-24">
                <div class="comp">
                    <div class="goodsinfo routeanimate">
                        <div class="section">
                            <div class="location">
                                <span>当前位置：</span>
                                <a href="/index.html">首页</a> &gt;
                                <a href="javascript:;">支付中心</a>
                            </div>
                        </div>
                        <div class="section">
                            <div class="wrapper">
                                <div class="bg-wrap">
                                    <div class="nav-tit pay">
                                        <a href="javascript:;" class="selected">支付中心</a>
                                    </div>
                                    <div class="msg-tips">
                                        <div class="icon">
                                            <i class="iconfont icon-check"></i>
                                        </div>
                                        <div class="info">
                                            <strong>订单已支付成功！<span>还有<i>{{num}}秒</i>跳转到首页</span></strong>
                                            <p>您可以点击这里进入
                                                <router-link to="/infoCenter">
                                                <!-- <a href="/user/center/index.html"> -->
                                                会员中心
                                                <!-- </a> -->
                                                </router-link>
                                                查看订单状态！</p>
                                            <p>如有其它问题，请立即与我们客服人员联系。</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  name: "successPay",
  data(){
      return{
          num:5,
          interId:0
      }
  },
  created() {
    this.interId = setInterval(()=>{
        this.num--;
        if(this.num==0){
            this.$message.success('支付成功,亲,可以继续购物!!!');
            this.$router.push('/index');
        }
      },1000)
  },
  destroyed() {
      clearInterval(this.interId);
  },
};
</script>
<style>
.info span i{
    color: red;
    font-size: 14px;
    font-weight: 700;
}
</style>


