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
  </b-card>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "AttractionSearchResultItem",
  components: {},
  props: {
    attraction: Object,
  },
  data() {
    return {
      message: "",
    };
  },
  created() {},
  methods: {
    ...mapActions("attractionStore", ["setAttraction"]),
    selectAttraction() {
      this.setAttraction(this.attraction);
    },
  },
};
</script>

<style scoped></style>
