const attractionStore = {
  namespaced: true,
  state: {
    attractions: [],
    selectedAttraction: null,
  },
  getters: {},
  mutations: {
    UPDATE_ATTRACTIONS(state, attractions) {
      state.attractions = [...attractions];
    },
    UPDATE_SELECTED_ATTRACTION(state, attraction) {
      state.selectedAttraction = attraction;
    },
  },
  actions: {
    updateAttraction({ commit }, payload) {
      commit("UPDATE_SELECTED_ATTRACTION", payload);
    },
    updateAttractions({ commit }, payload) {
      commit("UPDATE_ATTRACTIONS", payload);
    },
  },
};

export default attractionStore;
