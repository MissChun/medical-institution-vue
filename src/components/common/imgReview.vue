<!-- 图片预览组件-->
<!--
  prop:
    imgObject:object,必需
    初始化：
    imgObject{
      imgList: [],//图片url列表,必需。
      showPreview: false,//是否展示预览，默认false,必需
      previewIndex: 0,//默认展示图片的index,可选
    }
  ex:
    <img-review :imgObject.sync='imgObject'></img-review>
-->
<template>
  <div class="review-background" v-if="imgObject.showPreview">
    <div class="img-review-out-box" v-on:click.self="closePreview()">
      <div class="clearfix img-review-box">
        <slot></slot>
        <div class="img-review-in-box">
          <ul>
            <li v-for="(item , key) in imgList" :key="key">
              <div v-show="previewIndex == key">
                <img :src="item.src" v-bind:style="imgStyle">
              </div>
            </li>
          </ul>
        </div>
        <div class="preview-operator-btn">
          <a href="javascript:void(0)" v-on:click="previousImg" v-show="imgList.length > 1">上一张</a>
          <a href="javascript:void(0)" v-on:click="nextImg" v-show="imgList.length > 1">下一张</a>
          <a href="javascript:void(0)" v-on:click="zoomBig" v-show="imgList.length">放大</a>
          <a href="javascript:void(0)" v-on:click="zoomSmall" v-show="imgList.length">缩小</a>
          <a href="javascript:void(0)" v-on:click="rotateImg()">旋转</a>
          <a href="javascript:void(0)" v-on:click="closePreview()">关闭</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'imgReview',
  computed: {
    imgStyle: function() {
      let imgStyle = ''
      imgStyle = `transform:rotate(${this.rotateDeg}deg)  scale(${
        this.zoomNum
      });
        -ms-transform: rotate(${this.rotateDeg}deg)  scale(${this.zoomNum});
        -moz-transform: rotate(${this.rotateDeg}deg)  scale(${this.zoomNum});
        -webkit-transform: rotate(${this.rotateDeg}deg)  scale(${this.zoomNum});
        -o-transform: rotate(${this.rotateDeg}deg)  scale(${this.zoomNum});`
      return imgStyle
    }
  },
  data() {
    return {
      previewIndex: 0,
      imgList: [],
      zoomNum: 1.8,
      rotateDeg: 0
    }
  },
  methods: {
    nextImg() {
      if (this.previewIndex < this.imgList.length - 1) {
        this.previewIndex++
      } else {
        this.previewIndex = 0
      }
    },
    previousImg() {
      if (this.previewIndex === 0) {
        this.previewIndex = this.imgList.length - 1
      } else {
        this.previewIndex--
      }
    },
    rotateImg() {
      this.rotateDeg += 90
    },
    zoomBig() {
      if (this.zoomNum < 1.8) {
        this.zoomNum += 0.2
      }
    },
    zoomSmall() {
      if (this.zoomNum > 0.4) {
        this.zoomNum -= 0.2
      }
    },
    closePreview() {
      this.zoomNum = 1.8
      this.rotateDeg = 0
      this.imgObject.showPreview = false
    },
    dealImg() {
      let imgListArray = []
      if (
        this.imgObject &&
        this.imgObject.imgList &&
        this.imgObject.imgList.length
      ) {
        for (let i in this.imgObject.imgList) {
          imgListArray[i] = {}
          if (this.imgObject.imgList[i].src) {
            imgListArray[i] = {}
            imgListArray[i].src = this.imgObject.imgList[i].src
          }
        }
      }
      return imgListArray
    }
  },
  created() {
    this.imgList = this.dealImg()
  },
  props: {
    imgObject: Object
  },
  watch: {
    imgObject: {
      handler: function(val, oldVal) {
        let imgListArray = []
        if (val.imgList.length) {
          for (let i in val.imgList) {
            imgListArray[i] = {}
            if (val.imgList[i]) {
              imgListArray[i] = {}
              imgListArray[i].src = val.imgList[i]
            }
          }
        }
        this.imgList = imgListArray
        this.previewIndex = val.previewIndex || 0
      },
      deep: true
    }
  }
}
</script>
<style scoped lang="less">
.review-background {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: auto;
  margin: 0;
  z-index: 2001;
  background-color: rgba(0, 0, 0, 0.6);
  color: #fff;
}

.img-review-out-box {
  width: 100%;
  height: 100%;
  display: table;
}

.img-review-box {
  display: table-cell;
  vertical-align: middle;
  min-height: 100px;
  max-height: 500px;
  min-width: 100px;
  max-width: 800px;
  .img-review-in-box {
    min-height: 100px;
    max-height: 500px;
    min-width: 100px;
    max-width: 800px;
    margin: 0 auto;
    position: relative;
  }

  ul {
    padding: 0;
    margin: 0;
    li {
      text-align: center;
      list-style: none;
      img {
        max-width: 500px;
        max-height: 500px;
      }
    }
  }
  .preview-operator-btn {
    position: fixed;
    bottom: 50px;
    left: 50%;
    margin-left: -155px;
    text-align: center;

    height: 24px;
    width: 310px;

    font-size: 16px;
    color: #fff;

    a {
      margin-left: 10px;
      line-height: 24px;
      color: #fff;
      &:first-child {
        margin-left: 0px;
      }
    }
  }
}
</style>
