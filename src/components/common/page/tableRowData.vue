<template>
  <tr class="text-center" @click="moveDetail">
    <td v-for="title in titles" :key="title.title">
      {{ post[title.colName] }}
    </td>
  </tr>
</template>

<script>
export default {
  name: "PostTableRow",
  components: {},
  props: {
    titles: Array,
    post: Object,
    domain: String,
  },
  methods: {
    moveDetail() {
      this.$router.push(`/${this.domain}/view/${this.post.id}`);
    },
  },
};
</script>

<style scoped></style>
