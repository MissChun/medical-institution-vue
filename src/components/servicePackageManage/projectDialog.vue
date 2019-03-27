<template>
  <div>
    <el-dialog
      :title="title"
      :visible="projectDialog.isShow"
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
          :model="projectRules"
          status-icon
          ref="projectRules"
        >
          <el-form-item label="小项名称：" prop="project_name">
            <el-input
              :autofocus="true"
              placeholder="请输入"
              v-model="projectRules.project_name"
              onkeyup="this.value=this.value.replace(/\s+/g,'')"
            ></el-input>
          </el-form-item>
          <el-form-item label="小项说明：" prop="project_description">
            <el-input
              :autofocus="true"
              placeholder="请输入"
              v-model="projectRules.project_description"
              type="textarea"
              :rows="5"
              onkeyup="this.value=this.value.replace(/\s+/g,'')"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeBtn">取 消</el-button>
        <el-button
          type="primary"
          @click="editproject('projectRules')"
          :loading="submitBtn.isLoading"
          :disabled="submitBtn.isDisabled"
        >{{submitBtn.btnText}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'projectDialog',
  props: {
    projectDialog: {
      type: Object,
      required: true
    },
    row: {
      type: Object,
      required: false
    },
    belongTo: {
      type: String,
      required: true
    },
    closeDialogBtn: Function
  },

  data: function() {
    return {
      type: 'project', // 弹窗类型
      projectRules: {
        project_name: '',
        project_description: ''
      },
      rules: {
        project_name: [
          { required: true, message: '请输入小项名称', trigger: 'blur' },
          { min: 1, max: 20, message: '小项名称字数为1~20字', trigger: 'blur' }
          // { pattern: /^[\u4E00-\u9FA5A-Za-z0-9]{2,20}$/gi, message: '企业名称为中文、英文，不能输入数字、标点符号', trigger: 'blur' },
        ],
        project_description: [
          { required: true, message: '请输入小项说明', trigger: 'blur' },
          { min: 1, max: 20, message: '小项名称字数为1~500字', trigger: 'blur' }
          // { pattern: /^[\u4E00-\u9FA5A-Za-z0-9]{2,20}$/gi, message: '企业名称为中文、英文，不能输入数字、标点符号', trigger: 'blur' },
        ]
      },
      submitBtn: {
        btnText: '确 定',
        isDisabled: false,
        isLoading: false
      },
      title: '新增小项'
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
    editproject: function(projectRules) {
      this.$refs[projectRules].validate(valid => {
        if (valid) {
          this.submitBtn = {
            btnText: '提交中',
            isDisabled: true,
            isLoading: true
          }
          let apiName = ''
          let postData = {
            project_level: 'second',
            project_name: this.projectRules.project_name,
            project_description: this.projectRules.project_description
          }
          if (this.projectDialog.type === 'add') {
            apiName = 'addCategory'
            postData.enterprise = this.enterpriseId
            postData.belong_to = this.belongTo
          } else if (this.projectDialog.type === 'update') {
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
                    this.projectDialog.type === 'add'
                      ? '新增小项成功！'
                      : '编辑小项成功！',
                  type: 'success'
                })
                this.$emit('closeDialogBtn', this.type, true)
              }
            })
            .catch(err => {
              console.log(err)
              this.submitBtn = {
                btnText: '确 定',
                isDisabled: false,
                isLoading: false
              }
              this.$message.error(
                this.projectDialog.type === 'add'
                  ? '新增小项失败'
                  : '编辑小项失败'
              )
            })
        } else {
          this.submitBtn.isDisabled = false
        }
      })
    }
  },
  watch: {
    projectDialog: {
      handler(val, oldVal) {
        if (val.isShow && val.type === 'update') {
          this.projectRules.project_name = this.row.project_name
          this.projectRules.project_description = this.row.project_description
          this.title = '编辑小项'
        } else {
          this.title = '新增小项'
          this.projectRules.project_name = ''
          this.projectRules.project_description = ''
        }
        if (this.$refs['projectRules']) {
          this.$refs['projectRules'].clearValidate()
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
