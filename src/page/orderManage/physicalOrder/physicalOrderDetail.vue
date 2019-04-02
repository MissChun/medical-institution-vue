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
                        v-html="pbFunc.dealNullData(detailData.service_package&&detailData.service_package.service_sex_str)"
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
                        v-if="detailData.service_package&&detailData.service_package.effect_time_start"
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
                <el-row
                  :gutter="10"
                  v-if="detailData.service_package&&detailData.service_package.projects&&detailData.service_package.projects.length"
                >
                  <el-col :span="24">
                    <div class="table-list">
                      <el-table
                        :data="detailData.service_package.projects"
                        stripe
                        style="width: 100%"
                        size="mini"
                        border
                        :class="{'tabal-height-500':!detailData.service_package.projects.length}"
                      >
                        <el-table-column
                          v-for="(item,key) in thTableList"
                          :key="key"
                          :prop="item.param"
                          :width="item.width?item.width:''"
                          :label="item.title"
                          :align="item.align"
                        >
                          <template slot-scope="scope">
                            <div v-if="item.param === 'sub_projects'">
                              <span
                                v-for="(projects,index) in scope.row.sub_projects"
                                :key="projects._id"
                              >
                                {{projects.project_name}}
                                <span
                                  v-if="index<scope.row.sub_projects.length-1"
                                >，</span>
                              </span>
                            </div>
                            <div v-else>{{scope.row[item.param]}}</div>
                          </template>
                        </el-table-column>
                      </el-table>
                      <no-data v-if="!detailData.service_package.projects.length"></no-data>
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
      detailData: {},
      thTableList: [
        {
          title: '类别',
          param: 'project_name',
          width: '200',
          align: 'center'
        },
        {
          title: '小项',
          param: 'sub_projects',
          width: '',
          align: ''
        }
      ]
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
            if (this.detailData.service_package.service_sex === '0') {
              this.detailData.service_package.service_sex_str = '女'
            } else if (this.detailData.service_package.service_sex === '1') {
              this.detailData.service_package.service_sex_str = '男'
            } else if (this.detailData.service_package.service_sex === '2') {
              this.detailData.service_package.service_sex_str = '不限'
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
