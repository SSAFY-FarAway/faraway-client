<template>
  <tr class="text-center table-warning">
    <th
      v-for="title in titles"
      :key="title.title"
      :class="'col-' + title.colSize"
    >
      {{ title.title }}
    </th>
  </tr>
</template>

<script>
export default {
  name: "tableRowHeader",
  props: {
    titles: Array,
  },
};
</script>
