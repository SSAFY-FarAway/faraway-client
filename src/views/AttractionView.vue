<template>
  <router-view/>
</template>

<script>
export default {
  name: "AttractionView",
  components: {
    
  },
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
