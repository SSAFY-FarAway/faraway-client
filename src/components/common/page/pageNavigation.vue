<template>
  <nav aria-label="Page navigation">
    <ul class="pagination justify-content-center">
      <li class="page-item">
        <a class="page-link" href="#" aria-label="Previous">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <!-- TODO : 토탈 카운트(totalCnt)에 따라서 개수 보여주기 -->
      <li v-for="cnt in totalCnt" :key="cnt" class="page-item">
        <a class="page-link" @click="movePage">{{ cnt }}</a>
      </li>
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
  name: "PlanPagination",
  components: {},
  props: {
    totalCnt: Number,
  },
  data() {
    return {};
  },
  created() {},
  methods: {
    movePage(e) {
      const categoryId = this.$route.query.categoryId;
      this.$router
        .push(
          `${this.$route.path}?categoryId=${categoryId}&pageNumber=${e.target.text}`
        )
        .catch(() => {});

      // 스크롤 toTop
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
  },
};
</script>

<style scoped></style>
