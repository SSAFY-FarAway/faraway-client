<template>
  <div class="container">
    <!-- Header -->
    <page-header
      title="TRAVEL PLAN"
      subTitle="나만의 여행경로를 공유해보세요 !"
    />

    <!-- 검색 메뉴 -->
    <div class="p-0 pb-1 m-0 col-12 row justify-content-between">
      <write-btn path="/plan/write" btnName="write plan" />
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

    <!-- 여행경로 List - 테이블 -->
    <div id="table-container">
      <table class="table table-hover shadow rounded">
        <thead>
          <table-row-header :titles="titles" />
        </thead>
        <tbody>
          <tr v-if="plans.length === 0">
            <td colspan="6">현재 등록된 게시글이 없습니다.</td>
          </tr>
          <table-row-data
            v-for="plan in plans"
            :key="plan.id"
            :data="plan"
            :titles="titles"
            domain="plan"
          />
        </tbody>
      </table>
    </div>
    <!-- 페이지네이션 -->
    <page-navigation :totalPages="pageTotalCnt" />
  </div>
</template>

<script>
import http from "@/utils/api/http";
import pageHeader from "@/components/common/page/pageHeader";
import tableRowHeader from "@/components/common/page/tableRowHeader";
import PageNavigation from "@/components/common/page/pageNavigation";
import writeBtn from "@/components/common/page/writeBtn";
import tableRowData from "@/components/common/page/tableRowData";

export default {
  name: "PlanList",
  components: {
    pageHeader,
    PageNavigation,
    tableRowHeader,
    writeBtn,
    tableRowData,
  },
  data() {
    return {
      selected: null,
      options: [
        { value: null, text: "검색 조건" },
        { value: "title", text: "제목" },
        { value: "member", text: "작성자" },
      ],
      titles: [
        { title: "No", colSize: 1, colName: "id" },
        { title: "제목", colSize: 5, colName: "title" },
        { title: "작성자", colSize: 3, colName: "loginId" },
        { title: "조회수", colSize: 1, colName: "hit" },
        { title: "작성일", colSize: 2, colName: "createdDate" },
      ],
      plans: [],
      pageTotalCnt: 0,
    };
  },
  created() {
    this.getPlans();
  },
  methods: {
    getPlans() {
      http
        .get("/plan")
        .then((res) => {
          if (res.status === 200) {
            this.pageTotalCnt = res.data.pageTotalCnt;
            this.plans = res.data.data;
          }
        })
        .catch(() => {
          this.$alertDanger(
            "데이터 로드 실패 !",
            "추후에 예외처리 로직 추가 예정"
          );
        });
    },
  },
};
</script>
<style scoped>
#table-container {
  min-height: 550px;
}
</style>
