<template>
  <nav aria-label="Page navigation">
    <ul class="pagination justify-content-center">
      <li class="page-item">
        <a class="page-link" href="#" aria-label="Previous">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <!-- TODO : 토탈 카운트(totalCnt)에 따라서 개수 보여주기 -->
      <li class="page-item"><a class="page-link" @click="movePage">1</a></li>
      <li class="page-item"><a class="page-link" @click="movePage">2</a></li>
      <li class="page-item"><a class="page-link" @click="movePage">3</a></li>
      <li class="page-item">
        <a class="page-link" href="#" aria-label="Next">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "HotPlacePagination",
  components: {},
  props: {
    totalCnt: Number,
  },
  created() {

  },
  methods: {
    movePage(e) {
      this.$router.push(`$this.$route.path)?page=${e.target.text}`);
    },
  },
};
</script>

<style scoped>

</style>