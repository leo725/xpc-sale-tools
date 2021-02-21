<template>
  <div class="container">
    <div class="main">
      <div class="canvas-container" ref="convasContainer">
        <img class="bg-img" ref="bgImg" v-if="posterImg" :src="baseImgUnshiftStr(posterImg)" alt="">
        <div class="code-box" :style="{left:realCodeStyle.x+'px',top:realCodeStyle.y+'px'}" v-if="realCodeStyle.width" @click="changeCodeType">
          <div class="qrcode" id="qrcode" :style="{width:realCodeStyle.width+'px',height: realCodeStyle.width+'px'}"></div>
          <div class="default-code" v-if="showDefaultCode">点击切换<br />二维码</div>
        </div>
      </div>
    </div>
    <ul class="fixed-btns">
      <li @click="drawImg('pyq')">
        <img src="../assets/icon-pyq.png" alt="朋友圈">
        <p>朋友圈</p>
      </li>
      <li @click="drawImg('wechat')">
        <img src="../assets/icon-wechat.png" alt="微信">
        <p>微信</p>
      </li>
      <li @click="drawImg('album')">
        <img src="../assets/icon-photo.png" alt="保存至相册">
        <p>保存至相册</p>
      </li>
    </ul>
  </div>
</template>

<script>
import { shopShareUrl } from 'api/url'
import html2canvas from 'html2canvas'
import QRCode from "qrcodejs2"
import { getPX, jsUseOcFunction } from 'utils/utils'
import { getShortUrl } from 'api'
export default {
  data() {
    return {
      options: {
        allowTaint: false, // 是否允许跨域图像污染画布
        logging: false, // 日志开关，便于查看html2canvas的内部执行流程
        useCORS: true,
        backgroundColor: null, // 背景色
        scale: 1.5
      },
      qrcodeLink: '',
      codeStyle: {
        x: 0,
        y: 0,
        width: 0
      },
      realCodeStyle: {},
      isIOS: false,
      posterImg: '',
      codeParams: {
        shareId: '',
        shopId: '',
        carId: '',
        type: ''
      },
      showDefaultCode: true,
      codeType: 'shop', // car
      bgImgBase64: ''
    }
  },
  created() {
    this.getRealWidth()
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
  mounted() {
    window.osUseJsFunctionToPostImg = this.osUseJsFunctionToPostImg
    window.osUseJsFnToPostCodeParams = this.osUseJsFnToPostCodeParams
    // setTimeout(() => {
    //   // this.osUseJsFunctionToPostImg({ "enable": false, "img": "http://xiaopang-test.oss-cn-hangzhou.aliyuncs.com/2020/06/04/_c7155028-79c6-472c-ab8c-73edc38656b7.jpg", "qrX": 100, "posterid": 6, "qrWidth": 130, "qrY": 200, "desc": "奥利给" })
    //   this.osUseJsFunctionToPostImg({ "enable": false, "img": "http://xiaopang-test.oss-cn-hangzhou.aliyuncs.com/116b7f58c83334b72ba94dd41467cbf5.png", "qrX": 100, "posterid": 6, "qrWidth": 130, "qrY": 200, "desc": "奥利给" })
    //   this.osUseJsFnToPostCodeParams({ shareId: 15, shopId: '8', carId: '', type: 'shop' })
    // }, 1000)
  },
  methods: {
    // 获取真实宽高
    getRealWidth() {
      // 获取实际尺寸
      let zoom = 0.8
      let x = getPX(this.codeStyle.x) * zoom;
      let y = getPX(this.codeStyle.y) * zoom;
      let width = getPX(this.codeStyle.width) * zoom;
      this.realCodeStyle = { x, y, width }
    },
    // 获得短网址
    async _getShortUrl() {
      let { sId, mId, city } = this.$route.query;
      let { shareId, shopId, carId, type } = this.codeParams
      let rawUrl
      if (type == 'car') {
        rawUrl = `${shopShareUrl}/carDetail?id=${carId}&sId=${sId}&mId=${shareId}&city=${city}&shareId=${this.codeParams.shareId}&shareTargetType=car&shareType=poster`;
      } else {
        rawUrl = `${shopShareUrl}/index?sId=${sId}&mId=${shareId}&city=${city}&shareId=${this.codeParams.shareId}&shareTargetType=car_dealer&shareType=poster`;
      }
      if (!this.qrcodeLink) {
        let res = await getShortUrl({ rawUrl });
        if (res.code == 0) {
          this.qrcodeLink = res.data
        } else {
          this.qrcodeLink = rawUrl
        }
        this.initCode();
      }
    },
    // 动态添加动画
    initCode() {
      try {
        var code = document.getElementById('qrcode');
        code.innerHTML = '';
        let option = {
          text: this.qrcodeLink,
          width: code.offsetHeight,
          height: code.offsetWidth,
          colorDark: "#000000",
          colorLight: "#ffffff"
        }
        var qrcode = new QRCode('qrcode', option);
      } catch (error) {

      }
    },
    // 生成海报
    drawImg(type) {
      this.showDefaultCode = false
      this.$nextTick(() => {
        let convasContainer = this.$refs['convasContainer'];
        html2canvas(convasContainer, this.options).then(canvas => {
          var context = canvas.getContext('2d')
          // // 【重要】关闭抗锯齿
          context.mozImageSmoothingEnabled = false
          context.webkitImageSmoothingEnabled = false
          context.msImageSmoothingEnabled = false
          context.imageSmoothingEnabled = false
          // 【重要】默认转化的格式为png,也可设置为其他格式
          let imgUrl = canvas.toDataURL('image/png')
          let params = {
            type,
            base64Img: imgUrl
          }
          jsUseOcFunction('jsUseOcFunction', params)
        }).catch(error => {
          this.$notify('生成海报失败')
        })
      })

    },
    osUseJsFunctionToPostImg(params) {
      if (typeof params == 'string') {
        try {
          params = JSON.stringify(params)
        } catch (error) {

        }
      }
      this.codeStyle = {
        x: params.qrX || 320,
        y: params.qrY || 1122,
        width: params.qrWidth || 136
      }
      this.posterImg = params.img;
      this.getRealWidth()
    },
    // 获取二维码的参数
    osUseJsFnToPostCodeParams(params) {
      if (typeof params == 'string') {
        try {
          params = JSON.stringify(params)
        } catch (error) {

        }
      }
      this.codeParams = params
    },
    changeCodeType() {
      this.showDefaultCode = false;
      jsUseOcFunction('jsUseOcFnChangeCodeType')
    },
  },
  watch: {
    codeParams: {
      deep: true,
      immediate: true,
      handler(newV) {
        if (newV.shareId) {
          this.qrcodeLink = '';
          this._getShortUrl()
        }
      }
    },
  }
}
</script>

<style lang="less" scoped>
.container {
  background: #000;
  display: flex;
  flex-direction: column;
  height: 100%;
  .main {
    flex: 1;
    overflow: auto;
    position: relative;
    padding-bottom: 50px;
    .canvas-container {
      margin: 0 auto;
      margin-top: 50px;
      position: relative;
      width: 750 * 0.8px;
      height: 1333 * 0.8px;
      background: #ccc;
      .bg-img {
        width: 100%;
        height: 100%;
      }
      .code-box {
        position: absolute;
        text-align: center;
        min-width: 100px;
        border-radius: 4px;
        border: 4px solid #fff;
        background: #fff;
        display: inline-block;
        .qrcode {
          margin: 0 auto;
        }
        p {
          font-size: 20px;
          margin-top: 10px;
          color: #fff;
        }
        .default-code {
          width: 100%;
          height: 100%;
          font-size: 20px;
          color: #3b3b3b;
          position: absolute;
          top: 0;
          left: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          line-height: 40px;
          font-weight: bold;
          background: #fff url(~@/assets/code-opacity.jpg) no-repeat;
          background-size: 100% 100%;
          border: 3px dashed #ff4c0e;
        }
      }
    }
  }

  .fixed-btns {
    z-index: 99;
    display: flex;
    height: 180px;
    align-items: center;
    width: 100%;
    background: #fff;
    li {
      flex: 1;
      text-align: center;
      img {
        width: 68px;
        height: 68px;
      }
      p {
        font-size: 22px;
        color: #3b3b3b;
        margin-top: 20px;
      }
    }
  }
}
</style>