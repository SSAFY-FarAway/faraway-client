const attractionStore = {
  namespaced: true,
  state: {
    attractions: [],
    selectedAttraction: null,
    // 글 작성 시
    pickedAttractions: [],
  },
  getters: {},
  mutations: {
    SET_ATTRACTIONS(state, attractions) {
      state.attractions = [...attractions];
    },
    SET_SELECTED_ATTRACTION(state, attraction) {
      state.selectedAttraction = attraction;
    },
    ADD_PICKED_ATTRACTION(state, attraction) {
      state.pickedAttractions.push(attraction);
    },
    REMOVE_PICKED_ATTRACTION(state, attraction) {
      const idx = state.pickedAttractions.findIndex(attraction.contentId);
      if (idx != -1) {
        state.pickedAttractions.splice(idx, 1);
      }
    },
  },
  actions: {
    setAttractions({ commit }, payload) {
      commit("SET_ATTRACTIONS", payload);
    },
    setAttraction({ commit }, payload) {
      commit("SET_SELECTED_ATTRACTION", payload);
    },
    addPickedAttraction({ commit }, payload) {
      commit("ADD_PICKED_ATTRACTION", payload);
    },
    removePickedAttraction({ commit }, payload) {
      commit("REMOVE_PICKED_ATTRACTION", payload);
    },
  },
};

export default attractionStore;
