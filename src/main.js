import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import MetaInfo from 'vue-meta-info';
import 'vant/lib/index.css';
import 'amfe-flexible/index.js'
import AlloyFinger from 'alloyfinger'
import AlloyFingerPlugin from 'alloyfinger/vue/alloy_finger_vue'
import VConsole from 'vconsole'
import {
  Lazyload,
  Button,
  Divider,
  Icon,
  Empty,
  Loading
} from 'vant'

Vue.config.productionTip = false
Vue.use(MetaInfo)
  .use(AlloyFingerPlugin, {
    AlloyFinger
  })
  .use(Lazyload, {
    error: require('./assets/nodata.png'),
    loading: require('./assets/loading.gif'),
    attempt: 3,
    preload: 1.33
  })
  .use(Button)
  .use(Divider)
  .use(Icon)
  .use(Empty)
  .use(Loading)

// 初始化数据
initData();
function initData() {
  // 获取url 传参
  let sId = getQueryString("sId"); // 员工id
  let dId = getQueryString("dId"); // 车商id
  let mId = getQueryString("mId"); // 线下店id
  let cityCode = getQueryString("city"); // 城市code
  if (sId && (dId || mId)) {
    store.commit("SET_SID", sId);
    // 车商分享
    if (dId) {
      store.commit("SET_DID", dId);
      store.dispatch('getDealerInfo', {
        employeeId: sId,
        dealerId: dId
      });
    } else {
      store.commit("SET_MID", mId);
      store.commit("SET_CITY_CODE", cityCode);
      // 线下店分享
      store.dispatch('getMidShopInfo', {
        salesmanId: sId
      });
    }
  };
}

// 获取url参数
function getQueryString(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  let search = window.location.hash.split('?'),
    r = null;
  if (name == "code") {
    search = window.location.search.split('?');
  }
  if (search.length > 1) {
    r = ('?' + search[1]).substr(1).match(reg);
  }
  if (r != null) {
    return decodeURIComponent(r[2]);
  }
  return null;
}

/* 如果是PC端，设置html的样式，防止postcss-pxtorem自适应造成过大的问题 */
windoeResize();
window.onresize = windoeResize;
function windoeResize() {
  // console.log(document.documentElement.clientWidth);
  let windowWidth = document.documentElement.clientWidth;
  if (windowWidth > 1024) {
    Vue.$nextTick(()=>{
      document.getElementsByTagName('html')[0].style.fontSize = '37.5px !important';
    })
  }
}

// 移动端调试工具

process.env.NODE_ENV === 'development' && new VConsole()
// new VConsole()

// 过滤器
import * as myFilter from '@/utils/filter'
Object.keys(myFilter).forEach(key => {
  Vue.filter(key, myFilter[key])
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')