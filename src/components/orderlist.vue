<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a @click="$router.push('/index')">首页</a> &gt;
                <a @click="$router.push('/cart')">购物车</a>
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
                                <li class="active">
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
                    <div class="cart-box">
                        <h2 class="slide-tit">
                            <span>1、收货地址</span>
                        </h2>
                        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                            <div id="orderForm" name="orderForm" url="">
                                <el-form-item label="请输入姓名:" prop="accept_name">
                                    <el-input v-model="ruleForm.accept_name" style="width:500px"></el-input>
                                </el-form-item>
                                <el-form-item label="请选择地址:" prop="area">
                                    <v-distpicker @selected="areaChange" :province="ruleForm.area.province.value" :city="ruleForm.area.city.value" :area="ruleForm.area.area.value"></v-distpicker>
                                </el-form-item>
                                <el-form-item label="请输入地址:" prop="address">
                                    <el-input v-model="ruleForm.address" style="width:500px"></el-input>
                                </el-form-item>
                                <el-form-item label="手机号码:" prop="mobile">
                                    <el-input v-model="ruleForm.mobile" style="width:500px"></el-input>
                                </el-form-item>
                                <el-form-item label="电子邮箱:" prop="email">
                                    <el-input v-model="ruleForm.email" style="width:500px"></el-input>
                                </el-form-item>
                                <el-form-item label="邮政编码:" prop="post_code">
                                    <el-input v-model="ruleForm.post_code" style="width:100px"></el-input>
                                </el-form-item>
                                <h2 class="slide-tit">
                                    <span>2、支付方式</span>
                                </h2>
                                <ul class="item-box clearfix">
                                    <!--取得一个DataTable-->
                                    <li>
                                        <el-radio v-model="ruleForm.payment_id" label="6">在线支付</el-radio>
                                        <span class="info"> 手续费: 0.00元</span>
                                    </li>
                                </ul>
                                <h2 class="slide-tit">
                                    <span>3、配送方式</span>
                                </h2>
                                <ul class="item-box clearfix">
                                    <!--取得一个DataTable-->
                                    <li>
                                        <el-radio @change="changeExpress(20)" v-model="ruleForm.express_id" label="1">顺丰</el-radio>
                                        <span class="info"> 费用: 20.00元</span>
                                        <el-radio @change="changeExpress(0)" v-model="ruleForm.express_id" label="2">圆通</el-radio>
                                        <span class="info"> 费用: 0.00元</span>
                                        <el-radio @change="changeExpress(-5)" v-model="ruleForm.express_id" label="3">韵达</el-radio>
                                        <span class="info"> 费用: -5.00元</span>
                                    </li>
                                </ul>
                                <h2 class="slide-tit">
                                    <span>4、商品清单</span>
                                </h2>
                                <div class="line15"></div>
                                <table width="100%" border="0" align="center" cellpadding="8" cellspacing="0" class="cart-table">
                                    <tbody>
                                        <tr>
                                            <th colspan="2" align="left">商品信息</th>
                                            <th width="84" align="left">单价</th>
                                            <th width="84" align="center">购买数量</th>
                                            <th width="104" align="left">金额(元)</th>
                                        </tr>
                                        <tr v-for="item in goodsList" :key="item.id">
                                            <td width="68">
                                                <a @click="$router.push({ path: `/detail/${item.id}` })">
                                                    <img :src="item.img_url" class="img">
                                                </a>
                                            </td>
                                            <td>
                                                <a @click="$router.push({ path: `/detail/${item.id}` })">{{item.title}}</a>
                                            </td>
                                            <td>
                                                <span class="red">
                                                    ￥{{item.sell_price}}
                                                </span>
                                            </td>
                                            <td align="center">{{item.buycount}}</td>
                                            <td>
                                                <span class="red">
                                                    ￥{{item.buycount*item.sell_price}}
                                                </span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div class="line15"></div>
                                <h2 class="slide-tit">
                                    <span>5、结算信息</span>
                                </h2>
                                <div class="buy-foot clearfix">
                                    <div class="left-box">
                                        <dl>
                                            <dt>订单备注(100字符以内)</dt>
                                            <dd>
                                                <textarea name="message" v-model="ruleForm.message" class="input" style="height:35px;"></textarea>
                                            </dd>
                                        </dl>
                                    </div>
                                    <div class="right-box">
                                        <p>
                                            商品
                                            <label class="price">{{totalCount}}</label> 件&nbsp;&nbsp;&nbsp;&nbsp; 商品金额：￥
                                            <label id="goodsAmount" class="price">{{ruleForm.goodsAmount}}</label> 元&nbsp;&nbsp;&nbsp;&nbsp;
                                        </p>
                                        <p>
                                            运费：￥
                                            <label id="expressFee" class="price">{{ruleForm.expressMoment}}</label> 元
                                        </p>
                                        <p class="txt-box">
                                            应付总金额：￥
                                            <label id="totalAmount" class="price">{{ruleForm.goodsAmount+ruleForm.expressMoment}}</label>
                                        </p>
                                        <p class="btn-box">
                                            <a class="btn button" @click="$router.push('/cart')" href="javascript:void(0)">返回购物车</a>
                                            <a id="btnSubmit" @click="submitOrder" class="btn submit">确认提交</a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </el-form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import VDistpicker from "v-distpicker";
