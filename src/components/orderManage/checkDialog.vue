<style>
</style>

<template>
  <div>
    <el-dialog
      title="校验体检订单"
      :visible="dialogType.isShow"
      width="500px"
      center
      :before-close="closeBtn"
      :close-on-click-modal="false"
    >
      <div class="tms-dialog-form">
        <div class="tms-dialog-content">
          <el-form
            class="tms-dialog-content"
            label-width="100px"
            :rules="rules"
            :model="dialogRules"
            status-icon
            ref="dialogRules"
          >
            <el-form-item label="校验码：" prop="check_code">
              <el-input placeholder="请输入" type="text" v-model.trim="dialogRules.check_code"></el-input>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeBtn">取消</el-button>
        <el-button
          type="primary"
          @click="submitSure"
          :loading="submitBtn.isLoading"
          :disabled="submitBtn.isDisabled"
        >{{submitBtn.btnText}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'appointmentTimeDialog',
  props: {
    dialogType: {
      type: Object,
      required: true
    },
    row: {
      type: Object,
      required: true
    }
  },

  data: function() {
    return {
      types: '',
      dialogRules: {
        check_code: '',
        order: '',
        identity_card: ''
      },
      rules: {
        check_code: [
          { required: true, message: '请输入校验码', trigger: 'blur' },
          {
            min: 6,
            max: 6,
            message: '校验码长度为6位',
            trigger: 'blur'
          }
          // {
          //   pattern: /(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^.{6}$/,
          //   message:
          //     '校验码长度6位，支持数字、大小写字母、下划线,至少包含2种',
          //   trigger: 'blur'
          // },
        ]
      },
      submitBtn: {
        btnText: '确 定',
        isDisabled: false,
        isLoading: false
      }
    }
  },
  computed: {},
  methods: {
    closeBtn: function() {
      this.$emit('closeDialogBtn', false)
    },
    submitSure() {
      this.$refs['dialogRules'].validate(valid => {
        if (valid) {
          this.submitBtn = {
            btnText: '提交中',
            isDisabled: true,
            isLoading: true
          }

          // let postData = {
          //   id: this.row._id,
          //   appointment_time: this.dialogRules.appointment_time
          // }
          this.$$http('orderCheck', this.dialogRules)
            .then(results => {
              this.submitBtn = {
                btnText: '确 定',
                isDisabled: false,
                isLoading: false
              }
              if (results.data && results.data.code === 0) {
                this.$message.success('校验成功！')
                this.$emit('closeDialogBtn', true, true)
              }
            })
            // eslint-disable-next-line
            .catch(err => {
              this.submitBtn = {
                btnText: '确 定',
                isDisabled: false,
                isLoading: false
              }
              this.$message.error('校验失败！')
            })
        } else {
          this.submitBtn.isDisabled = false
        }
      })
    }
  },
  watch: {
    dialogType: {
      handler(val, oldVal) {
        if (val.isShow) {
          this.dialogRules = {
            check_code: '',
            order: this.row._id,
            identity_card: this.row.profile.identity_card
          }
        } else {
          this.dialogRules = {
            check_code: '',
            order: '',
            identity_card: ''
          }
        }
        if (this.$refs['dialogRules']) {
          this.$refs['dialogRules'].clearValidate()
        }
      },
      deep: true
    }
  }
}
</script>
<style scoped lang="less">
</style>
