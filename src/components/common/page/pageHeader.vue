<template>
  <div>
    <div class="text-center fw-bold" role="alert">
      <h2 class="row d-flex justify-content-around my-4 text-uppercase">
        {{ title }}
      </h2>
      <h5 class="section-subheading text-muted">{{ subTitle }}</h5>
    </div>
  </div>
</template>
<script>
export default {
  name: "pageHeader",
  props: {
    title: String,
    subTitle: String,
  },
  components: {},
  data() {
    return {};
  },
  created() {},
  methods: {},
};
</script>

<style scoped></style>
