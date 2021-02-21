<template>
  <div class="container">
    <div class="main">
      <!-- 画布 -->
      <div class="convas-container" ref="convasContainer">
        <!-- 模板1 -->
        <div class="poster-item poster-item-1" v-if="activeTemplate.codeId == 'qrcode1'">
          <dragResizeImg class="img-box-1" :imgSrc='imgList[0]' :showLayer='showLayer' :currentTarget='imgList[0]==currentImg' :currentTemp='activeTemplate.codeId' @dragBoxLoad='dragBoxLoad' @changeShowLayer='changeShowLayer' @handleLongTap='handleLongTap' @handleTouchMove='handleTouchMove' @handleLongEnd='handleLongEnd'></dragResizeImg>
          <div class="item-center flex">
            <ul class="item-center-l">
              <!-- <li><i class="dot"></i>{{JSON.stringify(imgList)}}</li> -->
              <li v-if="detail.plateYear"><i class="dot"></i>上牌 {{detail.plateYear}}年{{detail.plateMonth}}月</li>
              <li><i class="dot"></i>里程 {{detail.kilometres||'--'}}万公里</li>
              <li v-if="detail.carModelItem"><i class="dot"></i>排量 {{detail.carModelItem.carEmissions}}</li>
              <li v-if="detail.standard"><i class="dot"></i>排放标准 {{detail.standard}}</li>
            </ul>
            <dragResizeImg class="item-center-r" :imgSrc='imgList[1]' :showLayer='showLayer' :currentTarget='imgList[1] == currentImg' :currentTemp='activeTemplate.codeId' @dragBoxLoad='dragBoxLoad' @changeShowLayer='changeShowLayer' @handleLongTap='handleLongTap' @handleTouchMove='handleTouchMove' @handleLongEnd='handleLongEnd'></dragResizeImg>
          </div>
          <div class="item-center flex">
            <dragResizeImg class="item-center-r item-center-r2" :imgSrc='imgList[2]' :showLayer='showLayer' :currentTarget='imgList[2] == currentImg' :currentTemp='activeTemplate.codeId' @dragBoxLoad='dragBoxLoad' @changeShowLayer='changeShowLayer' @handleLongTap='handleLongTap' @handleTouchMove='handleTouchMove' @handleLongEnd='handleLongEnd'></dragResizeImg>
            <div class="car-title">
              <h1>{{detail.modelName}}</h1>
              <p class="shop">{{shopName}}</p>
            </div>
          </div>
          <div class="money-box flex">
            <div class="money-txt">
              <p>特惠价</p>
              <span>{{detail.retailPrice|_toFixed}}万</span>
            </div>
            <!-- 二维码 -->
            <div class="code-box">
              <div class="qrcode" id='qrcode1' ref="qrcode1"></div>
            </div>
          </div>
        </div>

        <!-- 模板2 -->
        <div class="poster-item poster-item-2" v-else-if="activeTemplate.codeId == 'qrcode2'">
          <dragResizeImg class="img-box-2" :imgSrc='imgList[0]' :showLayer='showLayer' :currentTarget='imgList[0]==currentImg' :currentTemp='activeTemplate.codeId' @dragBoxLoad='dragBoxLoad' @changeShowLayer='changeShowLayer' @handleLongTap='handleLongTap' @handleTouchMove='handleTouchMove' @handleLongEnd='handleLongEnd'></dragResizeImg>
          <div class="flex item-center">
            <div class="item-center-l">
              <div class="c-top">
                <span>特惠价</span>
                <div>{{detail.retailPrice|_toFixed}}<b class="wan">万</b></div>
              </div>
              <ul class="info-list">
                <li><i class="dot"></i>上牌 {{detail.plateYear}}年{{detail.plateMonth}}月</li>
                <li><i class="dot"></i>里程 {{detail.kilometres}}万公里</li>
                <li v-if="detail.carModelItem"><i class="dot"></i>排量 {{detail.carModelItem.carEmissions}}</li>
              </ul>
            </div>
            <dragResizeImg class="item-center-r" :imgSrc='imgList[1]' :showLayer='showLayer' :currentTarget='imgList[1]==currentImg' :currentTemp='activeTemplate.codeId' @dragBoxLoad='dragBoxLoad' @changeShowLayer='changeShowLayer' @handleLongTap='handleLongTap' @handleTouchMove='handleTouchMove' @handleLongEnd='handleLongEnd'></dragResizeImg>
          </div>
          <div class="item-bottom flex">
            <div class="item-bottom-l">
              <dragResizeImg class="item-bottom-img" :imgSrc='imgList[2]' :showLayer='showLayer' :currentTarget='imgList[2]==currentImg' :currentTemp='activeTemplate.codeId' @dragBoxLoad='dragBoxLoad' @changeShowLayer='changeShowLayer' @handleLongTap='handleLongTap' @handleTouchMove='handleTouchMove' @handleLongEnd='handleLongEnd'></dragResizeImg>
              <p>
                <span class="infos">
                  <img class="icon" src="../assets/poster/icon-location.png" alt=""><i>{{shopName}}</i>
                </span>
                <span class="infos gold">
                  <img class="icon" src="../assets/poster/icon-gold.png" alt=""><i>金牌销售推荐</i>
                </span>
              </p>
            </div>
            <div class="item-bottom-r">
              <div class="code-box">
                <div class="qrcode qrcode2" id='qrcode2' ref="qrcode2"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- 模板3 -->
        <div class="poster-item poster-item-3" v-else-if="activeTemplate.codeId == 'qrcode3'">
          <div class="item-3-top">
            <img src="../assets/logo.jpg" alt="">
            <p>{{shopName}}</p>
          </div>
          <div class="item-3-main">
            <dragResizeImg class="img-box-3" :imgSrc='imgList[0]' :showLayer='showLayer' :currentTarget='imgList[0]==currentImg' :currentTemp='activeTemplate.codeId' @dragBoxLoad='dragBoxLoad' @changeShowLayer='changeShowLayer' @handleLongTap='handleLongTap' @handleTouchMove='handleTouchMove' @handleLongEnd='handleLongEnd'></dragResizeImg>
            <div class="info">
              <p class="money">特惠价<span>{{detail.retailPrice|_toFixed}}万</span></p>
              <div class="txt">
                <span>上牌 {{detail.plateYear}}年{{detail.plateMonth}}月</span>
                <span>里程 {{detail.kilometres}}万公里</span>
              </div>
              <div class="double-line"></div>
            </div>
            <!-- 二维码 -->
            <div class="code-box">
              <div class="qrcode" id='qrcode3' ref="qrcode3"></div>
              <p>长按识别二维码</p>
            </div>
          </div>
        </div>

        <!-- 模板4 -->
        <div class="poster-item poster-item-4" v-else-if="activeTemplate.codeId == 'qrcode4'">
          <div class="irregular-box-1">
            <dragResizeImg class="img-box" :imgSrc='imgList[0]' :showLayer='showLayer' :currentTarget='imgList[0]==currentImg' :currentTemp='activeTemplate.codeId' @dragBoxLoad='dragBoxLoad' @changeShowLayer='changeShowLayer' @handleLongTap='handleLongTap' @handleTouchMove='handleTouchMove' @handleLongEnd='handleLongEnd'></dragResizeImg>
          </div>
          <div class="irregular-box-2">
            <dragResizeImg class="img-box" :imgSrc='imgList[1]' :showLayer='showLayer' :currentTarget='imgList[1]==currentImg' :currentTemp='activeTemplate.codeId' @dragBoxLoad='dragBoxLoad' @changeShowLayer='changeShowLayer' @handleLongTap='handleLongTap' @handleTouchMove='handleTouchMove' @handleLongEnd='handleLongEnd'></dragResizeImg>
          </div>
          <div class="irregular-box-3">
            <dragResizeImg class="img-box" :imgSrc='imgList[2]' :showLayer='showLayer' :currentTarget='imgList[2]==currentImg' :currentTemp='activeTemplate.codeId' @dragBoxLoad='dragBoxLoad' @changeShowLayer='changeShowLayer' @handleLongTap='handleLongTap' @handleTouchMove='handleTouchMove' @handleLongEnd='handleLongEnd'></dragResizeImg>
          </div>
          <div class="irregular-box-4">
            <dragResizeImg class="img-box" :imgSrc='imgList[3]' :showLayer='showLayer' :currentTarget='imgList[3]==currentImg' :currentTemp='activeTemplate.codeId' @dragBoxLoad='dragBoxLoad' @changeShowLayer='changeShowLayer' @handleLongTap='handleLongTap' @handleTouchMove='handleTouchMove' @handleLongEnd='handleLongEnd'></dragResizeImg>
          </div>
          <div class="irregular-c">
            <ul class="irregular-c-main">
              <li class="car-title flex">
                <div>
                  <p>{{detail.brandName}}&nbsp;{{detail.modelName}}</p>
                  <span>{{shopName}}</span>
                </div>
              </li>
              <li class="money-box flex">
                <div>
                  <p class="money">{{detail.retailPrice|_toFixed}}<span>万</span></p>
                  <!-- <span class="thj">特惠价</span> -->
                  <img src="../assets/thj.png" alt="" class="thj">
                  <div class="qrcode" id='qrcode4' ref="qrcode4"></div>
                </div>
              </li>
              <li class="info-list flex">
                <div>
                  <p><i class="dot"></i>上牌 {{detail.plateYear}}年{{detail.plateMonth}}月</p>
                  <p><i class="dot"></i>里程 {{detail.kilometres}}万公里</p>
                  <p v-if="detail.carModelItem"><i class="dot"></i>排量 {{detail.carModelItem.carEmissions}}</p>
                  <p v-if="detail.standard"><i class="dot"></i>排放标准 {{detail.standard}}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <!-- 模板5 -->
        <div class="poster-item poster-item-5" v-else-if="activeTemplate.codeId == 'qrcode5'">
          <p class="title">{{detail.brandName}} {{detail.modelName}}</p>
          <div class="img-box-1">
            <dragResizeImg class="img-box" :imgSrc='imgList[0]' :showLayer='showLayer' :currentTarget='imgList[0]==currentImg' :currentTemp='activeTemplate.codeId' @dragBoxLoad='dragBoxLoad' @changeShowLayer='changeShowLayer' @handleLongTap='handleLongTap' @handleTouchMove='handleTouchMove' @handleLongEnd='handleLongEnd'></dragResizeImg>
          </div>
          <div class="footer flex">
            <div class="footer-r">
              <div class="code-box">
                <div class="qrcode" id='qrcode5' ref="qrcode5"></div>
              </div>
              <p>长按识别二维码</p>
            </div>
          </div>
        </div>

        <!-- 模板6 -->
        <div class="poster-item poster-item-6" v-else-if="activeTemplate.codeId == 'qrcode6'">
          <p class="title">{{detail.brandName}}<br />{{detail.modelName}}</p>
          <div class="circle-box">
            <dragResizeImg class="img-box-3" currentTemp='qrcode6' :imgSrc='imgList[0]' :showLayer='showLayer' :currentTarget='imgList[0]==currentImg' :currentTemp='activeTemplate.codeId' @dragBoxLoad='dragBoxLoad' @changeShowLayer='changeShowLayer' @handleLongTap='handleLongTap' @handleTouchMove='handleTouchMove' @handleLongEnd='handleLongEnd'></dragResizeImg>
          </div>
          <div class="footer">
            <div class="code-box">
              <div class="qrcode" id='qrcode6' ref="qrcode6"></div>
              <p class="shopname">
                <img src="../assets/poster/icon-location1.png" alt=""><br />
                {{shopName}}
              </p>
            </div>
            <div class="footer-r">
              <div class="price">{{detail.retailPrice|_toFixed}}万</div>
              <ul class="infos">
                <li v-if="detail.plateYear">上牌 {{detail.plateYear}}年{{detail.plateMonth}}月</li>
                <li></i>里程 {{detail.kilometres||'--'}}万公里</li>
                <li v-if="detail.carModelItem">排量 {{detail.carModelItem.carEmissions}}</li>
              </ul>
            </div>
          </div>
        </div>

        <!-- 模板7 -->
        <div class="poster-item poster-item-7" v-else-if="activeTemplate.codeId == 'qrcode7'">
          <div class="img-box-1">
            <dragResizeImg class="img-box" :imgSrc='imgList[0]' :showLayer='showLayer' :currentTarget='imgList[0]==currentImg' :currentTemp='activeTemplate.codeId' @dragBoxLoad='dragBoxLoad' @changeShowLayer='changeShowLayer' @handleLongTap='handleLongTap' @handleTouchMove='handleTouchMove' @handleLongEnd='handleLongEnd'></dragResizeImg>
          </div>
          <div class="footer flex">
            <div class="footer-l">
              <p class="title">{{detail.brandName}}<br />{{detail.modelName}}</p>
              <div class="shop-name">
                <img src="../assets/poster/icon-location3.png" alt="">
                <p>{{shopName}}</p>
              </div>
            </div>
            <div class="footer-r">
              <div class="code-box">
                <div class="qrcode" id='qrcode7' ref="qrcode7"></div>
              </div>
              <p>长按识别二维码</p>
            </div>
          </div>
        </div>

        <!-- 模板8 -->
        <div class="poster-item poster-item-8" v-else-if="activeTemplate.codeId == 'qrcode8'">
          <div class="img-main">
            <div class="img-box-container">
              <dragResizeImg class="img-box" :imgSrc='imgList[0]' :showLayer='showLayer' :currentTarget='imgList[0]==currentImg' :currentTemp='activeTemplate.codeId' @dragBoxLoad='dragBoxLoad' @changeShowLayer='changeShowLayer' @handleLongTap='handleLongTap' @handleTouchMove='handleTouchMove' @handleLongEnd='handleLongEnd'></dragResizeImg>
            </div>
            <div class="title">
              <p>{{detail.brandName}} {{detail.modelName}}</p>
              <span class="local">
                <img src="../assets/poster/icon-location4.png" alt="">
                {{shopName}}
              </span>
            </div>
          </div>
          <div class="footer">
            <div class="code-box">
              <div class="qrcode" :id='activeTemplate.codeId' :ref="activeTemplate.codeId"></div>
            </div>
            <div class="code-info">
              <span>扫一扫二维码<br>查看车辆详情</span>
              <div class="circle">特价优惠 欢迎咨询</div>
            </div>
          </div>
        </div>

        <!-- 模板9 -->
        <div class="poster-item poster-item-9" v-else-if="activeTemplate.codeId == 'qrcode9'">
          <dragResizeImg class="img-box" :imgSrc='imgList[0]' :showLayer='showLayer' :currentTarget='imgList[0]==currentImg' :currentTemp='activeTemplate.codeId' @dragBoxLoad='dragBoxLoad' @changeShowLayer='changeShowLayer' @handleLongTap='handleLongTap' @handleTouchMove='handleTouchMove' @handleLongEnd='handleLongEnd'></dragResizeImg>
          <div class="footer flex">
            <div class="footer-l">
              <div class="code-box">
                <div class="qrcode" :id='activeTemplate.codeId' :ref="activeTemplate.codeId"></div>
              </div>
              <p class="code-txt">扫一扫进店</p>
            </div>
            <div class="footer-r">
              <p class="title">{{detail.brandName}} {{detail.modelName}}</p>
              <ul class="infos">
                <li><span>上牌&nbsp;&nbsp;</span> {{detail.plateYear}}年{{detail.plateMonth}}月</li>
                <li><span>里程&nbsp;&nbsp;</span>{{detail.kilometres||'--'}}万公里</li>
                <li v-if="detail.carModelItem"><span>排量&nbsp;&nbsp;</span>{{detail.carModelItem.carEmissions}}</li>
              </ul>
            </div>
          </div>
          <img src="../assets/poster/other-9.png" alt="" class="bianpao">
        </div>

        <div class="layer-img" v-show="showLayer" :style="{left:layerStyle.x+'px',top:layerStyle.y+'px'}">
          <img :src="baseImgUnshiftStr(layerImg)" alt="">
        </div>
      </div>
    </div>
    <div class="templates">
      <div class="templates-box">
        <div v-for="(item, index) in templateList" :key="index" :class="activeTemplate.codeId == item.codeId && 'active'" @click="changeTemplate(item)">
          <img :src="item.thum" alt="">
          <div class="temp-cover" v-if="item.toShop">{{item.toShop?'已售':'在售'}}</div>
        </div>
      </div>
    </div>

    <div class="loading-box" v-show="loading">
      <van-loading color='#fff' size='36' text-size='14' vertical>图片生成中...</van-loading>
    </div>

    <!-- 按钮 -->
    <!-- <van-button style="position:absolute;top:0;left:50px;z-index:999" type='primary' @click="drawImg">生成海报</van-button> -->
  </div>
