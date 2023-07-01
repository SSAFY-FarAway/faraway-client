<template>
  <router-view />
</template>

<script>
import { RouterView } from "vue-router";

export default {
  name: "HomeView",
  components: { RouterView },
  mounted() {
    this.$toTop();
  },
  updated() {
    this.$toTop();
  },
};
</script>

<style>
.home {
  height: 130vh;
}
</style>
