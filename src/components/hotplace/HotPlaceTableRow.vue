<template>
  <tr class="text-center" @click='moveDetail'>
    <th scope="row">{{hotPlace.id}}</th>
    <td>{{hotPlace.title}}</td>
    <td>{{hotPlace.loginId}}</td>
    <td>{{hotPlace.hit}}</td>
    <td>{{hotPlace.mainAddress}}</td>
    <td>{{hotPlace.rating}}</td>
    <td>{{hotPlace.createdDate | timeFilter}}</td>
  </tr>
</template>

<script>
export default {
  name: "HotPlaceTableRow",
  components: {},
  props: {
    hotPlace: Object
  },
  methods: {
    moveDetail() {
      this.$router.push(`/hot-place/view/${this.hotPlace.id}`);
    }
  }
}
</script>

<style scoped>

</style>