<template>
  <div id="app">
    <the-navbar />
    <router-view id="app-router" />
    <the-footer />
  </div>
</template>

<script>
import TheNavbar from "@/components/common/TheNavbar";
import TheFooter from "@/components/common/TheFooter";

export default {
  name: "App",
  components: {
    TheNavbar,
    TheFooter,
  },
};
</script>

<style>
@import "@/assets/css/style.css";

#app-router {
  min-height: 100vh;
  padding-top: 80px;
}

@media (max-width: 992px) {
  #app-router {
    padding-top: 60px;
  }
}
</style>
