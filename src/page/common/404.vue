<style type="text/css" scoped lang="less">
@import '../../assets/css/error.less';
</style>
<template>
  <div class="error">
    <!-- <public-header :is-find="true"></public-header> -->
    <common-header :type="'error'"></common-header>
    <div class="error-content">
      <div class="error-left">
        <div class="font">404</div>
        <div class="prompt">Oops!!您访问的页面找不到了！</div>
        <div>
          <el-button @click.native="$router.go(-1)" type="primary">返回上一步</el-button>
          <el-button @click.native="$router.push({ path: '/' })" type="success">返回首页</el-button>
        </div>
      </div>
      <div class="error-right">
        <img src="@/assets/img/error.png" alt>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
// import publicHeader from '@/components/publicHeader'
import commonHeader from '@/components/common/commonHeader'
export default {
  components: {
    commonHeader: commonHeader
  },
  data: function() {
    return {}
  },
  computed: {},
  methods: {
    go: function() {
      this.$emit('agree')
    }
  }
}
</script>
