<template>
     <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/goods.html">购物商城</a> &gt;
                <a href="/goods/42/1.html">商品详情</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <div class="left-925">
                        <div class="goods-box clearfix">
                            <div class="pic-box"></div>
                            <div class="goods-spec">
                                <h1>{{goodsinfo.title}}</h1>
                                <p class="subtitle">{{goodsinfo.sub_title}}</p>
                                <div class="spec-box">
                                    <dl>
                                        <dt>货号</dt>
                                        <dd id="commodityGoodsNo">{{goodsinfo.goods_no}}</dd>
                                    </dl>
                                    <dl>
                                        <dt>市场价</dt>
                                        <dd>
                                            <s id="commodityMarketPrice">¥{{goodsinfo.market_price}}</s>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt>销售价</dt>
                                        <dd>
                                            <em id="commoditySellPrice" class="price">¥{{goodsinfo.sell_price}}</em>
                                        </dd>
                                    </dl>
                                </div>
                                <div class="spec-box">
                                    <dl>
                                        <dt>购买数量</dt>
                                        <dd>
                                            <div class="stock-box">
                                                <el-input-number v-model="buyNum" @change="buychange" :min="1" :max="goodsinfo.stock_quantity" label="描述文字"></el-input-number>
                                            </div>
                                            <span class="stock-txt">
                                                库存
                                                <em id="commodityStockNum">{{goodsinfo.stock_quantity}}</em>件
                                            </span>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dd>
                                            <div id="buyButton" class="btn-buy">
                                                <button onclick="cartAdd(this,'/',1,'/shopping.html');" class="buy">立即购买</button>
                                                <button onclick="cartAdd(this,'/',0,'/cart.html');" class="add">加入购物车</button>
                                            </div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div id="goodsTabs" class="goods-tab bg-wrap">
                            <div id="tabHead" class="tab-head" style="position: static; top: 517px; width: 925px;">
                                <ul>
                                    <li>
                                        <a @click="selectIndex=0" href="javascript:;" :class="{selected:selectIndex==0}">商品介绍</a>
                                    </li>
                                    <li>
                                        <a @click="selectIndex=1" href="javascript:;" :class="{selected:selectIndex==1}">商品评论</a>
                                    </li>
                                </ul>
                            </div>
                            <div class="tab-content entry" style="display: block;" v-show="selectIndex==0" v-html="goodsinfo.content">
                               
                            </div>
                            <div class="tab-content" style="display: block;" v-show="selectIndex==1">
                                <div class="comment-box">
                                    <div id="commentForm" name="commentForm"
                                        class="form-box">
                                        <div class="avatar-box">
                                            <i class="iconfont icon-user-full"></i>
                                        </div>
                                        <div class="conn-box">
                                            <div class="editor">
                                                <textarea v-model="inputComment" id="txtContent" name="txtContent" sucmsg=" " datatype="*10-1000" nullmsg="请填写评论内容！"></textarea>
                                                <span class="Validform_checktip"></span>
                                            </div>
                                            <div class="subcon">
                                                <input id="btnSubmit" name="submit" type="button" value="提交评论" class="submit" @click="addCommitComment">
                                                <span class="Validform_checktip"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <ul id="commentList" class="list-box">
                                        <p style="margin: 5px 0px 15px 69px; line-height: 42px; text-align: center; border: 1px solid rgb(247, 247, 247);">暂无评论，快来抢沙发吧！</p>
                                        <li v-for="item in comments" :key="item.id">
                                            <div class="avatar-box">
                                                <i class="iconfont icon-user-full"></i>
                                            </div>
                                            <div class="inner-box">
                                                <div class="info">
                                                    <span>{{item.user_name}}</span>
                                                    <span>{{item.add_time | beautyTime}}</span>
                                                </div>
                                                <p>{{item.content}}</p>
                                            </div>
                                        </li>
                                    </ul>
                                    <div class="page-box" style="margin: 5px 0px 0px 62px;">
                                        <div id="pagination" class="digg">
                                            <Page @on-change="pageChange" :total="totalcount" placement='top' :page-size-opts='[6,16,26,36]' :page-size=6 show-elevator show-sizer />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="left-220">
                        <div class="bg-wrap nobg">
                            <div class="sidebar-box">
                                <h4>推荐商品</h4>
                                <ul class="side-img-list">
                                    <li v-for="item in hotgoodslist" :key="item.id">
                                        <div class="img-box">
                                            <router-link :to="'/detail/'+item.id">
                                            <!-- <a href="#/site/goodsinfo/90" class=""> -->
                                                <img :src="item.img_url">
                                            <!-- </a> -->
                                            </router-link>
                                        </div>
                                        <div class="txt-box">
                                            <router-link :to="'/detail/'+item.id">
                                            <!-- <a href="#/site/goodsinfo/90" class=""> -->
                                                {{item.title}}
                                            <!-- </a> -->
                                            </router-link>
                                            <span>{{item.add_time | beautyTime}}</span>
                                        </div>
                                    </li>
                                </ul>
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
  name: "Detail",
  data: function() {
    return {
      goodId: "",
      goodsinfo: {},
      hotgoodslist: [],
      imglist: [],
      buyNum: 1,
      // 标记tab栏显示哪个 0 :1
      selectIndex: 0,
      // 页码
      pageIndex: 1,
      // 页容量
      pageSize: 6,
      // 总条数
      totalcount: 0,
      // 评论内容
      comments: [],
      //用户评论内容
      inputComment:''
    };
  },
  methods: {
    buychange() {
      //console.log('改变');
    },
    getProductsInfo() {
      this.$axios
        .get("site/goods/getgoodsinfo/" + this.goodId)
        .then(response => {
          //console.log(response);
          this.goodsinfo = response.data.message.goodsinfo;
          this.hotgoodslist = response.data.message.hotgoodslist;
          this.imglist = response.data.message.imglist;
        });
    },
    getComments() {
      this.$axios
        .get(
          `site/comment/getbypage/goods/${this.goodId}?pageIndex=${
            this.pageIndex
          }&pageSize=${this.pageSize}`
        )
        .then(response => {
            console.log(response);
            
          this.totalcount = response.data.totalcount;
          this.pageIndex = response.data.pageIndex;
          this.pageSize = response.data.pageSize;
          this.comments = response.data.message;
        });
    },
    // 页码改变
    pageChange(pageNum) {
      this.pageIndex = pageNum;
      // 重新发请求
      this.getComments();
    },
    addCommitComment() {
      //console.log(123);
      this.$axios
        .post("site/validate/comment/post/goods/" + this.goodId, {
          "commenttxt": this.inputComment
        })
        .then(function(response) {
          //console.log(response);
        })
        .catch(function(error) {
          //console.log(error);
        });
    }
  },
  created() {
    this.goodId = this.$route.params.goodId;
    //console.log(this.goodId);
    this.getProductsInfo();
  },
  watch: {
    $route(to) {
      // 对路由变化作出响应...
      //console.log(to);
      this.goodId = to.params.goodId;
      this.getProductsInfo();
      this.buyNum = 1;
    }
  }
};
</script>

<style>
</style>

