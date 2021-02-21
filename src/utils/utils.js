import { Notify } from 'vant';
import store from '@/store'
export const imgToBase64 = (url, callback) => {
  // debugger
  var Img = document.createElement('img');
  var dataURL = "";
  Img.setAttribute('crossOrigin', 'Anonymous')
  Img.crossOrigin = "anonymous";
  Img.src = url;
  Img.onload = function () {
    //要先确保图片完整获取到，这是个异步事件
    var canvas = document.createElement("canvas") //创建canvas元素
    var width = Img.width //确保canvas的尺寸和图片一样
    var height = Img.height
    canvas.width = width
    canvas.height = height
    canvas.getContext("2d").drawImage(Img, 0, 0, width, height); //将图片绘制到canvas中
    dataURL = canvas.toDataURL("image/jpg"); //转换图片为dataURL
    callback(dataURL);
  };
}

// 根据设计图 获取实际尺寸
export const getPX = (design, designWidth = 750) => { // 750为设计稿宽度
  // 获取窗口尺寸
  let width = document.documentElement.getBoundingClientRect().width
  // 计算缩放比例
  let scale = width / designWidth
  // 获取实时尺寸
  return design * scale
}


// js 调用原生APP的 方法 并传递参数
export const jsUseOcFunction = (functionName, params = {}) => {
  try {
    var u = navigator.userAgent,
      app = navigator.appVersion;
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    if (isiOS) {
      window.webkit.messageHandlers[functionName].postMessage(params);
    } else {
      if(JSON.stringify(params) == '{}'){
        window.Android[functionName]()
      }else{
        window.Android[functionName](JSON.stringify(params))
      }
    }
  } catch (error) {
    
  }
}

// 调整页面 带入相应参数
export const jumpPage = (router, to = {query:{}} ) => {
  if(!to.query) to.query={};
  // dId: 车商id sId: 员工id
  to.query = filterParams(Object.assign(to.query,{dId:store.state.dId,sId:store.state.sId,mId:store.state.mId,city: store.state.cityCode}));
  try {
    if(JSON.stringify(store.state.dealerInfo) == '{}' && !store.state.isMidShop){
      store.dispatch('getDealerInfo',{dealerId:store.state.dId,employeeId:store.state.sId})
    }else if(JSON.stringify(store.state.midShopInfo) == '{}' && store.state.isMidShop){
      store.dispatch('getMidShopInfo',{salesmanId:store.state.sId})
    }
  } catch (error) {
    
  }
  router.push(to)
}

// 清除 object 中的空值
export function filterParams(params){
  let obj = {}
  for(let key in params){
    if (params[key]!=undefined  && params[key] !== '' && params[key] != null) {
      obj[key] = params[key]
    }
  }
  return obj
}


//     * 创建新的URL 对象表示指定的 File 对象或 Blob 对象。
//  * @param {string} dataURL  base64
//  */
export const dataURL2ObjUrl = (dataURL) => {
  window.URL = window.URL || window.webkitURL
  if (window.URL && URL.createObjectURL) {
    // dataURL2blob 此方法需额外定义
    var blob = dataURL2blob(dataURL)
    return URL.createObjectURL(blob)
  }
  return dataURL
}

/* 将Base64转换为Blob对象，blob的兼容性相对File会更好一些
* dataURL 转成 blob
* @param dataURL
* @return blob
*/
function dataURL2blob(dataURL) {
  let binaryString = window.atob(dataURL.split(',')[1]);
  let arrayBuffer = new ArrayBuffer(binaryString.length);
  let intArray = new Uint8Array(arrayBuffer);
  let mime = dataURL.split(',')[0].match(/:(.*?);/)[1]
  for (let i = 0, j = binaryString.length; i < j; i++) {
      intArray[i] = binaryString.charCodeAt(i);
  }
  let data = [intArray];
  let result;
  try {
      result = new Blob(data, { type: mime });
  } catch (error) {
      window.BlobBuilder = window.BlobBuilder ||
          window.WebKitBlobBuilder ||
          window.MozBlobBuilder ||
          window.MSBlobBuilder;
      if (error.name === 'TypeError' && window.BlobBuilder) {
          var builder = new BlobBuilder();
          builder.append(arrayBuffer);
          result = builder.getBlob(type);
      } else {
          throw new Error('没救了');
      }
  }
  return result;
}