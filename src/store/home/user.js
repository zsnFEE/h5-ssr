// import * as types from "../mutation-types";

// export default {
//   namespaced: true,
//   state: {
//     userInfo: {}
//   },
//   getters: {},
//   actions: {
//     //设置用户信息
//     setUserInfo({ commit }, opts) {
//       commit(types.SET_URSER_INFO, opts);
//     }
//   },
//   mutations: {
//     [types.SET_URSER_INFO](state, data) {
//       state.userInfo = data;
//     }
//   }
// };
const actions = {};
const getters = {};
export default {
  namespace: true,
  state,
  mutations,
  actions,
  getters
};
export const state = () => ({
  userInfo: {}
});
export const mutations = {
  increment(state, data) {
    state.userInfo = data;
  }
};
