<style scoped lang="less">
.brief-intro {
  text-indent: 2rem;
}
.tags {
  margin-right: 10px;
  margin-bottom: 10px;
  cursor: pointer;
}
/deep/ .code {
  input {
    border-color: #dcdfe6 !important;
  }
  i {
    display: none;
  }
}
</style>
<template>
  <div id="addPerson" class="detail-main">
    <el-container v-loading="pageLoading">
      <el-header>
        <el-row>
          <el-col :span="2" class="left-arrow-d">
            <div class="go-return icon-back" @click="returnToPage"></div>
          </el-col>
          <el-col :span="20">
            <p>机构评级</p>
          </el-col>
        </el-row>
      </el-header>
      <el-main v-show="!pageLoading" class="mt-30">
        <transition name="el-fade-in-linear">
          <div>
            <el-form
              class="addheaduserform detail-form"
              label-width="120px"
              ref="addFormSetpOne"
              status-icon
            >
              <el-row :gutter="40">
                <el-col :span="22">
                  <el-form-item label="机构简介:">
                    <br>
                    <div v-html="detailData.introduction" class="brief-intro"></div>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="40">
                <el-col :span="22" v-for="item in rateList" :key="item._id">
                  <el-form-item :label="item.rate_name">
                    <el-row>
                      <el-col :span="2" class="text-center">{{item.score}}分</el-col>
                      <el-col :span="22">
                        <div class="block">
                          <el-slider v-model="item.score" :max="item.score_max"></el-slider>
                        </div>
                      </el-col>
                    </el-row>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="40">
                <el-col :span="24">
                  <el-form-item label="标签:" prop="name">
                    <el-tag
                      v-for="(item,index) in tagList"
                      :key="item.name"
                      @click="chooseTag(item,index)"
                      :type="item.ischoosed ? 'info' : ''"
                      class="tags"
                    >{{item.name}}</el-tag>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label>
                    <el-tag
                      closable
                      v-for="(item,index) in choosedTags"
                      type="success"
                      :key="item.name"
                      @close="closeTag(item,index)"
                      class="tags"
                    >{{item.name}}</el-tag>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
            <div class="detail-btn">
              <el-row>
                <el-col :span="12" :offset="6" class="text-center">
                  <el-button type="danger" @click="returnToPage()">取消</el-button>
                  <el-button
                    type="primary"
                    @click="confirmSubmit()"
                    :loading="saveBasicAndReviewBtn.isLoading"
                    :disabled="saveBasicAndReviewBtn.isDisabled"
                  >{{saveBasicAndReviewBtn.btnText}}</el-button>
                </el-col>
              </el-row>
            </div>
          </div>
        </transition>
      </el-main>
    </el-container>
  </div>
