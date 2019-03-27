<style scoped lang="less">
/deep/ .code {
  input {
    border-color: #dcdfe6 !important;
  }
  i {
    display: none;
  }
}
.detail-main .detail-btn .el-button {
  width: auto;
  font-size: 12px;
}
.price-list {
  margin-bottom: 20px;
}
</style>
<template>
  <div class="nav-tab">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="设置结算价" name="edit">
        <div id="addPerson" class="detail-main border-top-clear">
          <el-container v-loading="pageLoading">
            <el-header>
              <el-row>
                <el-col :span="2" class="left-arrow-d">
                  <div class="go-return icon-back" @click="returnToPage"></div>
                  <!-- <span @click="returnToPage"><i class="icon-down-arrow"></i><span class="fs-13">返回{{returnPage}}</span></span> -->
                </el-col>
                <el-col :span="20">
                  <p>{{title}}</p>
                </el-col>
              </el-row>
            </el-header>
            <el-main v-show="!pageLoading" class="mt-30">
              <!-- <transition name="el-fade-in-linear"> -->
              <el-form
                label-width="120px"
                ref="addFormSetpOne"
                :rules="rules"
                :model="editMsgForm"
                status-icon
              >
                <div v-for="(item,index) in editMsgForm.prices" :key="item.key" class="price-list">
                  <div class="detail-form-title text-center">
                    <el-row>
                      <el-col :span="12" :offset="6">价格{{index+1}}</el-col>
                      <el-col :span="6" class="text-right">
                        <el-button
                          type="success"
                          size="mini"
                          @click="editPrice('add')"
                          v-if="!index"
                        >新增价格</el-button>
                      </el-col>
                    </el-row>
                  </div>
                  <el-row :gutter="40" class="addheaduserform detail-form">
                    <el-col :span="10">
                      <el-form-item
                        label="价格:"
                        :prop="'prices.' + index + '.settlement_price'"
                        :rules="[
                             { required: true, message: '请输入价格', trigger: 'blur' },
                             { pattern:$store.state.common.regular.price.match, message: $store.state.common.regular.price.tips, trigger: 'blur' }
                          ]"
                      >
                        <el-input
                          placeholder="请输入"
                          type="text"
                          v-model.trim="item.settlement_price"
                          v-if="item.isEdit"
                        ></el-input>

                        <div v-else>{{item.settlement_price}}</div>
                      </el-form-item>
                    </el-col>
                    <el-col :span="10" :offset="2">
                      <el-form-item
                        label="适用医院:"
                        :prop="'prices.' + index + '.partners'"
                        :rules="[
                             { required: true, message: '请选择适用医院', trigger: 'change' },
                          ]"
                      >
                        <el-select
                          v-model="item.partners"
                          clearable
                          multiple
                          filterable
                          placeholder="请输入选择"
                          v-if="item.isEdit"
                        >
                          <el-option
                            v-for="(hospital) in hospitalList"
                            :key="hospital._id"
                            :label="hospital.enterprise_name"
                            :value="hospital._id"
                          ></el-option>
                        </el-select>
                        <div v-else>
                          <span
                            v-for="(partner,key) in item.partnersInfo"
                            :key="key"
                          >{{partner.enterprise_name}}，</span>
                        </div>
                      </el-form-item>
                    </el-col>
                  </el-row>

                  <div class="detail-btn">
                    <el-row>
                      <el-col :span="10" :offset="14" class="text-right">
                        <div v-if="item.isEdit">
                          <el-button type="info" size="mini" @click="cancelEdit(item)">取消</el-button>
                          <el-button
                            type="primary"
                            size="mini"
                            @click="sureBtn(item)"
                            :loading="saveBasicBtn.isLoading"
                            :disabled="saveBasicBtn.isDisabled"
                          >{{saveBasicBtn.btnText}}</el-button>
                        </div>
                        <div v-else>
                          <el-button type="danger" size="mini" @click="deletePrice(item)">删除</el-button>
                          <el-button type="primary" size="mini" @click="editPrice('update',item)">编辑</el-button>
                        </div>
                      </el-col>
                    </el-row>
                  </div>
                </div>
              </el-form>
              <!-- </transition> -->
            </el-main>
          </el-container>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
