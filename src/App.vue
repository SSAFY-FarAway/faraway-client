<template>
  <div id="app">
    <nav-bar/>
    <router-view id='app-router'/>
  </div>
</template>

<script>
import NavBar from "@/components/common/NavBar"

export default ({
  name: "App",
  components: {
    NavBar,
  }
})
</script>

<style>
@import "@/assets/css/style.css";

#app-router {
  padding-top: 80px;
}

@media (max-width: 992px) {
  #app-router {
    padding-top: 60px;
  }
}
</style>
