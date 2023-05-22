<template>
  <tr id="table-row" class="text-center" @click="moveDetail">
    <td v-for="title in titles" :key="title.title">
      {{
        title.colName === "createdDate"
          ? $options.filters.timeFilter(data[title.colName])
          : data[title.colName]
      }}
    </td>
  </tr>
</template>

<script>
export default {
  name: "tableRowData",
  components: {},
  props: {
    titles: Array,
    data: Object,
    domain: String,
  },
  methods: {
    moveDetail() {
      this.$router.push(`/${this.domain}/${this.data.id}`);
    },
  },
};
</script>

<style scoped>
#table-row td{ 
  max-height: 50.5px;
}
</style>
