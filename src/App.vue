<template>
  <div id="app">
    <nav-bar/>
    <router-view/>
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
</style>
