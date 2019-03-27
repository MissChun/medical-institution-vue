<template>
  <div class="noData" v-bind:style="noDataInitObj.styles">
    <div class="align">
      <img :src="noDataInitObj.imgUrl">
    </div>
    <div class="align" style="margin-top:15px;">
      <span class="gray">暂时没有数据</span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'noData',
  data() {
    return {
      noDataInitObj: {
        imgUrl: require('../../assets/img/tms_no_data.png'),
        styles: {
          position: 'absolute',
          top: '44px',
          height: '440px',
          backgroundColor: 'white',
          width: '100%',
          textAlign: 'center',
          zIndex: 9
        }
      }
    }
  },
  props: ['noDataObj'],
  methods: {},
  beforeMount: function() {
    if (this.noDataObj) {
      Object.assign(this.noDataInitObj, this.noDataObj)
    }
  }
}
</script>
<style scoped lang="less">
.noData {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-content: center;
}

.align {
  display: flex;
  justify-content: center;
}

.gray {
  width: 98px;
  height: 22px;
  font-size: 16px;
  font-family: PingFangSC-Semibold;
  color: rgba(164, 174, 186, 1);
  line-height: 22px;
}
</style>
