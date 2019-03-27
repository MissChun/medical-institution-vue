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
                  <el-form-item label="姓名:">
                    <div>{{signing.name}}</div>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="身份证号:">
                    <div>{{signing.idNumber}}</div>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="40">
                <el-col :span="8">
                  <el-form-item label="健康服务包类型:" label-width="140px" prop="servicePackType">
                    <el-select
                      v-model="editMsgForm.servicePackType"
                      clearable
                      placeholder="请选择"
                      @change="getServicePackList"
                    >
                      <el-option
                        v-for="(item) in servicePackTypeList"
                        :key="item._id"
                        :label="item.type_name"
                        :value="item.type_key"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="健康服务包名称:" label-width="140px" prop="package">
                    <el-select
                      v-model="editMsgForm.package"
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
                    <div>{{signing.serviceAgencies}}</div>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="服务包价格:" label-width="130px" prop="contact_phone">
                    <div>{{signing.packagePrice}}</div>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="服务包说明:">
                    <div>{{signing.packageDescription}}</div>
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
      return '签约服务包'
    },
    id: function() {
      return this.$route.params.id || ''
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
      partnerTypeList: '', // 合作方类型
      editMsgForm: {
        user: '',
        package: '',
        servicePackType: ''
      },
      rules: {
        servicePackType: [
          { required: true, message: '请选择健康服务包类型', trigger: 'change' }
        ],
        package: [
          { required: true, message: '请选择健康服务包名称', trigger: 'change' }
        ]
      },
      saveBasicAndReviewBtn: {
        isLoading: false,
        btnText: '保存',
        isDisabled: false
      },
      detail: {},
      servicePackList: [], // 服务包列表
      servicePackTypeList: [], // 服务包类型列表
      signing: {
        name: '',
        idNumber: '',
        serviceAgencies: '暂无',
        packagePrice: '暂无',
        packageDescription: '暂无'
      }
    }
  },
  created() {
    if (this.id) {
      this.getDetail()
    }
    // this.getServicePackList()
    this.getServicePackTypeList()
  },
  methods: {
    returnToPage: function() {
      this.$router.push({
        path: '/orderManage/physicalOrder/physicalOrderList'
      })
    },
    // 选择服务包
    selectServicePack(id) {
      if (!id) {
        this.signing.serviceAgencies = '暂无'
        this.signing.packagePrice = '暂无'
        this.signing.packageDescription = '暂无'
      }
      this.servicePackList.forEach(item => {
        if (item._id === id) {
          this.signing.serviceAgencies = item.service_agencies.enterprise_name
          this.signing.packagePrice = item.package_price
          this.signing.packageDescription = item.package_description
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
        let apiName = 'addSigning'
        this.$refs[formName].validate(valid => {
          if (valid) {
            /* 如果id存在则为编辑 */
            btnObject = {
              btnText: '正在提交',
              isDisabled: true,
              isLoading: true
            }
            this.$$http(apiName, postData)
              .then(results => {
                if (
                  results.data &&
                  results.data.code === 0 &&
                  results.data.content
                ) {
                  this.$message.success('签约服务包成功')
                  this.$router.push({
                    path: `/customerManage/customerList/customerList`
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
    getServicePackList(query) {
      if (query) {
        let postData = {
          need_all: true,
          enterprise: this.enterpriseId,
          package_type: query
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
      } else {
        this.servicePackList = []
      }
    },
    getDetail: function() {
      this.$$http('consumersDetail', { id: this.id }).then(results => {
        if (results.data && results.data.code === 0) {
          this.detail = results.data.content
          this.signing.name = this.detail.nick_name
          this.signing.idNumber = this.detail.identity_card
          this.editMsgForm.user = this.detail.user
        }
      })
    },
    editBasics(btn, btnType) {
      let formName = 'addFormSetpOne'
      let btnObject = btn
      let keyArray = ['user', 'package']
      let postData = this.pbFunc.fifterbyArr(this.editMsgForm, keyArray)
      this.editAjax(postData, formName, btnObject, null, true)
    },
    // 服务包类型筛选列表
    getServicePackTypeList() {
      this.$$http('servicePackTypeList', {}).then(results => {
        if (results.data && results.data.code === 0) {
          this.servicePackTypeList = results.data.content
        }
      })
    }
  }
}
</script>
