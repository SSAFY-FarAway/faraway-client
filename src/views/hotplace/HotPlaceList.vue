<template>
  <div class="container">
    <!-- Header -->
    <page-header
      title="hot place"
      subTitle="여행지의 핫플레이스를 공유해보세요."
    />

    <!-- 검색 메뉴 -->
    <div class="p-0 pb-1 m-0 col-12 row justify-content-between">
      <write-btn path="/hot-place/write" btnName="write hotplace" />
      <form class="d-flex">
        <b-form-select class="col-md-4" v-model="selected" :options="options" />
        <input
          type="text"
          class="form-control ml-1"
          v-model="keyword"
          placeholder="검색어 입력"
        />
        <button type="button" class="btn btn-secondary ml-1 text-uppercase" @click="search">
          Search
        </button>
      </form>
    </div>
    <!-- 핫플레이스 List - 테이블 -->
    <table class="table table-hover shadow rounded" id="plan-table">
      <thead>
        <table-row-header :titles="titles" />
      </thead>
      <tbody v-for="hotPlace in hotPlaces" :key="hotPlace.id">
        <img style="max-width: 100%" :src="'http://localhost/image/download/' + hotPlace.thumbnailId"  alt=""/>
        <table-row-data :data="hotPlace" :titles="titles" domain="hot-place" />
      </tbody>
    </table>
    <!-- 페이지네이션 -->
    <page-navigation :totalPages="pageTotalCnt" />
  </div>
</template>

<script>
import pageHeader from "@/components/common/page/pageHeader";
import tableRowHeader from "@/components/common/page/tableRowHeader";
import tableRowData from "@/components/common/page/tableRowData";
import writeBtn from "@/components/common/page/writeBtn";
import http from "@/utils/api/http";
import PageNavigation from "@/components/common/page/pageNavigation.vue";

export default {
  name: "HotPlaceList",
  components: {
    PageNavigation,
    pageHeader,
    writeBtn,
    tableRowHeader,
    tableRowData,
  },
  data() {
    return {
      selected: null,
      keyword: "",
      options: [
        { value: null, text: "검색 조건" },
        { value: "title", text: "제목" },
        { value: "content", text: "내용" },
      ],
      titles: [
        { title: "No", colSize: 1, colName: "id" },
        { title: "제목", colSize: 3, colName: "title" },
        { title: "작성자", colSize: 2, colName: "loginId" },
        { title: "주소", colSize: 2, colName: "mainAddress" },
        { title: "평점", colSize: 1, colName: "rating" },
        { title: "조회수", colSize: 1, colName: "hit" },
        { title: "작성일", colSize: 2, colName: "createdDate" },
      ],
      hotPlaces: [],
      pageTotalCnt: 0,
    };
  },
  created() {
    this.getHotPlaces();
  },
  watch: {
    "$route.fullPath"() {
      this.getHotPlaces();
    }
  },
  methods: {
    getHotPlaces() {
      const pageNumber = this.isEmpty(this.$route.query.pageNumber);
      const title = this.isEmpty(this.$route.query.title);
      const content = this.isEmpty(this.$route.query.content);
      let url = `/hot-place?title=${title}&content=${content}&pageNumber=${pageNumber}`;
      http.get(url)
          .then((res) => {
            if (res.status === 200) {
              console.log(res);
              this.hotPlaces = res.data.data;
              this.pageTotalCnt = res.data.pageTotalCnt;
            }
          })
          .catch(() => {
            this.$alertDanger("오류 발생", "추후 예외처리 추가 예정");
          });
    },
    search() {
      let url = `/hot-place?${this.selected}=${this.keyword}`;
      this.$router.push(url).catch(() => {
        this.getHotPlaces();
      })
    },
    isEmpty(value) {
      return value || "";
    }
  },
};
</script>

<style scoped>
#search-select-box {
  width: 200px;
}
</style>
