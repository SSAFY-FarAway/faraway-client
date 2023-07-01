<template>
  <div>
    <router-view />
  </div>
</template>

<script>
import { RouterView } from "vue-router";

export default {
  name: "MemberView",
  components: {RouterView},
  data() {
    return {
      message: "",
    };
  },
  created() { },
  mounted() {
    this.$toTop();
  },
  updated() {
    this.$toTop();
  },
  methods: {},
};
</script>

<style scoped></style>
