<template>
  <router-link
    type="button"
    class="btn btn-primary btn text-uppercase"
    :to="path"
    >{{ btnName }}
  </router-link>
</template>

<script>
export default {
  name: "writeBtn",
  props: {
    btnName: String,
    path: String,
  },
};
</script>
