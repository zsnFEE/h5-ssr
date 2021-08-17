import * as types from "../mutation-types.js";
export default {
  namespaced: true,
  state: {
    userInfo: {}
  },
  getters: {},
  actions: {
    // async getLoginInfoFun({ commit }, opts) {
    // const res = await login(opts);
    // if (!res.code) {
    //   commit(types.GET_USER_INFO, res.data);
    // } else {
    //   commit(types.GET_USER_INFO, res);
    // }
    // },
    //设置用户信息
    setUserInfo({ commit }, opts) {
      commit(types.SET_URSER_INFO, opts);
    }
  },
  mutations: {
    [types.SET_URSER_INFO](state, data) {
      state.userInfo = data;
    }
  }
};
