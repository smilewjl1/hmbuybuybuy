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
                            <div class="pic-box" v-if="images.normal_size.length!=0">
                                <ProductZoomer :base-images="images" :base-zoomer-options="zoomerOptions"/>
                            </div>
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
                                                <textarea v-model.trim="message" @keyup.enter="addCommitComment" id="txtContent" name="txtContent" sucmsg=" " datatype="*10-1000" nullmsg="请填写评论内容！"></textarea>
                                                <span class="Validform_checktip"></span>
                                            </div>
                                            <div class="subcon">
                                                <input id="btnSubmit" name="submit" type="button" value="提交评论" class="submit" @click="addCommitComment">
                                                <span class="Validform_checktip"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <ul id="commentList" class="list-box">
                                        <p v-show="comments.length == 0" style="margin: 5px 0px 15px 69px; line-height: 42px; text-align: center; border: 1px solid rgb(247, 247, 247);">暂无评论，快来抢沙发吧！</p>
                                        <li v-show="comments.length != 0" v-for="item in comments" :key="item.id">
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
                                            <Page :current="pageIndex" @on-page-size-change="pageSizeChange" @on-change="pageChange" :total="totalcount" placement='top' :page-size-opts='[6,16,26,36]' :page-size=6 show-elevator show-sizer />
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
      message:'',
      //图片放大镜
      images: {
          normal_size: [
          {
            id: 1,
            url:
              "http://img5.imgtn.bdimg.com/it/u=415293130,2419074865&fm=26&gp=0.jpg"
          },
          {
            id: 2,
            url:
              "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1539919185&di=db2e7162dcc8cf7d0763594b4c9c6fd9&imgtype=jpg&er=1&src=http%3A%2F%2Fimg77.ph.126.net%2F9bLTJ2JP7-qPNCGuZf-Ndw%3D%3D%2F3023885674804087701.jpg"
          }
        ]
      },
      zoomerOptions: {
        zoomFactor: 4,
        pane: 'container-round',
        hoverDelay: 300,
        namespace: 'inline-zoomer',
        move_by_click:true,
        scroll_items: 5,
        choosed_thumb_border_color: "#bbdefb"
      }
    };
  },
  methods: {
    buychange() {
      //console.log('改变');
    },
    getProductsInfo() {
      // 原始数据赋值为空
      this.images.normal_size = [];
      this.$axios
        .get("site/goods/getgoodsinfo/" + this.goodId)
        .then(response => {
          //console.log(response);
          this.goodsinfo = response.data.message.goodsinfo;
          this.hotgoodslist = response.data.message.hotgoodslist;
          this.imglist = response.data.message.imglist;
          //处理数据img
          let tem_normal_size = [];
          this.imglist.forEach(v => {
            tem_normal_size.push({
              id: v.id,
              url: v.thumb_path
            });
          });
          this.images.normal_size = tem_normal_size;
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
           // console.log(response);  
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
    pageSizeChange(pageSize){
        this.pageSize = pageSize;
        //console.log(pageSize);
        this.pageIndex = 1;
        this.getComments();
    },
    addCommitComment() {
      if(this.message == ''){
          this.$Message.warning('评论内容不能为空');
          return;
      }
      this.$axios
        .post("site/validate/comment/post/goods/" + this.goodId, {
          commenttxt: this.message
        })
        .then(() => {
          //console.log(response);
          this.pageIndex = 1;
          this.getComments();
          this.message = '';
          this.$Message.success('评论内容发表成功');
        })
    }
  },
  created() {
    this.goodId = this.$route.params.goodId;
    //console.log(this.goodId);
    //获取商品信息
    this.getProductsInfo();
    // 获取 评论数据
    this.getComments();
  },
  watch: {
    $route(to) {
      // 对路由变化作出响应...
      //console.log(to);
      this.goodId = to.params.goodId;
      // 重新获取数据
      this.getProductsInfo();
      // 重新获取评论
      this.getComments();
      // 把购买数量修改为1即可
      this.buyNum = 1;
    }
  }
};
</script>

<style>
.tab-content img {
  /* 变块 */
  display: block;
}
.pic-box{
    width:390px;
}
</style>

