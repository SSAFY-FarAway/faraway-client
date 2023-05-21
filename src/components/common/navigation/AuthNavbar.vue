<template>
  <header class="fixed-top bg-white">
    <div class="container">
      <nav id="navbar" class="navbar justify-content-center">
        <div class="logo">
          <h1>
            <router-link to="/"><span>FAR AWAY</span></router-link>
          </h1>
        </div>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  name: "AuthNavbar",
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
.logo {
  overflow: hidden;
  padding: 16px 30px 12px 30px;
}
.logo h1 a {
  text-decoration: none;
  font-size: 26px;
  padding: 0;
  line-height: 1;
  font-weight: 700;
  font-family: "Poppins", sans-serif;
}

.logo h1 a:hover {
  color: var(--sub-color);
}
</style>
