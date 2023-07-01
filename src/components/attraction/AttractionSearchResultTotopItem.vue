<template>
  <!-- TODO : toTop 정상 기능하도록 수정할 것. -->
  <div @click="$emit('toTop')">
    <b-card tag="article" style="max-width: 20rem" class="mb-1">
      <b-icon
        style="width: 100%; height: 35px; color: var(--main-color)"
        icon="arrow-bar-up"
      />
    </b-card>
  </div>
</template>

<script>
import { BIcon } from "bootstrap-vue";

export default {
  name: "AttractionSearchResultTotopItem",
  components: { BIcon },
  props: {
    attraction: Object,
    searchResultEle: Object,
  },
  data() {
    return {
      message: "",
    };
  },
  created() {},
  methods: {},
};
</script>

<style scoped></style>