</template>
<script>
export default {
  name: 'partnerRatingEdit',
  computed: {
    id: function() {
      console.log('this.$route', this.$route)
      return this.$route.params.id || ''
    }
  },
  data() {
    return {
      pageLoading: false,
      detailData: {},
      rateList: [],
      tagList: [],
      choosedTags: [],
      // editMsgForm: {
      //   name:
      //     '<p>圣度健康是“健康质量管理MRC模式”的提出者和领导者，是推动健康管理服务规范化和标准化建设的倡导者，也是健康管理基层落地的先行者和践行者，旗下的“南充市健康管理研究院”也是国内率先开展健康管理产、学、研理论和实践研究的专业研究机构之一。</p><p>公司致力于培育民众科学的健康观念，提升民众健康素养和生命质量；为企业团体健康提供整体解决方案和精准健康管理服务；为公立医院体检中心的转型和改造提供咨询合作方案和健康管理专业技术支持；利用成熟的网络技术和现代信息技术，搭建健康大数据平台，为健康管理群体提供交互式、个性化和专业性的健康改善方案。</p><p>2018年，圣度健康旗下子公司，四川崇慈圣度健康管理有限公司与国家卫计委直属机构国家卫生计生委科学技术研究所（健康质量发展研究中心）达成了合作协议，成为了“健康质量促进/健康质量管理”相关国家级项目落地的实施主体以及相关技术在四川及其他区域转化的基地。同时，双方达成在 “国家级全民健康维护体系云平台系统”中共建“健康质量促进/健康质量管理（健康质量管理MRC）软件系统”，联合实施全民健康大数据的采集、整合和加工工作。</p>'
      // },
      saveBasicAndReviewBtn: {
        isLoading: false,
        btnText: '保存并退出',
        isDisabled: false
      }
    }
  },
  created() {
    this.getTagList()
      .then(() => {
        return this.getDetail()
      })
      .then(() => {
        this.dealData()
      })
  },
  methods: {
    returnToPage() {
      this.$router.push({
        path: `/partnerManage/partnerRating/partnerRatingList`
      })
    },
    getDetail() {
      let postData = {
        id: this.id
      }
      return new Promise((resolve, reject) => {
        this.$$http('getRatingDetail', postData)
          .then(results => {
            this.pageLoading = false
            if (results.data && results.data.code == 0) {
              this.detailData = results.data.content
              console.log('this.detailData', this.detailData)
            }
            resolve(results)
          })
          .catch(err => {
            this.pageLoading = false
            reject(err)
          })
      })
    },
    getTagList() {
      let postData = {
        id: this.id
      }
      return new Promise((resolve, reject) => {
        this.$$http('getTagList', postData)
          .then(results => {
            this.pageLoading = false
            if (results.data && results.data.code == 0) {
              this.tagList = results.data.content.tag
              this.rateList = results.data.content.rate
            }
            resolve(results)
          })
          .catch(err => {
            this.pageLoading = false
            reject(err)
          })
      })
    },
    dealData() {
      this.tagList.forEach(item => {
        item.ischoosed = false
        this.detailData.enterprise_rate.tag_list.forEach(subItem => {
          if (item._id === subItem._id) {
            item.ischoosed = true
            this.choosedTags.push(subItem)
          }
        })
      })
      this.rateList.forEach(item => {
        item.score = 10
        this.detailData.enterprise_rate.rate_score_list.forEach(subItem => {
          if (item._id === subItem.rate._id) {
            item.score = subItem.score
            item.rate_score = subItem._id
          }
        })
      })
    },
    confirmSubmit() {
      console.log('this.rateList', this.rateList, this.choosedTags)
      let choosedTagsId = this.choosedTags.map(item => item._id)
      let rateListArray = []
      let apiName = this.detailData.enterprise_rate.status
        ? 'fixRate'
        : 'creatRate'
      console.log('this.rateList', this.rateList)
      this.rateList.forEach(item => {
        if (apiName === 'fixRate') {
          rateListArray.push({
            rate_score: item.rate_score,
            score: item.score
          })
        } else {
          rateListArray.push({
            rate: item._id,
            score: item.score
          })
        }
      })
      let postData = {
        rate_score_list: rateListArray,
        tag_list: choosedTagsId,
        enterprise: this.id
      }

      this.saveBasicAndReviewBtn = {
        isLoading: true,
        btnText: '保存并退出',
        isDisabled: true
      }

      this.$$http(apiName, postData)
        .then(results => {
          this.saveBasicAndReviewBtn = {
            isLoading: false,
            btnText: '保存并退出',
            isDisabled: false
          }
          if (results.data && results.data.code == 0) {
            this.$router.push({
              path: '/partnerManage/partnerRating/partnerRatingList'
            })
          }
        })
        .catch(err => {
          this.saveBasicAndReviewBtn = {
            isLoading: false,
            btnText: '保存并退出',
            isDisabled: false
          }
        })
    },
    chooseTag(item, index) {
      if (!item.ischoosed) {
        this.choosedTags.push(item)
        this.tagList[index].ischoosed = true
      }
    },
    closeTag(item, index) {
      this.choosedTags.splice(index, 1)
      this.tagList.forEach(tag => {
        if (tag._id === item._id) {
          tag.ischoosed = false
        }
      })
    }
  }
}
</script>
