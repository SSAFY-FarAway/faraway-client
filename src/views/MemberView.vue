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
  created() {},
  methods: {},
};
</script>

<style scoped></style>