export default {
  name: 'ratingEdit',
  computed: {
    // titleType: function() {
    //   return this.$route.query.id ? "编辑合作方" : "新增合作方";
    // },

    id: function() {
      return this.$route.params.id || ''
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
      activeName: 'edit',
      title: '',
      partnerTypeList: '', // 合作方类型
      editMsgForm: {
        prices: []
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
      saveBasicBtn: {
        isLoading: false,
        btnText: '保存',
        isDisabled: false
      },
      // nextStepBtn: {
      //   isLoading: false,
      //   btnText: '保存并下一步',
      //   isDisabled: false,
      // },
      detail: [
        {
          settlement_price: '',
          partners: [],
          isEdit: true
        }
      ],
      btnNew: {},
      hospitalList: [], // 医院列表
      copyPrice: {}
    }
  },
  created() {
    if (this.id) {
      this.getDetail()
      this.getHospitalList()
    }
  },
  methods: {
    handleClick() {},
    // 删除结算价格
    deletePrice(row) {
      this.$msgbox({
        title: '删除结算价',
        message:
          '请确认需要删除该价格，删除后不可找回，该操作不影响已新建的订单。',
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        showCancelButton: true,
        type: 'warning',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true
            instance.confirmButtonText = '提交中...'
            let postData = {
              sub_project: row.id
            }
            this.$$http('deleteProjectPrice', postData).then(results => {
              instance.confirmButtonLoading = false
              instance.confirmButtonText = '确定'
              if (results.data && results.data.code === 0) {
                this.$message({
                  type: 'success',
                  message: '删除成功'
                })
                this.getDetail()
                done()
              } else {
                done()
                let setMeal = ''
                results.data.data.forEach((item, index) => {
                  setMeal += item.enterprise_name + '、'
                })
                this.$alert(
                  '无法删除，当前价格有以下套餐正在使用，请配置后重新操作删除!' +
                    '<div>' +
                    setMeal +
                    '</div>',
                  '删除结算价',
                  {
                    confirmButtonText: '确定',
                    dangerouslyUseHTMLString: true
                  }
                )
              }
            })
          } else {
            done()
            this.$message({
              type: 'info',
              message: '已取消删除'
            })
          }
        }
      }).then(() => {})
    },
    // 取消编辑
    cancelEdit(row, index) {
      if (row.id) {
        this.editMsgForm.prices.forEach((item, i) => {
          if (item.id === row.id) {
            this.$set(this.editMsgForm.prices, i, {
              id: this.copyPrice.id,
              settlement_price: this.copyPrice.settlement_price,
              partners: this.copyPrice.partners,
              partnersInfo: this.copyPrice.partnersInfo,
              isEdit: false
            })
          }
        })
        console.log('price', this.editMsgForm.prices)
      } else {
        this.editMsgForm.prices.splice(
          this.editMsgForm.prices.findIndex((item, i) => i === index)
        )
      }
    },
    // 新增、编辑价格
    editPrice(type, row) {
      // let isAdd = 'add'
      this.editMsgForm.prices.forEach(item => {
        if (item.isEdit) {
          this.$message({
            type: 'warning',
            message: '请先保存编辑的价格！'
          })
          type = ''
        }
      })

      if (type === 'add') {
        this.editMsgForm.prices.push({
          id: '',
          settlement_price: '',
          partners: [],
          partnersInfo: [],
          isEdit: true
        })
      } else if (type === 'update') {
        this.copyPrice = this.pbFunc.deepcopy(row)
        row.isEdit = true
      }
    },
    returnToPage: function() {
      this.$router.push({
        path:
          '/servicePackageManage/experienceProjectManage/experienceProjectList'
      })
    },
    // 医院列表
    getHospitalList() {
      let postData = {
        enterpriseId: this.enterpriseId
      }
      this.$$http('associatedPartnersList', postData).then(results => {
        if (results.data && results.data.code === 0) {
          this.hospitalList = results.data.content.instances
        }
      })
    },
    getDetail: function() {
      this.$$http('getProjectDetail', { id: this.id }).then(results => {
        if (results.data && results.data.code === 0) {
          this.title = results.data.content.project_name
          if (
            results.data.content &&
            results.data.content.related_info.length
          ) {
            this.detail = results.data.content.related_info
            results.data.content.related_info.forEach((item, index) => {
              this.editMsgForm.prices.push({
                id: item._id,
                settlement_price: item.settlement_price,
                partners: item.partners,
                partnersInfo: item.partners_info,
                isEdit: false
              })
            })
          } else {
            this.editMsgForm.prices.push({
              id: '',
              settlement_price: '',
              partners: '',
              isEdit: true
            })
          }
        }
      })
    },
    editAjax(postData, formName, btnObject, stepNum, isReview, row) {
      return new Promise((resolve, reject) => {
        let btnTextCopy = this.pbFunc.deepcopy(btnObject).btnText
        this.btnNew = {
          btnText: btnTextCopy,
          isDisabled: false,
          isLoading: false
        }
        let apiName = 'addProjectPrice'
        this.$refs[formName].validate(valid => {
          if (valid) {
            /* 如果id存在则为编辑 */
            if (row.id) {
              apiName = 'updateProjectPrice'
              postData.sub_project = this.id
              postData.instance_id = row.id
            } else {
              postData.id = this.id
            }

            btnObject = {
              btnText: '提交中',
              isDisabled: true,
              isLoading: true
            }
            this.$$http(apiName, postData)
              .then(results => {
                if (results.data && results.data.code === 0) {
                  // if (this.id) {
                  //   this.$router.push({
                  //     path: `/partnerManage/partner/partnerDetail/${this.id}/`
                  //   });
                  // }
                  resolve(results.data)
                } else {
                  reject(results.data)
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
    // 保存
    sureBtn(row) {
      if (!row._id) {
        this.updateSettlementPrice(row)
      } else {
        this.editBasics(this.saveBasicBtn, row)
      }
    },
    // 编辑结算价格
    updateSettlementPrice(row) {
      this.$refs['addFormSetpOne'].validate(valid => {
        if (valid) {
          this.$msgbox({
            title: '编辑结算价',
            message:
              '编辑结算价后，【套餐设置】的结算价描述会做相应改变；已下单成功的订单不受影响，新增订单会按照新的价格进行计算。',
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            showCancelButton: true,
            type: 'warning',
            beforeClose: (action, instance, done) => {
              if (action === 'confirm') {
                instance.confirmButtonLoading = true
                instance.confirmButtonText = '提交中...'
                let keyArray = ['settlement_price', 'partners']
                let price = row
                price.settlement_price = parseFloat(price.settlement_price)
                let postData = this.pbFunc.fifterbyArr(price, keyArray)
                this.editAjax(
                  postData,
                  'addFormSetpOne',
                  this.saveBasicBtn,
                  null,
                  true,
                  row
                ).then(results => {
                  instance.confirmButtonLoading = false
                  instance.confirmButtonText = '确定'
                  if (results && results.code === 0) {
                    done()
                    this.editMsgForm.prices = []
                    this.getDetail()
                    this.copyPrice = {}
                  }
                })
              } else {
                instance.confirmButtonLoading = false
                instance.confirmButtonText = '确定'
                done()
                this.$message({
                  type: 'info',
                  message: '已取消编辑'
                })
              }
            }
          }).then(action => {})
        }
      })
    },
    editBasics(btn, row) {
      let formName = 'addFormSetpOne'
      let btnObject = btn
      let keyArray = ['settlement_price', 'partners']
      let price = row
      price.settlement_price = parseFloat(price.settlement_price)
      let postData = this.pbFunc.fifterbyArr(price, keyArray)
      console.log('postData', postData)
      this.editAjax(postData, formName, btnObject, null, true, row)
    }
    // editBasics(btn, btnType) {
    //   let formName = "addFormSetpOne";
    //   let btnObject = btn;

    //   let keyArray = [
    //     "enterprise_name",
    //     "enterprise_type",
    //     "contact",
    //     "contact_phone",
    //     "position",
    //     "credit_code"
    //   ];
    //   this.editMsgForm.position = {
    //     address: this.editMsgForm.address
    //   };
    //   let postData = this.pbFunc.fifterbyArr(this.editMsgForm, keyArray);
    //   if (this.id) {
    //     this.editAjax(postData, formName, btnObject, null, true);
    //   } else {
    //     if (btnType === "out") {
    //       this.editAjax(postData, formName, btnObject, null, true);
    //     }
    //   }
    // }
  }
}
</script>
