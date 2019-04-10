<style scoped lang="less">
.trans-fee {
  .table-list {
    margin-bottom: 20px;
  }
}
.report-item {
  padding: 0 20px;
  margin-bottom: 20px;

  background-color: #fff;
  border-radius: 5px;

  border: 1px solid #dbdbdb;

  font-size: 13px;
  line-height: 30px;
  .report-title {
    height: 60px;
    line-height: 60px;
    font-size: 16px;
  }
  .report-item-content {
    padding: 5px 0;
    border-top: 1px solid #e9e9e9;
  }
  .report-check-summary {
    border-top: 1px solid #e9e9e9;
    margin-top: 10px;
    padding-top: 5px;
    .sign-display {
      width: 175px;
      text-align: left;
    }
  }
}

.color-blue {
  font-size: 16px;
  font-weight: bold;
}

.flex-box {
  display: flex;
  .flex-one {
    flex: 1;
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
                <el-row>
                  <el-col :span="24">
                    <div
                      class="report-item"
                      v-for="(item,index) in detailData.checkList"
                      :key="index"
                    >
                      <div class="report-title">
                        <span>{{item.section_name}}</span>
                        <!-- <icon class="fd"></icon> -->
                      </div>
                      <div class="report-item-content">
                        <div class="report-check-item">
                          <div class="flex-box">
                            <span class="color-blue flex-one">检查项</span>
                            <span class="color-blue flex-one">检查结果</span>
                            <span
                              class="color-blue flex-one"
                              v-if="item.section_name === '检验科'"
                            >参考范围</span>
                          </div>
                          <div
                            v-for="(medicalItem,subIndex) in item.medical_item"
                            :key="subIndex"
                            class="flex-box"
                          >
                            <span class="flex-one">{{medicalItem.item_name}}</span>
                            <span class="flex-one">{{medicalItem.exam_detail}}</span>
                            <span
                              class="flex-one"
                              v-if="item.section_name === '检验科'"
                            >{{medicalItem.ref_ranger}}</span>
                          </div>
                        </div>

                        <div
                          class="report-check-summary"
                          v-if="item.section_name !== '检验科' && item.medical_summary.length"
                        >
                          <div
                            v-for="(summaryItem,sumIndex) in item.medical_summary"
                            :key="sumIndex"
                          >
                            <div>
                              <span>检查小结：{{summaryItem.conclusion}}</span>
                            </div>
                            <div class="clearfix">
                              <div class="sign-display">
                                <span>检查时间：{{summaryItem.check_time }}</span>
                              </div>
                              <div class="sign-display">
                                <span>检查人：{{summaryItem.check_user}}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
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
    id() {
      return this.$route.params.id
    }
  },
  methods: {
    handleClick() {},
    dealData(data) {
      let newData = {}
      if (data.medical_item && data.medical_item.length) {
        let allSectionList = data.medical_item.map(item => item.section_name)
        let sectionList = []
        // 找到所有未重复的科室
        allSectionList.forEach(item => {
          if (sectionList.indexOf(item) === -1) {
            sectionList.push(item)
          }
        })

        if (data.gender === '0') {
          newData.genderStr = '女'
        } else if (data.gender === '1') {
          newData.genderStr = '男'
        } else {
          newData.genderStr = '未知'
        }

        newData.nick_name = data.nick_name
        newData.birthday = data.birthday
        newData.record_date = data.record_date
        newData.checkList = []

        sectionList.forEach(item => {
          let checkListItem = {
            section_name: item,
            medical_item: [],
            medical_summary: []
          }
          data.medical_item.forEach(child => {
            if (item === child.section_name) {
              checkListItem.medical_item.push(child)
            }
          })

          data.medical_summary.forEach(child => {
            if (item === child.section_name) {
              child.check_time = child.check_time.slice(0, 10)
              if (item === '检验科' && child.conclusion !== '未见明显异常') {
                checkListItem.medical_summary.push(child)
              } else {
                checkListItem.medical_summary.push(child)
              }
            }
          })

          newData.checkList.push(checkListItem)
        })
        return newData
      }
    },
    getDetail() {
      this.pageLoading = true
      this.$$http('getRecordsDetail', { id: this.id })
        .then(results => {
          console.log('results', results)
          this.pageLoading = false
          if (results.data && results.data.code === 0) {
            //this.detailData = results.data.content

            this.detailData = this.dealData(results.data.content)
            console.log('this.detailData', this.detailData)
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
