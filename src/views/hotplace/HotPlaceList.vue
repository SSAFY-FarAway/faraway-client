<template>
  <div class="container">
    <!-- Header -->
    <page-header
      title="hot place"
      subTitle="여행지의 핫플레이스를 공유해보세요."
    />

    <!-- 검색 메뉴 -->
    <div class="p-0 pb-1 m-0 col-12 row justify-content-between">
      <write-btn path="/plan/write" btnName="write post" />
      <form class="d-flex">
        <b-form-select class="col-md-4" v-model="selected" :options="options" />
        <input
          type="text"
          class="form-control ml-1"
          placeholder="검색어 입력"
        />
        <button type="button" class="btn btn-secondary ml-1 text-uppercase">
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
        <table-row-data :data="hotPlace" :titles="titles" domain="hot-place" />
      </tbody>
    </table>
    <!-- 페이지네이션 -->
    <hot-place-pagination :totalCnt="hotPlaces.totalCnt" />
  </div>
</template>

<script>
import pageHeader from "@/components/common/page/pageHeader";
import tableRowHeader from "@/components/common/page/tableRowHeader";
import tableRowData from "@/components/common/page/tableRowData";
import HotPlacePagination from "@/components/hotplace/HotPlacePagination.vue";
import writeBtn from "@/components/common/page/writeBtn";
import http from "@/utils/api/http";

export default {
  name: "HotPlaceList",
  components: {
    pageHeader,
    writeBtn,
    tableRowHeader,
    HotPlacePagination,
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
    };
  },
  created() {
    http.get("/hot-place").then((response) => {
      if (response.status === 200) {
        console.log(response);
        this.hotPlaces = response.data.data;
      }
    });
  },
  methods: {
    search() {
      let url = `/hot-place?${this.selected}=${this.keyword}`;
      http
        .get(url)
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            console.log(res);
            this.hotPlaces = res.data.data;
          }
        })
        .catch(() => {
          this.$alertDanger("검색 실패", "예외 처리 추가 예정");
        });
    },
  },
};
</script>

<style scoped>
#search-select-box {
  width: 200px;
}
</style>
