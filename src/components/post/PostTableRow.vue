<template>
  <tr class="text-center" @click='moveDetail'>
    <th scope="row">{{post.id}}</th>
    <td>{{post.title}}</td>
    <td>{{post.categoryName}}</td>
    <td>{{post.loginId}}</td>
    <td>{{post.hit}}</td>
    <td>{{post.createdDate | timeFilter}}</td>
  </tr>
</template>

<script>
export default {
  name: "PostTableRow",
  components: {},
  props: {
    post: Object
  },
  methods: {
    moveDetail() {
      this.$router.push(`/post/view/${this.post.id}`);
    }
  }
}
</script>

<style scoped>

</style>