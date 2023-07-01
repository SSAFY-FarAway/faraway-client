<template>
  <div class="text-center">
    <h2 class="my-4 text-uppercase">
      {{ title }}
    </h2>
    <h5 class="text-muted">{{ subTitle }}</h5>
  </div>
</template>

<script>
export default {
  name: "pageHeader",
  props: {
    title: String,
    subTitle: String,
  },
};
</script>
