import Vue from 'vue'
import Vuex from 'vuex'
import { getDealerInfo, teamMemberInfo } from 'api'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    dId: '',
    sId: '',
    mId: '',
    dealerInfo: {},
    employeeInfo: {},
    midShopInfo: {},
    cityCode: '',
    isMidShop: false,
  },
  mutations: {
    SET_DID: (state, id) => {
      state.dId = id
      state.isMidShop = false
    },
    SET_SID: (state, id) => {
      state.sId = id
    },
    SET_MID: (state, id) => {
      state.mId = id
      state.isMidShop = true
    },
    SET_DEALER_INFO: (state, info) => {
      state.dealerInfo = info
    },
    SET_EMPLOYEE_INFO: (state, info) => {
      state.employeeInfo = info
    },
    SET_MID_SHOP_INFO: (state, info) => {
      state.midShopInfo = info
    },
    SET_CITY_CODE: (state, cityCode ) => {
      state.cityCode = cityCode
    },
  },
  actions: {
    // 获取车商信息
    getDealerInfo({ commit, state }, params) {
      return new Promise((resolve, reject) => {
        getDealerInfo(params).then(async res => {
          if (res.code == 0) {
            commit('SET_DEALER_INFO', res.data.dealer);
            commit('SET_EMPLOYEE_INFO', res.data.employeeVO);
          }
        }).catch(() => {

        })
      })
    },
    // 线下店信息
    getMidShopInfo({ commit, state }, params) {
      return new Promise((resolve, reject) => {
        teamMemberInfo(params).then(async res => {
          if (res.code == 0) {
            let {name,account,phone,sex,teamName,teamId,duty} = res.data;
            commit('SET_MID_SHOP_INFO', res.data.midShopSimpleVO);
            commit('SET_EMPLOYEE_INFO', {
              realName: name,
              mobile: phone || account,
              headImage: res.data.headImage?res.data.headImage.headImage:'',
              position: duty
            });
          }
        }).catch(() => {

        })
      })
    },
  },
  modules: {
  }
})
