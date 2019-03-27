<style scoped lang="less">
.trans-fee {
  .table-list {
    margin-bottom: 20px;
  }
}
</style>
<template>
  <div class="nav-tab">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="体检订单详情" name="detail">
        <div class="detail-main border-top-clear">
          <el-container>
            <el-header>
              <el-row>
                <el-col :span="3">
                  <router-link :to="{path: '/orderManage/physicalOrder/physicalOrderList'}">
                    <div class="go-return icon-back"></div>
                  </router-link>
                </el-col>
                <el-col :span="18">
                  <p>体检订单详情</p>
                </el-col>
              </el-row>
            </el-header>
            <el-main v-loading="pageLoading">
              <div class="detail-list detail-form">
                <div class="detail-form-title">
                  <el-row>
                    <el-col :span="12" :offset="6" class="text-center">基础信息</el-col>
                    <el-col :span="6" class="text-right">
                      <!-- <el-button type="primary" size="mini" @click="goEditDetail(0)">编辑</el-button> -->
                    </el-col>
                  </el-row>
                </div>
                <el-row :gutter="10">
                  <el-col :span="8">
                    <div class="label-list">
                      <label>服务包名称:</label>
                      <div
                        class="detail-form-item"
                        v-html="pbFunc.dealNullData(detailData.service_package&&detailData.service_package.package_name)"
                      ></div>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div class="label-list">
                      <label>服务性别:</label>
                      <div
                        class="detail-form-item"
                        v-html="pbFunc.dealNullData(detailData.service_agencies&&detailData.service_agencies.service_sex&&detailData.service_agencies.service_sex.value)"
                      ></div>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div class="label-list">
                      <label>服务包合作方:</label>
                      <div
                        class="detail-form-item"
                        v-html="pbFunc.dealNullData(detailData.service_agencies&&detailData.service_agencies.enterprise_name)"
                      ></div>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div class="label-list">
                      <label>有效时间:</label>
                      <div
                        class="detail-form-item"
                        v-if="detailData.service_package&&detailData.effect_time_start"
                      >{{detailData.service_package&&detailData.service_package.effect_time_start}} - {{detailData.service_package&&detailData.service_package.effect_time_end}}</div>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div class="label-list">
                      <label>服务包价格:</label>
                      <div
                        class="detail-form-item"
                        v-html="pbFunc.dealNullData(detailData.service_package&&detailData.service_package.package_price)"
                      ></div>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div class="label-list">
                      <label>结算价格:</label>
                      <div
                        class="detail-form-item"
                        v-html="pbFunc.dealNullData(detailData.service_package&&detailData.service_package.settlement_price)"
                      ></div>
                    </div>
                  </el-col>

                  <el-col :span="8">
                    <div class="label-list">
                      <label>服务包说明:</label>
                      <div
                        class="detail-form-item"
                        v-html="pbFunc.dealNullData(detailData.service_package&&detailData.service_package.package_description)"
                      ></div>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </el-main>
          </el-container>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
export default {
  name: 'physicalOrderDetail',
  data() {
    return {
      pageLoading: false,
      activeStep: 0,
      activeName: 'detail',
      detailData: {
        carrier: {}
      }
    }
  },
  created() {
    this.getDetail()
  },
  computed: {
    id: function() {
      return this.$route.params.id
    }
  },
  methods: {
    handleClick() {},
    getDetail: function() {
      this.pageLoading = true
      this.$$http('orderDetail', { id: this.id })
        .then(results => {
          this.pageLoading = false
          if (results.data && results.data.code === 0) {
            this.detailData = results.data.content
          }
        })
        // eslint-disable-next-line
        .catch(err => {
          this.pageLoading = false
        })
    }
  }
}
</script>
