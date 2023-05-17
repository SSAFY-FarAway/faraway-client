<template>
  <div id="app">
    <auth-navbar v-if="inAuthUrl" />
    <the-navbar v-else />
    <router-view id="app-router" />
    <the-footer />
  </div>
</template>

<script>
import AuthNavbar from "@/components/common/AuthNavbar";
import TheNavbar from "@/components/common/TheNavbar";
import TheFooter from "@/components/common/TheFooter";

export default {
  name: "App",
  components: {
    AuthNavbar,
    TheNavbar,
    TheFooter,
  },
  data() {
    return {
      inAuthUrl: false,
    };
  },
  methods: {
    urlCheck(value) {
      this.inAuthUrl =
        value.includes("login") || value.includes("register") ? true : false;
    },
  },
  watch: {
    "$route.path"(value) {
      this.urlCheck(value);
    },
  },
  created() {
    this.urlCheck(this.$route.path);
  },
};
</script>

<style>
@import "@/assets/css/style.css";
@import "@/assets/css/kakao_map.css";
</style>
