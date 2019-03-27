<style scoped>
.list {
  line-height: 40px;
}
.tms-dialog-content {
  padding: 0 25%;
}
</style>

<template>
  <div>
    <el-dialog
      title="健康管理阶段更改"
      :visible="dialogType"
      width="500px"
      center
      :before-close="closeBtn"
      :close-on-click-modal="false"
    >
      <div class="tms-dialog-form">
        <div class="tms-dialog-content">
          <el-checkbox-group v-model="list">
            <div v-for="(item,index) in stateList" :key="index" class="list">
              <el-checkbox :label="item.operation">{{item.operation_name}}</el-checkbox>
            </div>
          </el-checkbox-group>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeBtn">取消</el-button>
        <el-button
          type="primary"
          @click="subBtn"
          :loading="submitBtn.isLoading"
          :disabled="submitBtn.isDisabled"
        >{{submitBtn.btnText}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'changePhaseDialog',
  props: {
    dialogType: {
      type: Boolean,
      required: true
    },
    row: Object,
    closeDialogBtn: Function
  },

  data: function() {
    return {
      list: [],
      submitBtn: {
        btnText: '确 定',
        isDisabled: false,
        isLoading: false
      },
      stateList: []
    }
  },
  computed: {},
  methods: {
    closeBtn: function() {
      this.$emit('closeDialogBtn', false)
    },
    subBtn() {
      // if (this.list.length) {
      console.log('list', this.list)
      this.stateList.forEach(item => {
        item.operation_status = false
        this.list.forEach(operation => {
          if (item.operation === operation) {
            item.operation_status = true
          }
        })
      })
      this.submitBtn = {
        btnText: '提交中',
        isDisabled: true,
        isLoading: true
      }
      let postData = {
        id: this.row._id,
        state_list: this.stateList
      }
      this.$$http('updateOrder', postData)
        .then(results => {
          this.submitBtn = {
            btnText: '确 定',
            isDisabled: false,
            isLoading: false
          }
          if (results.data && results.data.code === 0) {
            this.$message({
              type: 'success',
              message: '更改成功'
            })
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
          this.$message.error('更改失败')
        })
    }
  },
  watch: {
    dialogType(curVal, oldVal) {
      if (curVal) {
        this.list = []
        this.stateList = this.pbFunc.deepcopy(this.row.state_list)
        this.stateList.forEach(item => {
          if (item.operation_status) {
            this.list.push(item.operation)
          }
        })
      }
    }
  }
}
</script>
<style scoped lang="less">
</style>
