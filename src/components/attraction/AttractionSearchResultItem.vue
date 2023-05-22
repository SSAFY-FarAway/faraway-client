<template>
  <!-- TODO : img 디폴트 이미지 추가할 것. -->
  <b-card
    :title="attraction.title"
    :img-src="attraction.firstImage"
    img-alt="Image"
    img-top
    tag="article"
    style="max-width: 20rem"
    class="mb-1"
    @click="selectAttraction"
  >
    <b-card-text>
      {{ attraction.addr1 }}
    </b-card-text>
    <button
      class="btn btn-primary"
      v-if="domain === 'plan'"
      @click="addMyPath(attraction)"
    >
      내 경로에 추가하기
    </button>
  </b-card>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "AttractionSearchResultItem",
  components: {},
  props: {
    attraction: Object,
    domain: String,
  },
  data() {
    return {};
  },
  created() {},
  methods: {
    ...mapActions("attractionStore", ["setAttraction"]),
    ...mapActions("planStore", ["addPlan"]),
    selectAttraction() {
      this.setAttraction(this.attraction);
    },
    addMyPath(attraction) {
      this.addPlan(attraction);
    },
  },
};
</script>

<style scoped></style>
