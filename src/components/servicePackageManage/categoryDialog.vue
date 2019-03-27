<template>
  <div>
    <el-dialog
      :title="title"
      :visible="categoryDialog.isShow"
      width="500px"
      center
      :before-close="closeBtn"
      :close-on-click-modal="false"
    >
      <div class="tms-dialog-form">
        <el-form
          class="tms-dialog-content"
          label-width="100px"
          :rules="rules"
          :model="categoryRules"
          status-icon
          ref="categoryRules"
        >
          <el-form-item label="类别名称：" prop="project_name">
            <el-input
              :autofocus="true"
              placeholder="请输入"
              v-model="categoryRules.project_name"
              onkeyup="this.value=this.value.replace(/\s+/g,'')"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeBtn">取 消</el-button>
        <el-button
          type="primary"
          @click="editcategory('categoryRules')"
          :loading="submitBtn.isLoading"
          :disabled="submitBtn.isDisabled"
        >{{submitBtn.btnText}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'categoryDialog',
  props: {
    categoryDialog: {
      type: Object,
      required: true
    },
    row: {
      type: Object,
      required: false
    },
    closeDialogBtn: Function
  },

  data: function() {
    return {
      type: 'category', // 弹窗类型
      categoryRules: {
        project_name: ''
      },
      rules: {
        project_name: [
          { required: true, message: '请输入类别名称', trigger: 'blur' },
          { min: 1, max: 20, message: '类别名称字数为1~20字', trigger: 'blur' }
          // { pattern: /^[\u4E00-\u9FA5A-Za-z0-9]{2,20}$/gi, message: '企业名称为中文、英文，不能输入数字、标点符号', trigger: 'blur' },
        ]
      },
      submitBtn: {
        btnText: '确 定',
        isDisabled: false,
        isLoading: false
      },
      title: '新增部门'
    }
  },
  computed: {
    enterpriseId() {
      let users = this.pbFunc.getLocalData('users', true)
      return users.enterprise._id
    }
  },
  methods: {
    closeBtn: function() {
      this.$emit('closeDialogBtn', this.type)
    },
    editcategory: function(categoryRules) {
      this.$refs[categoryRules].validate(valid => {
        if (valid) {
          this.submitBtn = {
            btnText: '提交中',
            isDisabled: true,
            isLoading: true
          }
          let apiName = ''
          let postData = {
            project_level: 'first',
            project_name: this.categoryRules.project_name
          }
          if (this.categoryDialog.type === 'add') {
            apiName = 'addCategory'
            postData.enterprise = this.enterpriseId
          } else if (this.categoryDialog.type === 'update') {
            apiName = 'updateCategory'
            postData.id = this.row._id
          }

          this.$$http(apiName, postData)
            .then(results => {
              this.submitBtn = {
                btnText: '确 定',
                isDisabled: false,
                isLoading: false
              }
              // this.pageLoading = false;
              if (results.data && results.data.code === 0) {
                this.$message({
                  message:
                    this.categoryDialog.type === 'add'
                      ? '新增类别成功！请在该类别下添加小项'
                      : '编辑类别成功！',
                  type: 'success'
                })
                this.$emit('closeDialogBtn', this.type, true)
              }
            })
            // eslint-disable-next-line
            .catch(err => {
              this.submitBtn = {
                btnText: '确 定',
                isDisabled: false,
                isLoading: false
              }
              this.$message.error(
                this.categoryDialog.type === 'add'
                  ? '新增类别失败'
                  : '编辑类别失败'
              )
            })
        } else {
          this.submitBtn.isDisabled = false
        }
      })
    }
  },
  watch: {
    categoryDialog: {
      handler(val, oldVal) {
        if (val.isShow && val.type === 'update') {
          this.categoryRules.project_name = this.row.project_name
          this.title = '编辑类别'
        } else {
          this.title = '新增类别'
          this.categoryRules.project_name = ''
        }
        if (this.$refs['categoryRules']) {
          this.$refs['categoryRules'].clearValidate()
        }
      },
      deep: true
    }
  },
  created: function() {}
}
</script>
<style scoped lang="less">
</style>
