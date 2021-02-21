<!-- 拖拽，缩放图片 -->
<template>
  <div class="drag-resize-box" ref="dragResizeBox" v-finger:pinch="handlePinch" v-finger:touch-start='handleLongStart' v-finger:touch-end='handleLongEnd' v-finger:touch-move='handleTouchMove' v-finger:long-tap.stop.prevent='handleLongTap' v-finger:touch-cancel='handleTouchCancel'>
    <!-- <p>缩放比例{{imgSrc}}</p> -->
    <div class="img-box-c" ref="dragImgBox">
      <div class="cover-img" :style="{width:(imgWidth)*zoom+'px',height:(imgHeight)*zoom+'px',transform:`translate(${translateX*zoom}px,${translateY*zoom}px`}"></div>
      <div ref="handleImg" class="img-father" slot="drag-resize-main" draggable='showLayer' :style="{width:(imgWidth)*zoom+'px',height:(imgHeight)*zoom+'px',transform:`translate(${translateX*zoom}px,${translateY*zoom}px`}">
        <img :src="imgSrc" crossOrigin='anonymous' alt="" ref="carImg" @load='imgOnLoad' @error='imgOnError' style="width:100%;height:100%;" />
      </div>
    </div>
    <div class="drag-layer" :class="{'show':showLayer,'current':currentTarget}"></div>
    <div class="loading" v-if="showLoading">图片加载中...</div>
  </div>
</template>

<script>
import { dataURL2ObjUrl } from 'utils/utils'
export default {
  props: {
    imgSrc: {
      type: String,
      default: ''
    },
    showLayer: {
      type: Boolean,
      default: false
    },
    currentTarget: {
      type: Boolean,
      default: false
    },
    reloadImg: {
      type: Boolean,
      default: false
    },
    currentTemp: {
      tyep: String
    }
  },
  computed: {
    httpsToHttp() {
      return (url) => {
        return url.replace('https:', 'http:')
      }
    },
    baseImgUnshiftStr() {
      return (str) => {
        let unStr = 'data:image/png;base64,'
        let flag = str.includes(unStr) || str.includes('http:') || str.includes('https:')
        return flag ? str : unStr + str
      }
    }
  },
  data() {
    return {
      txt: '',
      zoom: 1,
      defaultWidth: 0,
      defaultHeight: 0,
      imgWidth: 0,
      imgHeight: 0,
      translateX: 0,
      translateY: 0,
      angle: 0,
      json: '',
      showLoading: true
    }
  },
  mounted() {

  },
  methods: {
    initData() {
      this.$nextTick(() => {
        let dragResizeBox = this.$refs['dragResizeBox'];
        let rect = dragResizeBox.getBoundingClientRect();
        let { x, y, width, height } = rect;
        // 容器大小
        this.defaultWidth = width;
        this.defaultHeight = height;
      })
    },
    // 获取缩放比例
    handlePinch(e) {
      if (this.showLayer) return
      this.zoom = e.zoom > 1 ? e.zoom : 1;
    },
    // 手指触摸开始
    handleLongStart(e) {

    },
    // 手指触摸结束
    handleLongEnd(e) {
      this.$emit('changeShowLayer', { bool: false })
      this.$emit('handleLongEnd', e)
    },
    // 手指触摸移动
    handleTouchMove(e) {
      if (this.showLayer) { // 改变图片顺序
        e.imgSrc = this.imgSrc
        this.$emit('handleTouchMove', e)
      } else { // 移动图片
        let translateX = this.translateX + parseInt(e.deltaX)
        let translateY = this.translateY + parseInt(e.deltaY)
        // let realMoveX = translateX + this.imgWidth;
        // let realMoveY = translateY + this.imgHeight;
        // translateX = realMoveX <= 0 ? -this.imgWidth : realMoveX >= this.dragBoxInfo.x1 - this.dragBoxInfo.x ? 0 : translateX;
        // translateY = realMoveY <= 0 ? -this.imgHeight : realMoveY >= this.dragBoxInfo.y1 - this.dragBoxInfo.y ? 0 : translateY;
        this.translateX = translateX;
        this.translateY = translateY;
      }
    },
    // 触摸取消
    handleTouchCancel() {
      this.$emit('changeShowLayer', { bool: false })
    },
    // 长按
    handleLongTap(e) {
      e.preventDefault && e.preventDefault()
      this.$emit('changeShowLayer', { bool: true })
      this.$emit('handleLongTap', {
        touch: e.touches[0],
        img: this.imgSrc
      })
    },
    imgOnLoad(e) {
      this.showLoading = false;
      let dragResizeBox = this.$refs['dragResizeBox'];
      let rect = dragResizeBox.getBoundingClientRect();
      let { x, y, width, height } = rect;
      let img = this.$refs['carImg']
      let imgW = img.naturalWidth, imgH = img.naturalHeight;
      if (imgW > 0 || imgH > 0) {
        // 图片宽高比是否 < 容器宽高比
        let proportion = imgW / imgH < width / height;
        // 设置图片内联样式
        this.imgWidth = proportion ? width : imgW / imgH * height;
        this.imgHeight = proportion ? imgH / imgW * width : height;
        this.translateX = -this.imgWidth / 2;
        this.translateY = -this.imgHeight / 2;
        this.dragBoxInfo = {
          x, y,
          x1: x + width,
          y1: y + height,
          img: this.imgSrc
        }
        this.$emit('dragBoxLoad', this.dragBoxInfo);
      } else if (count > 40) {
        this.dragBoxInfo = {
          x, y,
          x1: x + width,
          y1: y + height,
          img: this.imgSrc
        }
        this.$emit('dragBoxLoad', this.dragBoxInfo)
      }
    },
    imgOnError(e) {
      console.log('图片加载失败了');
    }
  },
  watch: {
    imgSrc: {
      immediate: true,
      handler(newV, oldV) {
        if (newV) {
          this.$nextTick(() => {
            this.showLoading = true
            // console.log(`图片地址改变了,新地址为：${newV} 旧地址为：${oldV}`);
            this.initData();
          })
        }
      }
    },
    currentTemp(newV, oldV) {
      if (newV != oldV) {
        // this.initData();
      }
    }
  }
}
</script>

<style lang="less" scoped>
.drag-resize-box {
  position: relative;
  overflow: hidden;
  .img-father,
  .cover-img {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  .cover-img {
    z-index: 99;
  }
  .img-father {
    z-index: 98;
    img {
      z-index: 98;
      position: relative;
    }
  }
  p {
    position: absolute;
    z-index: 999;
    font-size: 30px;
    width: 100%;
  }
  // 遮罩层
  .drag-layer {
    position: absolute;
    z-index: 10;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 4px solid transparent;
    border-radius: 10px;
    opacity: 0;
    &.show {
      background: rgba(255, 115, 0, 0.2);
      opacity: 1;
    }
    &.current {
      border: 4px solid #ff7300;
    }
  }
  .loading{
    position: absolute;
    z-index: 10;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 4px solid transparent;
    border-radius: 10px;
    background: rgba(0, 0, 0, 0.1);
    font-size: 28px;
    color: #000;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>