</template>

<script>
import html2canvas from 'html2canvas'
import dragResizeImg from 'components/drag-resize-img'
import { getSellCarDetail, getShortUrl } from 'api'
import { shopShareUrl } from 'api/url'
import { littleImg2 } from 'utils/filter'
import QRCode from "qrcodejs2"
import { jsUseOcFunction } from 'utils/utils'
export default {
  data() {
    return {
      options: {
        allowTaint: false, // 是否允许跨域图像污染画布
        logging: false, // 日志开关，便于查看html2canvas的内部执行流程
        useCORS: true,
        backgroundColor: null, // 背景色
        scale: 3
      },
      detail: {},
      templateList: [ // 所有模板
        { thum: require('@/assets/poster/lettle-5.jpg'), codeId: 'qrcode5', imgLength: 1, name: '模板5' },
        { thum: require('@/assets/poster/lettle-8.jpg'), codeId: 'qrcode8', imgLength: 1, name: '模板8' },
        { thum: require('@/assets/poster/lettle-7.jpg'), codeId: 'qrcode7', imgLength: 1, name: '模板7' },
        { thum: require('@/assets/poster/lettle-9.jpg'), codeId: 'qrcode9', imgLength: 1, name: '模板9', toShop: true }, // toShop： 已售车源（扫码进入店铺详情）
        { thum: require('@/assets/poster/lettle-6.jpg'), codeId: 'qrcode6', imgLength: 1, name: '模板6' },
        { thum: require('@/assets/poster/lettle-4.jpg'), codeId: 'qrcode4', imgLength: 4, name: '模板4' },
        { thum: require('@/assets/poster/lettle-3.jpg'), codeId: 'qrcode3', imgLength: 1, name: '模板3' },
        { thum: require('@/assets/poster/lettle-1.jpg'), codeId: 'qrcode1', imgLength: 3, name: '模板1' },
        { thum: require('@/assets/poster/lettle-2.jpg'), codeId: 'qrcode2', imgLength: 3, name: '模板2' },
      ],
      activeTemplate: {},
      layerImg: '', // 长按需要移动的图片地址
      layerStyle: {},
      showLayer: false,
      imgList: [],
      carImgList: [],
      xyList: [],
      currentImg: '',
      exchanges: {},
      qrcodeLink: '',
      shopName: '',
      reloadImg: true,
      shareId: '',
      // isFirstLoad: true,
      loading: false
    }
  },
  computed: {
    baseImgUnshiftStr() {
      return (str) => {
        let unStr = 'data:image/png;base64,'
        let flag = str.includes(unStr) || str.includes('http:') || str.includes('https:')
        return flag ? str : unStr + str
      }
    }
  },
  created() {
    this.getSellCarDetail();
  },
  mounted() {
    window.UseJsFnToPostShareId = this.osUseJsFnToPostShareId
    window.osUseJsFunction = this.osUseJsFunction
    window.osUseJsFunctionGiveImgList = this.osUseJsFunctionGiveImgList
    window.osUseJsFunctionPostShopInfo = this.osUseJsFunctionPostShopInfo
    window.osUseJsFnToGetImgLen = this.osUseJsFnToGetImgLen
    this.changeTemplate(this.templateList[0], true);
  },
  components: { dragResizeImg },
  methods: {
    // 获得短网址
    async _getShortUrl(refresh) {
      let { id, sId, mId, city } = this.$route.query;
      let rawUrl;
      if (this.activeTemplate.toShop) {
        rawUrl = `${shopShareUrl}/index?sId=${sId}&mId=${mId}&city=${city}&shareId=${this.shareId}&shareType=splice_img&shareTargetType=car_dealer`
      } else {
        rawUrl = `${shopShareUrl}/carDetail?id=${id}&sId=${sId}&mId=${mId}&city=${city}&shareId=${this.shareId}&shareType=splice_img&shareTargetType=car`
      }
      if (!this.qrcodeLink || refresh) {
        let res = await getShortUrl({ rawUrl });
        if (res.code == 0) {
          this.qrcodeLink = res.data
        } else {
          this.qrcodeLink = rawUrl
        }
      }
      this.initCode(this.activeTemplate.codeId)
    },
    // 获取车源详情
    async getSellCarDetail() {
      let params = {
        id: this.$route.query.id
      }
      let res = await getSellCarDetail(params);
      if (res.code == 0) {
        this.detail = res.data;
        let carImgList = [];
        for (let i = 0; i < res.data.imgList.length; i++) {
          if (res.data.imgList[i].attachmentType !== 3) {
            const img = littleImg2(res.data.imgList[i].filePath,400);
            carImgList.push(img);
          }
        }
        this.carImgList = carImgList;
        /* 开发时解注释下面代码 */
        if (process.env.NODE_ENV === 'development') {
          this._getShortUrl();
          this.imgList = [];
          for (let i = 0; i < res.data.imgList.length; i++) {
            const img = res.data.imgList[i].filePath;
            this.imgList.push(img);
          }
        }
      }
    },
    // 生成海报
    drawImg() {
      if (JSON.stringify(this.activeTemplate) == '{}') return
      if (!this.shareId) {
        return this.$notify('二维码生成中，请稍后再试...')
      }
      this.loading = true;
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
        // if (this.isFirstLoad) {
        //   this.drawImg();
        //   this.isFirstLoad = false
        //   return
        // }
        // let img = document.createElement('img')
        // img.setAttribute('src', imgUrl)
        // document.body.appendChild(img)
        this.loading = false
        jsUseOcFunction('jsUseOcFnToPostBase64Img', imgUrl)
      })
    },
    // 动态添加动画
    initCode(id) {
      try {
        var code = document.getElementById(id);
        code.innerHTML = '';
        let option = {
          text: this.qrcodeLink,
          width: code.offsetHeight,
          height: code.offsetWidth,
          colorDark: "#000000",
          colorLight: "#ffffff",
          correctLevel: QRCode.CorrectLevel.H,
        }
        var qrcode = new QRCode(id, option);
      } catch (error) {

      }
    },
    changeShowLayer(e) {
      this.showLayer = e.bool
      try {
        // 交换图片位置
        if (!e.bool && this.exchanges.idx1 && this.exchanges.idx2) {
          this.imgList[this.exchanges.idx1.index] = this.exchanges.idx2.imgSrc
          this.imgList[this.exchanges.idx2.index] = this.exchanges.idx1.imgSrc
          this.xyList[this.exchanges.idx1.index].img = this.exchanges.idx2.imgSrc
          this.xyList[this.exchanges.idx2.index].img = this.exchanges.idx1.imgSrc
          this.currentImg = ''
          this.layerStyle = {}
        }
      } catch (error) {

      }
    },
    // 元素加载完成回调
    dragBoxLoad(e) {
      let index = this.imgList.indexOf(e.img)
      this.xyList[index] = e;
    },
    // 组件长按回调
    handleLongTap(e) {
      this.showLayer = true;
      this.layerImg = e.img;
      this.layerStyle = {
        x: e.touch.clientX,
        y: e.touch.clientY
      }
    },
    // 手指移动回调
    handleTouchMove(e) {
      let touch = e.touches[0];
      let x = touch.clientX,
        y = touch.clientY
      this.layerStyle = { x, y }
      for (let i = 0; i < this.xyList.length; i++) {
        const ele = this.xyList[i];
        // 判读是否移动到元素内部
        if (x >= ele.x && x <= ele.x1 && y >= ele.y && y <= ele.y1 && e.imgSrc !== ele.img) {
          this.currentImg = ele.img;
          // 保存选中的 与 目标图片的信息
          let idx1 = this.imgList.indexOf(e.imgSrc);
          let idx2 = this.imgList.indexOf(ele.img);
          this.exchanges = {
            idx1: { index: idx1, imgSrc: e.imgSrc },
            idx2: { index: idx2, imgSrc: ele.img }
          }
        }
      }
    },
    // 触摸结束
    handleLongEnd() {
      this.showLayer = false;
    },
    // 切换模板
    changeTemplate(item, stopDrawImg) {
      if ((this.detail.state == 3 || this.detail.state == 4) && !item.toShop) {
        return this.$notify({ type: 'warning', message: '该车已下架，该模板不适用' })
      }
      this.loading = false
      if (this.activeTemplate.imgLength < item.imgLength && this.imgList.length < item.imgLength) { // 如果选中模板需要图片 大于当前模板，则自动填充剩余的图片
        // this.$notify({ type: 'warning', message: `请选择${item.imgLength}张图片` })
        let otherImgs = this.carImgList.slice(this.activeTemplate.imgLength, item.imgLength);
        this.imgList = [...this.imgList, ...otherImgs]
      }
      let needChangeCodeUrl = this.activeTemplate.toShop !== item.toShop;
      try {
        if (this.activeTemplate.codeId) {
          this.$refs[this.activeTemplate.codeId].innerHTML = ''
        }
      } catch (error) {

      }
      this.activeTemplate = item;
      let params = {
        imgLength: item.imgLength
      }
      jsUseOcFunction('jsUseOcFnToGetImgLen', { imgLength: this.activeTemplate.imgLength })
      if (stopDrawImg) return
      this.$nextTick(() => {
        needChangeCodeUrl ? this._getShortUrl(true) : this.initCode(item.codeId)
      })
    },
    // 提供方法给 app 调用
    osUseJsFunction() {
      this.$nextTick(() => {
        this.drawImg()
      })
    },
    // 获取 APP 传递过来的图片列表
    osUseJsFunctionGiveImgList(params = []) {
      try {
        if (typeof params == 'string') {
          params = JSON.parse(params)
        }
      } catch (error) {

      }
      let imgList = []
      params.forEach(ele=>{
        let img = ele.includes('?x-oss-process') ? ele : littleImg2(ele,400);
        imgList.push(img)
      })
      this.imgList = imgList
      this.$nextTick(() => {
        this.initCode(this.activeTemplate.codeId)
      })
    },
    // 从 APP 获取店铺信息
    osUseJsFunctionPostShopInfo(params) {
      // this.$notify(JSON.stringify(params))
    },
    // 获取shareid 与 店铺信息
    osUseJsFnToPostShareId(params) {
      try {
        if (typeof params == 'string') {
          params = JSON.parse(params)
        }
      } catch (error) {

      }
      let { shareID, midShopName } = params
      this.shareId = shareID
      this.shopName = midShopName
    },
    osUseJsFnToGetImgLen() {
      return this.activeTemplate.imgLength
    }
  },
  watch: {
    shareId: {
      immediate: true,
      handler(newV) {
        if (newV) {
          this._getShortUrl()
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
//
.container {
  background: #000;
  height: 100vh;
  display: flex;
  flex-direction: column;
  .main {
    flex: 1;
    overflow: hidden;
    padding-bottom: 20px;
  }
  .convas-container {
    width: 600px;
    height: 1067px;
    margin: 0px auto;
    overflow: hidden;
    text-align: center;
    margin-top: 40px;
    position: relative;
    .layer-img {
      position: absolute;
      z-index: 1999;
      transform: translate(-100%, -100%);
      left: 0;
      top: 0;
      img {
        opacity: 0.7;
        width: 200px;
      }
    }
    .poster-item {
      width: 100%;
      height: 100%;
      position: relative;
    }

    .qrcode {
      position: relative;
    }

    /* 模板1 */
    .poster-item-1 {
      background: url(~@/assets/poster/bg-1.png) no-repeat;
      background-size: 100% 100%;
      padding: 30px 22px 0px 41px;
      border-radius: 10px;
      .img-box-1 {
        width: 100%;
        height: 411px;
        border-radius: 10px;
      }

      .item-center {
        display: flex;
        padding-top: 20px;
        height: 220px;
        .item-center-r {
          width: 295px;
          height: 100%;
          border-radius: 10px;
        }
        .item-center-l {
          flex: 1;
          height: 100%;
          padding-left: 30px;
          text-align: left;
          padding-top: 30px;
          li {
            font-size: 20px;
            color: #333333;
            line-height: 36px;
            .dot {
              display: inline-block;
              width: 8px;
              height: 8px;
              border-radius: 50%;
              background: #333;
              vertical-align: middle;
              margin-right: 20px;
            }
          }
        }
        .item-center-r2 {
          width: 244px;
          height: 184px;
        }
        .car-title {
          flex: 1;
          padding-left: 20px;
          padding-top: 40px;
          h1 {
            font-size: 26px;
            color: #333333;
            font-weight: bold;
            text-align: justify;
          }
          .shop {
            font-size: 18px;
            color: #666666;
            margin-top: 10px;
          }
        }
      }
      .money-box {
        .money-txt {
          width: 60%;
          text-align: left;
          padding: 10px 0 0 70px;
          p {
            font-size: 28px;
            color: #333333;
          }
          span {
            color: #ff654b;
            font-size: 44px;
            font-weight: bold;
          }
        }
        .code-box {
          background: #fff;
          box-shadow: 10px 10px 0px #ff654b;
          padding: 6px;
          border: 2px solid #eee; /* no */
          margin-left: 12px;
          .qrcode {
            width: 115px;
            height: 115px;
          }
        }
      }
    }

    /* 模板2 */
    .poster-item-2 {
      border-radius: 10px;
      overflow: hidden;
      background: #fff;
      .img-box-2 {
        height: 450px;
      }
      .item-center {
        padding: 10px 10px 0;
        .item-center-l {
          flex: 1;
          margin-right: 10px;
          background: #8a9e99 url(~@/assets/poster/temp2-c-bg.jpg) no-repeat;
          background-size: 100% 100%;
          height: 241px;
          color: #fff;
          .c-top {
            text-align-last: left;
            padding-left: 25px;
            padding-top: 40px;
            display: flex;
            align-items: center;
            span {
              font-size: 19px;
              font-weight: bold;
              -webkit-writing-mode: vertical-rl;
              writing-mode: vertical-rl;
            }
            div {
              font-size: 38px;
              font-weight: bold;
              padding-left: 30px;
              flex: 1;
            }
            .wan {
              font-size: 20px;
            }
          }
          .info-list {
            margin-top: 40px;
            text-align: left;
            padding-left: 20px;
            li {
              font-size: 18px;
              line-height: 30px;
              i {
                display: inline-block;
                width: 4px;
                height: 4px;
                border-radius: 50%;
                background: #fff;
                margin-right: 20px;
                vertical-align: middle;
              }
            }
          }
        }
        .item-center-r {
          width: 323px;
          height: 241px;
        }
      }
      .item-bottom {
        padding: 0 10px;
        .item-bottom-l {
          padding-top: 10px;

          .item-bottom-img {
            width: 384px;
            height: 287px;
          }
          p {
            text-align: left;
            padding-top: 20px;
            padding-left: 20px;
            .infos {
              color: #54605d;

              &.gold {
                color: #d97f3c;
              }
              img {
                width: 19px;
                vertical-align: middle;
                margin-right: 10px;
              }
              i {
                font-size: 14px;
                font-weight: bold;
                margin-right: 30px;
                vertical-align: middle;
              }
            }
          }
        }
        .item-bottom-r {
          flex: 1;
          background: url(~@/assets/poster/temp2-b-bg.png) no-repeat;
          background-size: 100% 100%;
          margin-left: 30px;
          height: 366px;
          padding-top: 140px;
          text-align: left;
          .code-box {
            background-color: #fff;
            padding: 6px;
            border: 2px solid #eee; /* no */
            display: inline-block;
            .qrcode {
              width: 140px;
              height: 140px;
              position: relative;
            }
          }
        }
      }
    }

    /* 模板3 */
    .poster-item-3 {
      background: #142875 url(~@/assets/poster/temp3-bg.jpg) no-repeat;
      background-size: 100% 100%;
      padding: 42px 20px 20px;
      display: flex;
      flex-direction: column;
      .item-3-top {
        img {
          width: 80px;
          height: 80px;
          border-radius: 50%;
        }
        p {
          font-size: 22px;
          color: #fff;
          font-weight: bold;
          margin-top: 22px;
        }
      }
      .item-3-main {
        padding: 20px;
        background: #fff;
        flex: 1;
        margin-top: 30px;
        border-radius: 10px;
        .img-box-3 {
          height: 392px;
        }
        .info {
          text-align: left;
          .money {
            font-size: 28px;
            color: #333333;
            margin: 10px 0 4px;
            span {
              font-size: 40px;
              color: #ff7300;
              margin-left: 10px;
              font-weight: bold;
            }
          }
          .txt {
            span {
              font-size: 24px;
              color: #8d8d8d;
              margin-right: 30px;
            }
          }
          .double-line {
            border-top: 1px solid #e7e7e7;
            border-bottom: 1px solid #e7e7e7;
            height: 10px;
            margin-top: 20px;
          }
        }
        .code-box {
          text-align: center;
          .qrcode {
            width: 135px;
            height: 135px;
            margin: 50px auto 18px;
          }
          p {
            font-size: 24px;
            color: #8d8d8d;
          }
        }
      }
    }

    /* 模板4 */
    .poster-item-4 {
      overflow: hidden;
      .irregular-box-1 {
        width: 660px;
        height: 400px;
        top: -80px;
        left: -40px;
        transform: rotateZ(-10deg);
        position: relative;
        overflow: hidden;
        border-bottom: 2px solid #fff;
        z-index: 99;
        background: #fff;
        .img-box {
          top: 60px;
          left: 20px;
          width: 620px;
          height: 400px;
          transform: rotateZ(10deg);
        }
      }
      .irregular-box-2 {
        width: 600px;
        height: 400px;
        top: -132px;
        left: -0px;
        position: relative;
        overflow: hidden;
        background: #fff;
        z-index: 98;
        .img-box {
          width: 100%;
          height: 100%;
        }
      }
      .irregular-box-3 {
        width: 328px;
        height: 406px;
        left: 0;
        bottom: 0;
        position: absolute;
        overflow: hidden;
        z-index: 97;
        background: #fff;
        .img-box {
          width: 100%;
          height: 100%;
        }
      }
      .irregular-box-4 {
        width: 400px;
        height: 406px;
        right: -68px;
        bottom: -60px;
        position: absolute;
        overflow: hidden;
        z-index: 98;
        transform: rotateZ(10deg);
        background: #fff;
        border-left: 2px solid #fff;
        .img-box {
          width: 100%;
          height: 100%;
          left: -60px;
          top: 0;
          transform: rotateZ(-10deg);
        }
      }
      // 中间文字部分
      .irregular-c {
        position: absolute;
        height: 300px;
        width: 750px;
        background: #fff;
        left: -50px;
        top: 47%;
        z-index: 100;
        transform: rotateZ(10deg);
        overflow: hidden;
        border: 1px solid #eee /* no */;
        .irregular-c-main {
          width: 610px;
          height: 414px;
          position: absolute;
          top: -56px;
          left: 50px;
          transform: rotateZ(-10deg);
          display: flex;
          > li {
            flex: 1;
            height: 100%;
            background: #fff;
            padding: 0 12px;
            &:not(:first-child) {
              border-left: 1px solid #eee /* no */;
            }
            &.car-title {
              padding-top: 20px;
              padding-bottom: 90px;
              display: flex;
              align-items: center;
              div {
                p {
                  font-size: 28px;
                  font-weight: bold;
                  color: #333;
                  margin-bottom: 10px;
                }
                span {
                  font-size: 20px;
                  color: #666;
                }
              }
            }
            &.money-box {
              align-items: center;
              justify-content: center;
              .money {
                font-size: 44px;
                color: #333333;
                font-weight: bold;
                margin-bottom: 10px;
                span {
                  font-size: 24px;
                  font-weight: bold;
                }
              }
              .thj {
                width: 138px;
              }
              .qrcode {
                margin: 10px auto 0;
                width: 120px;
                height: 120px;
              }
            }
            &.info-list {
              align-items: center;
              padding-top: 120px;
              padding-bottom: 20px;
              width: 40%;
              p {
                font-size: 20px;
                margin-bottom: 20px;
                text-align: left;
                padding-left: 4px;
                .dot {
                  display: inline-block;
                  width: 8px;
                  height: 8px;
                  border-radius: 50%;
                  background: #333;
                  vertical-align: middle;
                  margin-right: 10px;
                }
              }
            }
          }
        }
      }
    }

    /* 模板5 */
    .poster-item-5 {
      background: url(~@/assets/poster/temp5-bg.jpg) no-repeat;
      background-size: 100% 100%;
      padding-top: 366px;
      .title {
        position: absolute;
        font-size: 26px;
        color: #ffdca0;
        font-weight: bold;
        top: 284px;
        left: 174px;
        right: 30px;
        text-align: justify;
      }
      .img-box-1 {
        margin: 0 auto;
        width: 548px;
        height: 410px;
        border-radius: 32px;
        border: 4px solid #fdcc81;
        background: #fff;
        overflow: hidden;
        .img-box {
          width: 100%;
          height: 100%;
        }
      }
      .footer {
        position: absolute;
        bottom: 0;
        width: 100%;
        padding: 0 30px 42px;
        align-items: flex-end;
        justify-content: center;
        .footer-r {
          text-align: center;
          .code-box {
            width: 150px;
            height: 150px;
            padding: 10px;
            background: #fff;
            border-radius: 8px;
            margin: 0 auto;
            .qrcode {
              width: 100%;
              height: 100%;
            }
          }
          > p {
            font-size: 20px;
            margin-top: 8px;
            color: #ffd284;
          }
        }
      }
    }

    /* 模板6 */
    .poster-item-6 {
      background: url(~@/assets/poster/temp6-bg.jpg) no-repeat;
      background-size: 100% 100%;
      .title {
        font-size: 37px;
        color: #000;
        font-weight: bold;
        text-align: left;
        padding: 50px 40px 0;
        padding-right: 200px;
        font-style: italic;
      }
      .circle-box {
        width: 550px;
        height: 550px;
        background: url(~@/assets/poster/temp6-bg-circle.png) no-repeat;
        background-size: 100% 100%;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-left: -275px;
        margin-top: -275px;
        padding: 18px;
        .img-box-3 {
          width: 514px;
          height: 514px;
          border-radius: 50%;
        }
      }
      .footer {
        position: absolute;
        width: 100%;
        bottom: 0;
        display: flex;
        padding: 0 40px 44px;
        align-items: flex-end;
        .code-box {
          padding: 8px;
          flex: 1;
          text-align: left;
          .qrcode {
            width: 140px;
            height: 140px;
            background: #fff;
            display: inline-block;
          }
          .shopname {
            color: #bfc6c7;
            font-size: 18px;
            display: inline-block;
            padding-left: 10px;
            font-weight: bold;
            img {
              width: 24px;
              height: 24px;
            }
          }
        }
        .footer-r {
          .price {
            background-image: linear-gradient(
              to top,
              #ffb700,
              #ff3800,
              #ff3800,
              #fffddd
            );
            height: 44px;
            line-height: 44px;
            padding: 0 20px;
            border-radius: 21px;
            overflow: hidden;
            font-size: 30px;
            color: #fff;
            font-weight: bold;
          }
          .infos {
            margin-top: 30px;
            margin-bottom: 20px;
            li {
              text-align: right;
              color: #000;
              font-size: 20px;
              font-weight: bold;
            }
          }
        }
      }
    }

    /* 模板7 */
    .poster-item-7 {
      background: url(~@/assets/poster/temp7-bg.jpg) no-repeat;
      background-size: 100% 100%;
      padding-top: 366px;
      .img-box-1 {
        margin: 0 auto;
        width: 548px;
        height: 410px;
        border-radius: 32px;
        border: 4px solid #fdcc81;
        background: #fff;
        overflow: hidden;
        .img-box {
          width: 100%;
          height: 100%;
        }
      }
      .footer {
        position: absolute;
        bottom: 0;
        width: 100%;
        padding: 0 30px 42px;
        align-items: flex-end;
        .footer-l {
          text-align: left;
          flex: 1;
          padding-right: 30px;
          .title {
            font-size: 32px;
            color: #ffd284;
            font-weight: bold;
          }
          .shop-name {
            padding-top: 20px;
            img {
              width: 24px;
              margin-right: 10px;
            }
            p {
              font-size: 17px;
              color: #ffd284;
              font-weight: bold;
              display: inline-block;
            }
          }
        }
        .footer-r {
          text-align: center;
          .code-box {
            width: 150px;
            height: 150px;
            padding: 10px;
            background: #fff;
            border-radius: 8px;
            margin: 0 auto;
            .qrcode {
              width: 100%;
              height: 100%;
            }
          }
          > p {
            font-size: 20px;
            margin-top: 4px;
            color: #ffd284;
          }
        }
      }
    }

    /* 模板8 */
    .poster-item-8 {
      background: url(~@/assets/poster/temp8-bg.jpg) no-repeat;
      background-size: 100% 100%;
      padding-top: 280px;
      .img-main {
        border-radius: 20px;
        margin: 0 30px;
        background-image: linear-gradient(to top, #ff1c49, #ffc5ae, #fff);
        position: relative;
        overflow: hidden;
        height: 560px;
        .img-box-container {
          width: 100%;
          height: 410px;
          position: absolute;
          top: 0;
          left: 0;
          padding: 6px;
          background-image: linear-gradient(to top, #ff6305, #ffdd93);
          border-radius: 18px;
          .img-box {
            border-radius: 18px;
            width: 100%;
            height: 100%;
          }
        }
        .title {
          padding: 0 20px;
          border: 6px solid #fff1c9;
          border-top: 0;
          height: 100%;
          padding-top: 420px;
          border-radius: 20px;
          p {
            font-size: 28px;
            font-style: italic;
            color: #fff;
            font-weight: bold;
            text-align: justify;
            margin-bottom: 10px;
            height: 76px;
            overflow: hidden;
          }
          .local {
            font-size: 18px;
            color: #fff;
            text-align: right;
            display: block;
            img {
              width: 24px;
              vertical-align: middle;
              margin-right: 6px;
            }
          }
        }
      }
      .footer {
        display: flex;
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        padding: 0 50px 40px;
        align-items: flex-end;
        .code-box {
          border: 8px solid #fff;
          background-color: #fff;
          border-radius: 8px;
          .qrcode {
            width: 138px;
            height: 138px;
          }
        }
        .code-info {
          padding-left: 34px;
          text-align: left;
          span {
            font-size: 23px;
            color: #fff;
            font-weight: bold;
            text-shadow: 2px 2px 0px #ff3156, -2px -2px 0px #ff3156;
          }
          .circle {
            font-size: 22px;
            color: #fff;
            height: 52px;
            display: flex;
            align-items: center;
            justify-content: center;
            background-image: linear-gradient(to top, #ff1e4a, #ffc4ae);
            border: 4px solid #fff7c3;
            border-radius: 26px;
            width: 232px;
            margin-top: 20px;
          }
        }
      }
    }

    /* 模板8 */
    .poster-item-9 {
      background: url(~@/assets/poster/temp9-bg.jpg) no-repeat;
      background-size: 100% 100%;
      padding: 270px 30px 0;
      .bianpao {
        position: absolute;
        right: 46px;
        width: 74px;
        top: 0;
        z-index: 100;
      }
      .img-box {
        width: 100%;
        height: 410px;
        border: 3px solid #fdcd83;
        border-radius: 32px;
      }
      .footer {
        align-items: flex-start;
        padding-top: 60px;
        .footer-l {
          .code-box {
            width: 150px;
            height: 150px;
            background: #fff;
            padding: 6px;
            border-radius: 6px 6px 0 0;
            .qrcode {
              width: 100%;
              height: 100%;
            }
          }
          .code-txt {
            font-size: 19px;
            color: #fff;
            background: #c91821;
            line-height: 36px;
            border-radius: 0 0 6px 6px;
          }
        }
        .footer-r {
          flex: 1;
          margin-left: 20px;
          text-align: justify;
          .title {
            font-size: 30px;
            color: #ffd284;
            font-weight: bold;
            margin-bottom: 8px;
          }
          .infos {
            opacity: 0.9;
            li,
            span {
              font-size: 18px;
              color: #ffd284;
              font-weight: bold;
            }
            li {
              margin-top: 10px;
            }
          }
        }
      }
    }
  }
  .templates {
    background: #222222;
    height: 200px;
    padding: 18px 30px 0;
    .templates-box {
      text-align: center;
      overflow-x: auto;
      white-space: nowrap;
      > div {
        position: relative;
        display: inline-block;
        width: 94px;
        height: 162px;
        border: 4px solid #222222;
        &:not(:first-child) {
          margin-left: 32px;
        }
        &.active {
          border: 4px solid #ff7300;
        }
        img {
          width: 100%;
        }
        .temp-cover {
          position: absolute;
          font-size: 22px;
          line-height: 40px;
          color: #fff;
          bottom: 0;
          width: 100%;
          text-align: center;
          background: rgba(0, 0, 0, 0.5);
        }
      }
    }
  }

  .loading-box {
    position: absolute;
    top: 0;
    bottom: 200px;
    width: 100%;
    background: rgba(0, 0, 0, 0.75);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999;
  }
}
</style>