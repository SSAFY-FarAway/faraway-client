import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import attractionStore from "@/store/modules/attractionStore";

const store = new Vuex.Store({
  modules: {
    attractionStore: attractionStore,
  },
});

export default store;
