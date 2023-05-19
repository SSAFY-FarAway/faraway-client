const memberStore = {
  namespaced: true,
  state: {
    isLogin: false,
    loginMember: null,
  },
  gatters: {},
  mutations: {
    SET_IS_LOGIN(state, isLogin) {
      state.isLogin = isLogin;
    },
    SET_LOGIN_MEMBER(state, member) {
      state.loginMember = member;
    },
  },
  actions: {
    setIsLogin({ commit }, payload) {
      if (payload) {
        commit("SET_IS_LOGIN", true);
      } else {
        commit("SET_IS_LOGIN", false);
        commit("SET_LOGIN_MEMBER", null);
      }
    },
    setLoginMember({ commit }, payload) {
      commit("SET_LOGIN_MEMBER", payload);
    },
  },
};

export default memberStore;
