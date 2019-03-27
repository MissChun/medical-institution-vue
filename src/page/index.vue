<style scoped lang="less">
.el-container {
  background: #fff;
}

.el-container,
div,
span,
a {
  font-family: PingFangSC-Light !important;
}

.el-main {
  padding: 0;
  .banner {
    width: 100%;
    height: 705px;
    background: url('../assets/img/banner.png') no-repeat 50%;
    .banner-content {
      width: 1200px;
      margin: 0 auto;
      position: relative;
      .banner-op {
        position: absolute;
        top: 280px;
        width: 100%;
        text-align: center;
        .banner-font {
          font-size: 32px;
          font-family: PingFangSC-Light;
          color: #fff;
          line-height: 64px;
          width: 562px;
          height: 64px;
          background: url('../assets/img/Rectangle.png') no-repeat;
          text-align: center;
          margin: 0 auto;
        }
        .banner-btn {
          margin-top: 102px;
          button {
            width: 300px;
            height: 60px;
            font-size: 22px;
          }
        }
      }
    }
  }
  .advantage {
    width: 1200px;
    margin: 0 auto;
    margin-bottom: 90px;
    .advantage-list {
      height: 618px;
      width: 100%;
      .advantage-list-msg {
        height: 309px;
        background: #f7f8fa;
        text-align: center;
        padding: 0 40px;
        img {
          margin: 56px 0 22px;
        }
        span {
          display: block;
          font-size: 24px;
          color: #555555;
          margin-bottom: 20px;
        }
        div {
          font-size: 16px;
          color: #50565c;
          line-height: 22px;
          text-align: center;
        }
      }
      .advantage-list-img {
        img {
          width: 100%;
        }
      }
    }
  }
  .product {
    width: 100%;
    height: 670px;
    background: url('../assets/img/product.png') no-repeat 50%;
    display: inline-block;
    .list-title {
      color: #fff;
    }

    .product-content {
      width: 1120px; // height: 220px;
      margin: 0 auto;

      .is-animating {
        // width: 920px;
      }
      /deep/ .el-carousel__container {
        height: 220px;
        .el-carousel__arrow {
          background: none;
          i {
            font-size: 24px;
          }
        }
        .el-carousel__arrow--left {
          left: 35px;
        }
        .el-carousel__arrow--right {
          right: 35px;
        }
      }
      /deep/ .el-carousel__indicators {
        display: none;
      }
      .product-list {
        position: absolute;
        top: 0;
        left: 100px;
        width: 820px;
        margin: 0 auto;
        padding: 0 50px;
        color: #fff;
        height: 220px;
        &:after {
          content: ' ';
          width: 100%;
          height: 220px;
          position: absolute;
          left: 0;
          top: 0;
          background: rgba(255, 255, 255, 0.2); // filter: blur(2px);
          z-index: 2;
        }

        > span {
          font-size: 24px;

          margin: 48px 0 10px 0;
          display: inline-block;
        }
        > div {
          width: 512px;
          line-height: 28px;
          font-size: 14px;
        }
      }
      .app-one {
        background: url('../assets/img/app1.png') no-repeat 680px 30px;
      }
      .app-two {
        background: url('../assets/img/app2.png') no-repeat 680px 30px;
      }
      .app-three {
        background: url('../assets/img/app3.png') no-repeat 680px 30px;
      }
      .app-code {
        ul {
          list-style-type: none;
          text-align: center;
          margin-top: 74px;
          li {
            width: 132px;
            height: 50px;
            border-radius: 25px;
            border: 1px solid #fff;

            text-align: center;
            display: inline-block;
            margin: 0 5px;
            font-size: 14px;
            cursor: pointer;
            position: relative;
            > span {
              line-height: 50px;
              color: #fff;
            }
            &:hover {
              .code {
                display: block;
              }
            }
            .code {
              display: none;
              position: absolute;
              z-index: 9;
              left: -1px;
              bottom: -55px;
              width: 134px;
              height: 160px;
              background: #fff;
              > span {
                line-height: 22px;
                letter-spacing: 3px;
              }
            }
          }
        }
      }
    }
  }

  .list-title {
    font-size: 42px;
    color: #333;
    text-align: center;
    letter-spacing: 3px;
    margin: 90px auto 56px auto;
    position: relative;
    width: 280px;
    &:before {
      position: absolute;
      left: -15px;
      top: 14px;
      content: ' ';
      display: block;
      height: 15px;
      width: 15px;
      background: #409eff;
      -webkit-transform: rotate(45deg);
      transform: rotate(45deg);
    }
    &:after {
      position: absolute;
      right: -15px;
      top: 14px;
      content: ' ';
      display: block;
      height: 15px;
      width: 15px;
      background: #409eff;
      -webkit-transform: rotate(45deg);
      transform: rotate(45deg);
    }
  }
}

