const attractionStore = {
  namespaced: true,
  state: {
    attractions: [],
    selectedAttraction: null,
  },
  getters: {},
  mutations: {
    SET_ATTRACTIONS(state, attractions) {
      state.attractions = [...attractions];
    },
    SET_SELECTED_ATTRACTION(state, attraction) {
      state.selectedAttraction = attraction;
    },
  },
  actions: {
    setAttraction({ commit }, payload) {
      commit("SET_SELECTED_ATTRACTION", payload);
    },
    setAttractions({ commit }, payload) {
      commit("SET_ATTRACTIONS", payload);
    },
  },
};

export default attractionStore;
