<template>
  <div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "HotPlaceView",
  components: {},
  data() {
    return {
      message: "",
    };
  },
  created() { },
  mounted() {
    this.$toTop();
  },
  updated() {
    this.$toTop();
  },
  methods: {},
};
</script>

<style scoped></style>
