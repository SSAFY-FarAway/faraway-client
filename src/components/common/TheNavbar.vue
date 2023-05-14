<template>
  <header id="header" class="fixed-top d-flex align-items-center">
    <div class="container">
      <div
        class="header-container d-flex align-items-center justify-content-between"
      >
        <div class="logo">
          <h1 class="text-light">
            <router-link to="/"><span>FAR AWAY</span></router-link>
          </h1>
        </div>

        <nav id="navbar" class="navbar">
          <ul>
            <li>
              <router-link class="nav-link scrollto" to="/attraction"
                >Search Place</router-link
              >
            </li>
            <li>
              <router-link class="nav-link scrollto" to="/plan"
                >Plan</router-link
              >
            </li>
            <li>
              <router-link class="nav-link scrollto" to="/hotplace"
                >HotPlace</router-link
              >
            </li>
            <li>
              <router-link class="nav-link scrollto" to="/post"
                >Community</router-link
              >
            </li>
            <li class="dropdown">
              <router-link to="/member">
                <span>LOGIN</span>
                <i class="bi bi-chevron-down"></i>
              </router-link>
              <ul>
                <li>
                  <router-link
                    class="nav-link scrollto nav-link-item"
                    to="/member"
                    >LOGIN</router-link
                  >
                </li>
                <li>
                  <router-link
                    class="nav-link scrollto nav-link-item"
                    to="/member"
                    >SIGN UP</router-link
                  >
                </li>
              </ul>
            </li>
            <li>
              <div style="width: 20px"></div>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "TheNavbar",
  components: {},
  data() {
    return {
      message: "",
    };
  },
  created() {},
  methods: {},
};
</script>

<style scoped>
@import "@/assets/css/style.css";
</style>
