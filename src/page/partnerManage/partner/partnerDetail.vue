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
      <el-tab-pane label="合作方详情" name="detail">
        <div class="detail-main border-top-clear">
          <el-container>
            <el-header>
              <el-row>
                <el-col :span="3">
                  <router-link :to="{path: '/partnerManage/partner/partnerList'}">
                    <div class="go-return icon-back"></div>
                  </router-link>
                </el-col>
                <el-col :span="18">
                  <p>合作方详情</p>
                </el-col>
              </el-row>
            </el-header>
            <el-main v-loading="pageLoading">
              <div class="detail-list detail-form">
                <div class="detail-form-title">
                  <el-row>
                    <el-col :span="12" :offset="6" class="text-center">基础信息</el-col>
                    <el-col :span="6" class="text-right">
                      <el-button type="primary" size="mini" @click="goEditDetail(0)">编辑</el-button>
                    </el-col>
                  </el-row>
                </div>
                <el-row :gutter="10">
                  <el-col :span="8">
                    <div class="label-list">
                      <label>合作方名称:</label>
                      <div
                        class="detail-form-item"
                        v-html="pbFunc.dealNullData(detailData.enterprise_name)"
                      ></div>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div class="label-list">
                      <label>合作方类型:</label>
                      <div
                        class="detail-form-item"
                        v-html="pbFunc.dealNullData(detailData.enterprise_type&&detailData.enterprise_type.type_name)"
                      ></div>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div class="label-list">
                      <label>机构三合一信用码:</label>
                      <div
                        class="detail-form-item"
                        v-html="pbFunc.dealNullData(detailData.credit_code)"
                      ></div>
                    </div>
                  </el-col>
                </el-row>
                <el-row :gutter="10">
                  <el-col :span="8">
                    <div class="label-list">
                      <label>合作方联系人:</label>
                      <div
                        class="detail-form-item"
                        v-html="pbFunc.dealNullData(detailData.contact)"
                      ></div>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div class="label-list">
                      <label>合作方联系电话:</label>
                      <div
                        class="detail-form-item"
                        v-html="pbFunc.dealNullData(detailData.contact_phone)"
                      ></div>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div class="label-list">
                      <label>合作方地址:</label>
                      <div
                        class="detail-form-item"
                        v-html="pbFunc.dealNullData(detailData.position&&detailData.position.address)"
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
  name: 'partnerDetail',
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
    partnerId: function() {
      return this.$route.params.id
    }
  },
  methods: {
    handleClick() {},
    getDetail: function() {
      this.pageLoading = true
      this.$$http('associatedPartnersDetail', { id: this.partnerId })
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
    },
    goEditDetail: function(number) {
      this.$router.push({
        path:
          `/partnerManage/partner/partnerEdit/?id=` +
          this.partnerId +
          `&activeStep=` +
          number
      })
    }
  }
}
</script>
