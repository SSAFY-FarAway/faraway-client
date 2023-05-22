import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

import attractionStore from "@/store/modules/attractionStore";
import memberStore from "@/store/modules/memberStore";

const store = new Vuex.Store({
  modules: {
    attractionStore: attractionStore,
    memberStore: memberStore,
  },
  plugins: [
    createPersistedState({
      paths: ["memberStore"],
      storage: sessionStorage,
    }),
  ],
});

export default store;
