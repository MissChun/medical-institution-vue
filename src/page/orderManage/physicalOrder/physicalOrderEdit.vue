<style scoped lang="less">
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
          <div>
            <div class="detail-form-title text-center">基础信息</div>
            <el-form
              class="addheaduserform detail-form"
              label-width="120px"
              ref="addFormSetpOne"
              :rules="rules"
              :model="editMsgForm"
              status-icon
            >
              <el-row :gutter="40">
                <el-col :span="8">
                  <el-form-item label="姓名:" prop="user">
                    <el-select
                      v-model="editMsgForm.user"
                      filterable
                      remote
                      reserve-keyword
                      placeholder="请输入姓名搜索"
                      :remote-method="getUsersList"
                      :loading="consumersLoading"
                      @change="selectUser"
                    >
                      <el-option
                        v-for="(item) in usersList"
                        :key="item._id"
                        :label="item.nick_name"
                        :value="item.user"
                      >
                        <span style="float: left">{{ item.nick_name }}</span>
                        <span
                          style="float: right; color: #8492a6; font-size: 13px"
                        >{{ item.identity_card }}</span>
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="身份证号:" prop="enterprise_type">
                    <div>{{displayContent.idNumber}}</div>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="40">
                <el-col :span="8">
                  <el-form-item label="健康服务包名称:" label-width="140px" prop="service_package">
                    <el-select
                      v-model="editMsgForm.service_package"
                      clearable
                      placeholder="请输入选择"
                      filterable
                      @change="selectServicePack"
                    >
                      <el-option
                        v-for="(item) in servicePackList"
                        :key="item._id"
                        :label="item.package_name"
                        :value="item._id"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="40">
                <el-col :span="8">
                  <el-form-item label="服务包合作方:" prop="contact">
                    <div>{{displayContent.serviceAgencies}}</div>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="服务包价格:" label-width="130px" prop="contact_phone">
                    <div>{{displayContent.packagePrice}}</div>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="服务包说明:">
                    <div>{{displayContent.packageDescription}}</div>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
            <div class="detail-btn">
              <el-row>
                <el-col :span="12" :offset="6" class="text-center">
                  <!-- <el-button type="success" @click="editBasics(nextStepBtn,'next')" :loading="nextStepBtn.isLoading" :disabled="nextStepBtn.isDisabled">{{nextStepBtn.btnText}}</el-button> -->
                  <el-button
                    type="primary"
                    @click="editBasics(saveBasicAndReviewBtn,'out')"
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
  name: 'physicalOrderEdit',
  computed: {
    titleType: function() {
      return this.$route.query.id ? '编辑体检订单' : '新增体检订单'
    },
    id: function() {
      return this.$route.query.id || ''
    },
    returnPage: function() {
      return this.$route.query.id ? '详情页' : '列表页'
    },
    enterpriseId() {
      let users = this.pbFunc.getLocalData('users', true)
      return users.enterprise._id
    }
  },
  data() {
    return {
      dimension: 0,
      pageLoading: false,
      consumersLoading: false,
      addType: '默认新增',
      partnerTypeList: '', // 合作方类型
      editMsgForm: {
        user: '',
        service_package: '',
        order_type: 'business-order'
      },
      rules: {
        user: [{ required: true, message: '请选择姓名', trigger: 'change' }],
        service_package: [
          { required: true, message: '请选择健康服务包', trigger: 'change' }
        ]
      },
      saveBasicAndReviewBtn: {
        isLoading: false,
        btnText: '保存',
        isDisabled: false
      },
      // nextStepBtn: {
      //   isLoading: false,
      //   btnText: '保存并下一步',
      //   isDisabled: false,
      // },
      detail: {},
      servicePackList: [], // 服务包列表
      usersList: [], // 客户列表
      displayContent: {
        idNumber: '',
        serviceAgencies: '',
        packagePrice: '',
        packageDescription: ''
      }
    }
  },
  created() {
    if (this.id) {
      this.getDetail()
    }
    this.getUsersList()
    this.getServicePackList()
  },
  methods: {
    returnToPage: function() {
      this.$router.push({
        path: '/orderManage/physicalOrder/physicalOrderList'
      })
    },
    // 选择用户
    selectUser() {
      this.usersList.forEach(item => {
        if (item.user === this.editMsgForm.user) {
          this.displayContent.idNumber = item.identity_card
        }
      })
    },
    // 选择服务包
    selectServicePack() {
      if (!this.editMsgForm.service_package) {
        this.displayContent.serviceAgencies = ''
        this.displayContent.packagePrice = ''
        this.displayContent.packageDescription = ''
      }
      this.servicePackList.forEach(item => {
        if (item._id === this.editMsgForm.service_package) {
          this.displayContent.serviceAgencies =
            item.service_agencies.enterprise_name
          this.displayContent.packagePrice = item.package_price
          this.displayContent.packageDescription = item.package_description
        }
      })
    },
    editAjax(postData, formName, btnObject, stepNum, isReview) {
      return new Promise((resolve, reject) => {
        let btnTextCopy = this.pbFunc.deepcopy(btnObject).btnText
        this.btnNew = {
          btnText: btnTextCopy,
          isDisabled: false,
          isLoading: false
        }
        let apiName = 'addOrder'
        this.$refs[formName].validate(valid => {
          if (valid) {
            /* 如果id存在则为编辑 */
            btnObject = {
              btnText: '正在提交',
              isDisabled: true,
              isLoading: true
            }
            postData.enterprise = this.enterpriseId
            postData.source = 'C'
            this.$$http(apiName, postData)
              .then(results => {
                if (
                  results.data &&
                  results.data.code === 0 &&
                  results.data.content
                ) {
                  this.$message.success('新增成功')
                  this.$router.push({
                    path: `/orderManage/physicalOrder/physicalOrderList`
                  })
                  resolve(results.data.content)
                } else {
                  reject(results.data.content)
                }
              })
              .catch(err => {
                btnObject = this.btnNew
                reject(err)
              })
          }
        })
      })
    },
    // 服务包列表
    getServicePackList() {
      let postData = {
        need_all: true,
        enterprise: this.enterpriseId,
        package_type: 'medical'
      }
      this.$$http('servicePackList', postData)
        .then(results => {
          if (results.data && results.data.code === 0) {
            this.servicePackList = results.data.content.instances
          }
        })
        // eslint-disable-next-line
        .catch(err => {
          this.$message({
            message: '获取服务包列表失败',
            type: 'error'
          })
        })
    },
    // 客户列表
    getUsersList(query) {
      let postData = {
        page_size: 100,
        enterprise: this.enterpriseId
      }
      if (query) {
        postData.search = query
      }
      this.$$http('usersList', postData)
        .then(results => {
          if (results.data && results.data.code === 0) {
            this.usersList = results.data.content
          }
        })
        // eslint-disable-next-line
        .catch(err => {
          this.$message({
            message: '获取用户列表失败',
            type: 'error'
          })
        })
    },
    editBasics(btn, btnType) {
      let formName = 'addFormSetpOne'
      let btnObject = btn
      let keyArray = ['user', 'service_package', 'order_type']
      let postData = this.pbFunc.fifterbyArr(this.editMsgForm, keyArray)
      this.editAjax(postData, formName, btnObject, null, true)
    }
  }
}
</script>
