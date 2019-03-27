<style>
</style>

<template>
  <div>
    <el-dialog
      title="体检预约时间"
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
            <el-form-item label="时间选择：" prop="appointment_time">
              <el-date-picker
                v-model="dialogRules.appointment_time"
                type="datetime"
                value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="选择日期时间"
              ></el-date-picker>
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
        appointment_time: ''
      },
      rules: {
        appointment_time: [
          { required: true, message: '请选择时间', trigger: 'blur' }
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

          let postData = {
            id: this.row._id,
            appointment_time: this.dialogRules.appointment_time
          }
          this.$$http('updateOrder', postData)
            .then(results => {
              this.submitBtn = {
                btnText: '确 定',
                isDisabled: false,
                isLoading: false
              }
              if (results.data && results.data.code === 0) {
                this.$message.success('编辑成功！')
                this.$emit('closeDialogBtn', true)
              }
            })
            // eslint-disable-next-line
            .catch(err => {
              this.submitBtn = {
                btnText: '确 定',
                isDisabled: false,
                isLoading: false
              }
              this.$message.error('编辑失败！')
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
        if (val.isShow && val.type === 'update') {
          this.dialogRules.appointment_time = this.row.appointment_time
        } else {
          this.dialogRules.appointment_time = ''
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
