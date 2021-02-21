import fetch from '@/api/http'
import { agentUrl, dealerUrl, salesmanUrl } from '@/api/url.js'


// 经纪人 - 获取短网址
export const getShortUrl = (query) => {
  return fetch.post(agentUrl + '/s/url/generate', query)
}
// 经纪人 - 初始化微信SDK
export const getJssdkSignature = (query) => {
  return fetch.post(agentUrl + '/agentUser/getJssdkSignature', query)
}

// 经纪人 - 车商信息
export const getDealerInfo = (query) => {
  return fetch.post(agentUrl + '/api/dealer/getDealerInfo', query)
}

// 经纪人 - 获取车辆列表
export const getSellListCars = (query) => {
  return fetch.post(agentUrl + '/api/car/sell/listCars', query)
}
// 获取车源详情
export const getSellCarDetail = (query) => {
  return fetch.post(agentUrl + '/api/car/sell/detail', query)
}


/* 线下店分享接口 */
// 经纪人 - 线下店分享 - 获取线下店信息
export const teamMemberInfo = (query) => {
  return fetch.post(agentUrl + '/api/midShop/teamMemberInfo', query)
}