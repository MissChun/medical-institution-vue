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
      <el-tab-pane label="体检报告详情" name="detail">
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
                  <p>体检报告详情</p>
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
                      <label>姓名:</label>
                      <div
                        class="detail-form-item"
                        v-html="pbFunc.dealNullData(detailData.nick_name)"
                      ></div>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div class="label-list">
                      <label>性别:</label>
                      <div
                        class="detail-form-item"
                        v-html="pbFunc.dealNullData(detailData.genderStr)"
                      ></div>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div class="label-list">
                      <label>年龄:</label>
                      <div class="detail-form-item" v-html="pbFunc.dealNullData(detailData.age)"></div>
                    </div>
                  </el-col>
                </el-row>
                <el-row :gutter="10">
                  <el-col :span="8">
                    <div class="label-list">
                      <label>体检机构:</label>
                      <div
                        class="detail-form-item"
                        v-html="pbFunc.dealNullData(detailData.bak_field1)"
                      ></div>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div class="label-list">
                      <label>体检日期:</label>
                      <div
                        class="detail-form-item"
                        v-html="pbFunc.dealNullData(detailData.record_date)"
                      ></div>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div class="label-list">
                      <label>报告日期:</label>
                      <div
                        class="detail-form-item"
                        v-html="pbFunc.dealNullData(detailData.zj_date)"
                      ></div>
                    </div>
                  </el-col>
                </el-row>
                <el-row v-if="false">
                  <el-col :span="24">
                    <div class="table-list mt-25">
                      <el-table
                        :data="tableData"
                        stripe
                        style="width: 100%"
                        size="mini"
                        v-loading="pageLoading"
                        :class="{'tabal-height-500':!tableData.length}"
                      >
                        <el-table-column
                          v-for="(item,key) in thTableList"
                          :key="key"
                          :prop="item.param"
                          align="center"
                          :label="item.title"
                          :width="item.width"
                        >
                          <template slot-scope="scope">
                            <div>{{scope.row[item.param]}}</div>
                          </template>
                        </el-table-column>
                        <el-table-column label="操作" align="center" width="150" fixed="right">
                          <template slot-scope="scope">
                            <el-button
                              type="primary"
                              size="mini"
                              @click="newPage('detail',scope.row)"
                            >查看</el-button>
                          </template>
                        </el-table-column>
                      </el-table>
                      <noData v-if="!pageLoading && tableData.length==0"></noData>
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
    id: function() {
      return this.$route.params.id
    }
  },
  methods: {
    handleClick() {},
    getDetail: function() {
      this.pageLoading = true
      this.$$http('physicalDetail', { id: this.id })
        .then(results => {
          this.pageLoading = false
          if (results.data && results.data.code === 0) {
            this.detailData = results.data.content
            if (this.detailData.gender === '0') {
              this.detailData.genderStr = '女'
            } else if (this.detailData.gender === '1') {
              this.detailData.genderStr = '男'
            } else {
              this.detailData.genderStr = '未知'
            }
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