.bpm-footer {
  width: 100%;
  height: 92px;
  background: #232f36;
  text-align: center;
  display: inline-block;
  > div {
    margin-top: 20px;
    font-size: 14px;
    color: #e8e8e8;
    line-height: 26px;
  }
}

.el-footer {
  padding: 0;
}
</style>
<template>
  <div>
    <el-container>
      <common-header :type="'index'" :app-url="appUrl" :login-link="isLogin"></common-header>
      <el-main>
        <div class="banner">
          <div class="banner-content">
            <div class="banner-op">
              <div class="banner-font">清洁 / 高效 / 协同 / 智能</div>
              <div class="banner-btn">
                <el-button type="primary" v-on:click="isLogin">开始使用</el-button>
              </div>
            </div>
          </div>
        </div>
        <div class="advantage">
          <div class="list-title">我们的优势</div>
          <div class="advantage-content">
            <el-row>
              <el-col :span="6">
                <div class="advantage-list">
                  <div class="advantage-list-msg">
                    <img src="@/assets/img/ai.png">
                    <span>车辆智能调度</span>
                    <div>在确保时效性的前提下，依托 业界领先的算法技术计算装货 与卸货的最优调度方案</div>
                  </div>
                  <div class="advantage-list-img">
                    <img src="@/assets/img/Bitmap1.png">
                  </div>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="advantage-list">
                  <div class="advantage-list-img">
                    <img src="@/assets/img/Bitmap2.png">
                  </div>
                  <div class="advantage-list-msg">
                    <img src="@/assets/img/data.png">
                    <span>数据精细管理</span>
                    <div>驾驶员/销售/统计/财务数据实 时同步、精确统计</div>
                  </div>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="advantage-list">
                  <div class="advantage-list-msg">
                    <img src="@/assets/img/search.png">
                    <span>行业全景洞察</span>
                    <div>为管理人员与销售人员提供实 时更新的全国LNG价格图表， 为制定销售策略提供辅助</div>
                  </div>
                  <div class="advantage-list-img">
                    <img src="@/assets/img/Bitmap3.png">
                  </div>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="advantage-list">
                  <div class="advantage-list-img">
                    <img src="@/assets/img/Bitmap4.png">
                  </div>
                  <div class="advantage-list-msg">
                    <img src="@/assets/img/for.png">
                    <span>业务协同推进</span>
                    <div>从获取销售需求到物流运输、 财务管理实现全站多角色高效 协同与跟踪记录</div>
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
        <div class="product">
          <div class="list-title">我们的产品</div>
          <div class="product-content">
            <el-carousel :interval="5000" arrow="always">
              <el-carousel-item>
                <div class="product-list app-one">
                  <span>业务端 APP</span>
                  <div>与91LNG-BPM业务管理系统无缝衔接，业务员可随时随地通过手机下单、跟进装卸车信息、 进行销售单结算，并可查看每日业务汇总数据，贸易业务全流程一手掌控。</div>
                </div>
              </el-carousel-item>
              <el-carousel-item>
                <div class="product-list app-two">
                  <span>司机端 APP</span>
                  <div>与91LNG-TMS运输管理系统无缝衔接，装/卸车信息同步下发至司机、磅单/铅封 及时上传审核、合理规划装卸车路径，协助打造运输环节全透明，运输数据全纪录 的承运体系。</div>
                </div>
              </el-carousel-item>
              <el-carousel-item>
                <div class="product-list app-three">
                  <span>客户端 APP</span>
                  <div>与91LNG-BPM业务管理系统衔接，终端买家可进行询价/下单、查看磅单/车辆位 置、管理站点等操作，线上化交易与结算，交易数据可供追溯及分析，让买家更省 心。</div>
                </div>
              </el-carousel-item>
            </el-carousel>
            <div class="app-code">
              <ul>
                <li>
                  <span>业务端APP</span>
                  <div class="code">
                    <img width="100%" :src="businessCodeImg" alt>
                    <span>扫码下载</span>
                  </div>
                </li>
                <li>
                  <span>司机端APP</span>
                  <div class="code">
                    <img width="100%" :src="driverCodeImg" alt>
                    <span>扫码下载</span>
                  </div>
                </li>
                <li>
                  <span>客户端APP</span>
                  <div class="code">
                    <img width="100%" :src="consumerCodeImg" alt>
                    <span>扫码下载</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </el-main>
      <el-footer>
        <div class="bpm-footer">
          <div>
            Copyright © {{newYear}} 成都浩海通达科技有限公司 - 蜀ICP备17041791号-1
            <br>QQ：1373724944(联系客服) - 邮箱：fangyuan@hhtdlng.com(合作洽谈)
          </div>
        </div>
      </el-footer>
    </el-container>
  </div>
