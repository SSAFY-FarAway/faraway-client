const planStore = {
  namespaced: true,
  state: {
    myPlan: [],
  },
  getters: {
    getContentIds(state) {
      const contentIds = [];
      state.myPlan.forEach((el) => {
        contentIds.push(el.contentId);
      });
      return contentIds;
    },
    getMarkers(state) {
      const markers = [];
      state.myPlan.forEach((el) => {
        markers.push(el.marker);
      });
      return markers;
    },
  },
  mutations: {
    ADD_PLAN(state, plan) {
      state.myPlan.push(plan);
    },
    REMOVE_PLAN(state, plan) {
      const idx = state.myPlan.findIndex(
        (el) => el.contentId === plan.contentId
      );
      if (idx != -1) {
        state.myPlan.splice(idx, 1);
      }
    },
  },
  actions: {
    addPlan({ commit }, payload) {
      commit("ADD_PLAN", payload);
    },
    removePlan({ commit }, payload) {
      commit("REMOVE_PLAN", payload);
    },
  },
};

export default planStore;
