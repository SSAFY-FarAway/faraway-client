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
import { mapState } from 'vuex';

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
  computed: {
    ...mapState("memberStore",['isLogin'])
  },
  methods: {
    urlCheck(value) {
      this.inAuthUrl =
        value.includes("login") || value.includes("register") ? true : false;
    },
    loginCheck() {
      console.log(this.isLogin)
      console.log("login?")
    },
    
  },
  watch: {
    "$route.path"(value) {
      this.urlCheck(value);
    },
  },
  created() {
    this.urlCheck(this.$route.path);
    this.loginCheck()
  },

  
};
</script>

<style>
@import "@/assets/css/style.css";
@import "@/assets/css/kakao_map.css";
</style>
