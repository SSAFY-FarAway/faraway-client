<template>
  <nav aria-label="Page navigation">
    <ul class="pagination justify-content-center">
      <li class="page-item">
        <a class="page-link" @click="prevPage" aria-label="Previous">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <!-- TODO : 토탈 카운트(totalCnt)에 따라서 개수 보여주기 -->
      <li v-for="page in visiblePages" :key="page" class="page-item">
        <a class="page-link" @click="movePage(page)">{{ page }}</a>
      </li>
      <li class="page-item">
        <a class="page-link" @click="nextPage" aria-label="Next">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
    name: "pageNavigation",
    components: {},
    props: {
        totalPages: Number,
    },
    data() {
        return {
            currentPage: 1,
            pageSize: 5,
        };
    },
    created() {
        const pageNumber = this.$route.query.pageNumber;
        this.currentPage = pageNumber ? parseInt(pageNumber[0], 10) || 1 : 1;
    },
    watch: {
        "$route.query.pageNumber"(newValue) {
            this.currentPage = parseInt(newValue) || 1;
        },
    },
    methods: {
        movePage(page) {
            this.currentPage = page;
            this.search(page);
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        },
        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.movePage(this.currentPage + 1);
            } else {
                this.$alertDanger("이동불가", "마지막 페이지입니다.");
            }
        },
        prevPage() {
            if (this.currentPage > 1) {
                this.movePage(this.currentPage - 1);
            } else {
                this.$alertDanger("이동불가", "시작 페이지입니다.");
            }
        },
        search(page) {
            this.$emit(`search`, page);
        }
    },
    computed: {
        visiblePages() {
            const halfPageSize = Math.floor((this.pageSize - 1) / 2);
            let startPage = Math.max(1, this.currentPage - halfPageSize);
            let endPage = Math.min(this.totalPages, startPage + this.pageSize - 1);

            if (endPage - startPage + 1 < this.pageSize) {
                startPage = Math.max(1, endPage - this.pageSize + 1);
            }

            return Array.from({length: endPage - startPage + 1}, (_, index) => startPage + index);
        },
    }
};
</script>

<style scoped></style>
