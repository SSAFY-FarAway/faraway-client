<template>
  <header id="nav-container" class="fixed-top">
    <div class="container">
        <nav id="navbar" class="navbar">
          <div class="logo">
            <h1>
              <router-link to="/"><span>FAR AWAY</span></router-link>
            </h1>
          </div>
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
                    to="/member/register"
                    >Register</router-link
                  >
                </li>
              </ul>
            </li>
          </ul>
        </nav>
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