export default {
  name: "orderlist",
  components: { VDistpicker },
  data: function() {
    var validateMobile = (rule, value, callback) => {
      let reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
      // 非空判断
      setTimeout(() => {
        if (value === "") {
          callback(new Error("请输入手机号"));
        } else if (reg.test(value) == false) {
          callback(new Error("请输入正确的手机号"));
        } else {
          // 没有问题
          callback();
        }
      }, 1000);
    };
    var validateEmail = (rule, value, callback) => {
      let reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
      // 非空判断
      setTimeout(() => {
        if (reg.test(value) == false) {
          callback(new Error("请输入正确的电子邮箱"));
        } else {
          // 没有问题
          callback();
        }
      }, 1000);
    };
    var validatePostCode = (rule, value, callback) => {
      let reg = /^[1-9]\d{5}(?!\d)$/;
      // 非空判断
      setTimeout(() => {
        if (reg.test(value) == false) {
          callback(new Error("请输入正确的邮政编码"));
        } else {
          // 没有问题
          callback();
        }
      }, 1000);
    };
    return {
      ruleForm: {
        accept_name: "张三",
        address: "xxx区",
        mobile: "13800138000",
        email: "123456.qq.com",
        post_code: "430000",
        area: {
          province: {
            code: "110000",
            value: "北京市"
          },
          city: {
            code: "110100",
            value: "北京城区"
          },
          area: {
            code: "110101",
            value: "东城区"
          }
        },
        //支付方式
        payment_id: "6",
        //快递方式
        express_id: "1",
        // 运费
        expressMoment: 20,
        // 订单备注
        message: "这么便宜,敢不敢在贵一点!",
        // 商品id
        goodsids: "",
        // 购买商品对象
        cargoodsobj: {},
        // 商品总金额
        goodsAmount: 0
      },
      // 商品列表数据
      goodsList: [],
      //验证规则
      rules: {
        accept_name: [
          { required: true, message: "请输入收货人姓名", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "长度在 2 到 10 个字符",
            trigger: "change"
          }
        ],
        address: [
          { required: true, message: "请输入收货人地址", trigger: "blur" },
          {
            min: 3,
            message: "最少3个字符",
            trigger: "change"
          }
        ],
        mobile: [{ validator: validateMobile, trigger: "change" }],
        email: [{ validator: validateEmail, trigger: "change" }],
        post_code: [{ validator: validatePostCode, trigger: "change" }]
      }
    };
  },
  methods: {
    areaChange(data) {
      this.ruleForm.area = data;
    },
    changeExpress(newprice) {
      this.ruleForm.expressMoment = newprice;
    },
    submitOrder() {
      this.$axios
        .post("site/validate/order/setorder", this.ruleForm)
        .then(response => {
          if (response.data.status == 0) {
            this.$message.success("订单创建成功");
            for (const key in this.ruleForm.cargoodsobj) {
              this.$store.commit("deleteCart", key);
            }
            this.$router.push("/detailList/" + response.data.message.orderid);
          } else {
            this.$message.error("订单创建失败");
          }
        });
    }
  },
  computed: {
    totalCount() {
      let num = 0;
      this.goodsList.forEach(v => {
        num += v.buycount;
      });
      return num;
    }
  },
  created() {
    //console.log(this.$route);
    this.ruleForm.goodsids = this.$route.params.ids;
    this.$axios
      .get(`site/validate/order/getgoodslist/${this.ruleForm.goodsids}`)
      .then(response => {
        //console.log(response);
        let temData = {};
        response.data.message.forEach(v => {
          v.buycount = this.$store.state.shopCartData[v.id];
          // 增加 属性名 跟 对应的数量
          temData[v.id] = v.buycount;
          // 累加 总金额即可
          this.ruleForm.goodsAmount += v.buycount * v.sell_price;
        });
        this.goodsList = response.data.message;
        this.ruleForm.cargoodsobj = temData;
      });
  }
};
</script>

<style>
.info {
  color: #ccc;
}
.item-box li .el-radio {
  margin-left: 10px;
}
</style>


