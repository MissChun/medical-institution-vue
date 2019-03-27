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
          <div v-if="activeStep==0">
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
                  <el-form-item label="合作方名称:" prop="enterprise_name">
                    <el-input
                      placeholder="请输入"
                      type="text"
                      v-model.trim="editMsgForm.enterprise_name"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="合作方类型:" prop="enterprise_type">
                    <el-select
                      v-model="editMsgForm.enterprise_type"
                      remote
                      clearable
                      placeholder="请选择"
                    >
                      <el-option
                        v-for="(item) in partnerTypeList"
                        :key="item._id"
                        :label="item.type_name"
                        :value="item._id"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="机构三合一信用码:" label-width="140px" prop="credit_code">
                    <el-input placeholder="请输入" type="text" v-model.trim="editMsgForm.credit_code"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="合作方联系人:" prop="contact">
                    <el-input placeholder="请输入" type="text" v-model.trim="editMsgForm.contact"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="合作方联系电话:" label-width="130px" prop="contact_phone">
                    <el-input
                      placeholder="请输入"
                      type="text"
                      v-model.trim="editMsgForm.contact_phone"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="合作方地址:">
                    <el-input placeholder="请输入" type="text" v-model.trim="editMsgForm.address"></el-input>
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
  name: 'ratingEdit',
  computed: {
    titleType: function() {
      return this.$route.query.id ? '编辑合作方' : '新增合作方'
    },
    activeStep: function() {
      return this.$route.query.activeStep || 0
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
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() > Date.now() - 8.64e6
        }
      },
      addType: '默认新增',
      partnerTypeList: '', // 合作方类型
      editMsgForm: {
        // enterprise_name: "91",
        // enterprise_type: "",
        // contact: "离",
        // contact_phone: "17313126861",
        // credit_code: "26353637363736376F",
        // address: "四川省成都市"
        enterprise_name: '',
        enterprise_type: '',
        contact: '',
        contact_phone: '',
        credit_code: '',
        address: ''
      },
      selectData: {
        partnerType: [
          { id: 'license_code', value: '医疗机构' },
          { id: 'organization_code', value: '第三方服务机构' }
        ]
      },
      rules: {
        enterprise_name: [
          { required: true, message: '请输入合作方名称', trigger: 'blur' },
          { min: 1, max: 20, message: '名称由1~20个字符组成', trigger: 'blur' }
        ],
        enterprise_type: [
          { required: true, message: '请选择合作方类型', trigger: 'change' }
        ],
        contact: [
          { required: true, message: '请输入合作联系人', trigger: 'blur' },
          { min: 1, max: 5, message: '联系人由1~5个字符组成', trigger: 'blur' }
        ],
        contact_phone: [
          { required: true, message: '请输入合作联系电话', trigger: 'blur' },
          {
            pattern: this.$store.state.common.regular.contactPhone.match,
            message: this.$store.state.common.regular.contactPhone.tips,
            trigger: 'blur'
          }
        ],
        credit_code: [
          {
            required: true,
            message: '请输入机构三合一信用码',
            trigger: 'blur'
          },
          {
            pattern: this.$store.state.common.regular.creditCode.match,
            message: this.$store.state.common.regular.creditCode.tips,
            trigger: 'blur'
          }
        ],
        address: [
          { required: true, message: '请输入合作方地址', trigger: 'blur' }
        ]
      },
      saveBasicAndReviewBtn: {
        isLoading: false,
        btnText: '保存并退出',
        isDisabled: false
      },
      // nextStepBtn: {
      //   isLoading: false,
      //   btnText: '保存并下一步',
      //   isDisabled: false,
      // },
      detail: {},
      btnNew: {}
    }
  },
  created() {
    if (this.id) {
      this.getDetail()
    }
    this.getPartnerTypeList()
  },
  methods: {
    returnToPage: function() {
      if (this.$route.query.id) {
        this.$router.push({
          path: `/basicDataManage/supplierManage/carrierManage/carrierDetail/${
            this.$route.query.id
          }/`
        })
      } else {
        this.$router.push({
          path:
            '/basicDataManage/supplierManage/carrierManage/carrierManagelist'
        })
      }
    },
    getPartnerTypeList() {
      this.$$http('partnerTypeList', {}).then(results => {
        if (results.data && results.data.code === 0) {
          this.partnerTypeList = results.data.content
        }
      })
    },
    getDetail: function() {
      this.$$http('associatedPartnersDetail', { id: this.id }).then(results => {
        if (results.data && results.data.code === 0) {
          this.detail = results.data.content
          this.editMsgForm = {
            enterprise_name: this.detail.enterprise_name,
            enterprise_type: this.detail.enterprise_type._id,
            contact: this.detail.contact,
            contact_phone: this.detail.contact_phone,
            credit_code: this.detail.credit_code,
            address: this.detail.position.address
          }
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
        let apiName = 'addPartner'
        this.$refs[formName].validate(valid => {
          if (valid) {
            /* 如果id存在则为编辑 */
            if (this.id) {
              postData.id = this.id
              apiName = 'updatePartner'
            }

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
                  if (this.id) {
                    this.$router.push({
                      path: `/partnerManage/partner/partnerDetail/${this.id}/`
                    })
                  }
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
    associatedPartners(btn, id) {
      let postData = {
        partner: id,
        enterpriseId: this.enterpriseId
      }
      this.$$http('associatedPartners', postData)
        .then(results => {
          this.btnObject = btn
          console.log(results)
          if (results.data && results.data.code === 0) {
            this.$message({
              message: '提交成功',
              type: 'success'
            })
            this.$router.push({
              path: '/partnerManage/partner/partnerList'
            })
          }
        })
        // eslint-disable-next-line
        .catch(err => {
          this.btnObject = btn
        })
    },
    editBasics(btn, btnType) {
      let formName = 'addFormSetpOne'
      let btnObject = btn

      let keyArray = [
        'enterprise_name',
        'enterprise_type',
        'contact',
        'contact_phone',
        'position',
        'credit_code'
      ]
      this.editMsgForm.position = {
        address: this.editMsgForm.address
      }
      let postData = this.pbFunc.fifterbyArr(this.editMsgForm, keyArray)
      if (this.id) {
        this.editAjax(postData, formName, btnObject, null, true)
      } else {
        if (btnType === 'out') {
          this.editAjax(postData, formName, btnObject, null, true).then(
            results => {
              this.associatedPartners(this.btnObject, results._id)
            }
          )
        }
      }
    }
  }
}
</script>
