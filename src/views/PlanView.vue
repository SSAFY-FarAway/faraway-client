<template>
  <div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "PlanView",
  components: {},
  data() {
    return {
      message: "",
    };
  },
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
