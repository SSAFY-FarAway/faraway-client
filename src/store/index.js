import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loginMember: null,
  },
  getters: {
    getLoginMember() {
      return this.loginMember;
    },
  },
  mutations: {},
  actions: {},
  modules: {},
});
