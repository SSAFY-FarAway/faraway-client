<template>
  <div id="app">
    <auth-navbar v-if="inAuthUrl" />
    <the-navbar v-else/>
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
    }
  },
  watch: {
    '$route.path'(value) {
      this.inAuthUrl = (value.includes("login") || value.includes("sign-up")) ? true : false;
    }
  }
};
</script>

<style>
@import "@/assets/css/style.css";



</style>
