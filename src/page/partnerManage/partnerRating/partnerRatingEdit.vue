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
            <!-- <span @click="returnToPage"><i class="icon-down-arrow"></i><span class="fs-13">返回{{returnPage}}</span></span> -->
          </el-col>
          <el-col :span="20">
            <p>{{titleType}}</p>
          </el-col>
        </el-row>
      </el-header>
      <el-main v-show="!pageLoading" class="mt-30">
        <transition name="el-fade-in-linear">
          <div v-if="activeStep==0">
            <el-form
              class="addheaduserform detail-form"
              label-width="120px"
              ref="addFormSetpOne"
              :model="editMsgForm"
              status-icon
            >
              <el-row :gutter="40">
                <el-col :span="22">
                  <el-form-item label="机构简介:">
                    <br>
                    <div v-html="editMsgForm.name" class="brief-intro"></div>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="40">
                <el-col :span="22">
                  <el-form-item label="服务满意度:" prop="name">
                    <el-row>
                      <el-col :span="2" class="text-center">{{dimension}}分</el-col>
                      <el-col :span="22">
                        <div class="block">
                          <el-slider v-model="dimension" :max="10"></el-slider>
                        </div>
                      </el-col>
                    </el-row>
                  </el-form-item>
                </el-col>
                <el-col :span="22">
                  <el-form-item label="机构环境:" prop="name">
                    <el-row>
                      <el-col :span="2" class="text-center">{{dimension1}}分</el-col>
                      <el-col :span="22">
                        <div class="block">
                          <el-slider v-model="dimension1" :max="10"></el-slider>
                        </div>
                      </el-col>
                    </el-row>
                  </el-form-item>
                </el-col>
                <el-col :span="22">
                  <el-form-item label="专业度:" prop="name">
                    <el-row>
                      <el-col :span="2" class="text-center">{{dimension2}}分</el-col>
                      <el-col :span="22">
                        <div class="block">
                          <el-slider v-model="dimension2" :max="10"></el-slider>
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
                      v-for="(item,index) in tags"
                      :key="item.name"
                      @click="chooseTag(item,index)"
                      class="tags"
                    >{{item.name}}</el-tag>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label>
                    <el-tag
                      type="success"
                      closable
                      v-for="(item,index) in choosedTags"
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
                    @click="returnToPage()"
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
  name: 'ratingEdit',
  computed: {
    activeStep: function() {
      return this.$route.query.activeStep || 0
    },
    id: function() {
      return this.$route.query.id || ''
    },
    returnPage: function() {
      return this.$route.query.id ? '详情页' : '列表页'
    }
  },
  data() {
    return {
      dimension: 5,
      dimension1: 5,
      dimension2: 5,
      titleType: '机构评级',
      pageLoading: false,
      choosedTags: [],
      tags: [
        {
          name: '服务好'
        },
        {
          name: '环境好'
        },
        {
          name: '专业'
        },
        {
          name: '中国知名品牌'
        },
        {
          name: '交通方便'
        },
        {
          name: '价格透明'
        }
      ],
      editMsgForm: {
        name:
          '<p>圣度健康是“健康质量管理MRC模式”的提出者和领导者，是推动健康管理服务规范化和标准化建设的倡导者，也是健康管理基层落地的先行者和践行者，旗下的“南充市健康管理研究院”也是国内率先开展健康管理产、学、研理论和实践研究的专业研究机构之一。</p><p>公司致力于培育民众科学的健康观念，提升民众健康素养和生命质量；为企业团体健康提供整体解决方案和精准健康管理服务；为公立医院体检中心的转型和改造提供咨询合作方案和健康管理专业技术支持；利用成熟的网络技术和现代信息技术，搭建健康大数据平台，为健康管理群体提供交互式、个性化和专业性的健康改善方案。</p><p>2018年，圣度健康旗下子公司，四川崇慈圣度健康管理有限公司与国家卫计委直属机构国家卫生计生委科学技术研究所（健康质量发展研究中心）达成了合作协议，成为了“健康质量促进/健康质量管理”相关国家级项目落地的实施主体以及相关技术在四川及其他区域转化的基地。同时，双方达成在 “国家级全民健康维护体系云平台系统”中共建“健康质量促进/健康质量管理（健康质量管理MRC）软件系统”，联合实施全民健康大数据的采集、整合和加工工作。</p>'
      },
      saveBasicAndReviewBtn: {
        isLoading: false,
        btnText: '保存并退出',
        isDisabled: false
      }
    }
  },
  created() {},
  methods: {
    returnToPage: function() {
      this.$router.push({
        path: `/nstitutionalRating/rating/ratingList`
      })
    },
    chooseTag(item, index) {
      this.choosedTags.push(item)
      this.tags.splice(index, 1)
    },
    closeTag(item, index) {
      this.tags.push(item)
      this.choosedTags.splice(index, 1)
    }
  }
}
</script>
