<style scoped>
.types-list {
  line-height: 40px;
}
.tms-dialog-content {
  padding: 0 25%;
}
</style>

<template>
  <div>
    <el-dialog
      title="新增类型"
      :visible="isShow"
      width="500px"
      center
      :before-close="closeBtn"
      :close-on-click-modal="false"
    >
      <div class="tms-dialog-form">
        <div class="tms-dialog-content">
          <el-radio-group v-model="types">
            <div v-for="(item) in servicePackType" :key="item._id" class="types-list">
              <el-radio
                :label="item"
                :disabled="item.type_key==='trilateral'?true:false"
              >{{item.type_name}}</el-radio>
            </div>
          </el-radio-group>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeBtn">取消</el-button>
        <el-button type="primary" @click="goPage">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'addServicePackDialog',
  props: {
    isShow: {
      type: Boolean,
      required: true
    },
    servicePackType: Array
  },

  data: function() {
    return {
      types: ''
    }
  },
  computed: {},
  methods: {
    closeBtn: function() {
      this.$emit('closeDialogBtn', false)
    },
    goPage() {
      console.log('types', this.types)
      this.closeBtn()
      window.open(
        `/#/servicePackageManage/healthServicePackage/servicePackEdit/${
          this.types.type_key
        }/${this.types._id}`,
        '_blank'
      )
    }
  },
  watch: {
    isShow(curVal, oldVal) {
      if (curVal) {
        this.types = ''
      }
    }
  }
}
</script>
<style scoped lang="less">
</style>