</template>
<script>
import commonHeader from '@/components/common/commonHeader'
export default {
  name: 'index',
  components: {
    commonHeader: commonHeader
  },
  data() {
    return {
      businessCodeImg: '', // 业务端下载二维码
      driverCodeImg: '', // 司机端下载二维码
      consumerCodeImg: '', // 客户端下载二维码
      appUrl: {
        businessAppUrl: '', // 业务端下载链接
        driverAppUrl: '', // 司机端下载链接
        consumerAppUrl: '' // 客户端下载链接
      },
      user: this.pbFunc.getLocalData('users', true),
      newYear: ''
    }
  },
  computed: {},
  methods: {
    isLogin() {
      if (this.user && this.user.nick_name) {
        this.$router.push({
          path: '/orderManage/physicalOrder/physicalOrderList'
        })
        // this.$emit('login')
      } else {
        this.$router.push({
          path: '/login'
        })
      }
    },
    getData() {
      let myDate = new Date()
      return myDate.getFullYear()
    }
  },
  created() {
    let currentUrl = document.location.href.toString()
    this.newYear = this.getData()

    const getUrl = urlLink => {
      this.businessCodeImg = `http://www.pgyer.com/app/qrcode/newBusiness${urlLink}`
      this.driverCodeImg = `http://www.pgyer.com/app/qrcode/newDriver${urlLink}`
      this.consumerCodeImg = `https://www.pgyer.com/app/qrcode/newConsumer${urlLink}`

      this.appUrl.consumerAppUrl = `https://www.pgyer.com/newConsumer${urlLink}`
      this.appUrl.businessAppUrl = `https://www.pgyer.com/newBusiness${urlLink}`
      this.appUrl.driverAppUrl = `https://www.pgyer.com/newDriver${urlLink}`
    }
    if (currentUrl.match('ptms.hhtdlng.com')) {
      getUrl('Temp')
      this.driverCodeImg = `http://www.pgyer.com/app/qrcode/newDriverNewTemp`
      this.appUrl.driverAppUrl = `https://www.pgyer.com/newDriverNewTemp`
    } else if (currentUrl.match('ptms.91lng.cn')) {
      getUrl('Prepare')
    } else if (currentUrl.match('tms.hhtdlng.com')) {
      getUrl('Test')
    } else if (currentUrl.match('tms.91lng.cn')) {
      getUrl('Pro')
    } else {
      getUrl('Dev')
    }
  }
}
</script>
