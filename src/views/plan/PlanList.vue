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
    <table class="table table-hover shadow rounded" id="table">
      <thead>
        <table-row-header :titles="titles" />
      </thead>
      <tbody>
          <tr v-if='plans.length===0'>
            <td colspan="6">현재 등록된 게시글이 없습니다.</td>
          </tr>
          <plan-table-row v-for="plan in plans" :key="plan.id" :plan="plan" :titles='titles' domain='plan'/>
      </tbody>
    </table>
    <!-- 페이지네이션 -->
    <page-navigation :totalCnt="plans.totalCnt" />
  </div>
</template>

<script>
import http from "@/utils/api/http";
import pageHeader from "@/components/common/page/pageHeader";
import tableRowHeader from "@/components/common/page/tableRowHeader";
import PageNavigation from "@/components/common/page/pageNavigation";
import writeBtn from "@/components/common/page/writeBtn";
import PlanTableRow from "@/components/plan/PlanTableRow";

export default {
  name: "PlanList",
  components: {
    pageHeader,
    PageNavigation,
    tableRowHeader,
    writeBtn,
    PlanTableRow,
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
        { title: "No", colSize: 1 },
        { title: "제목", colSize: 5 },
        { title: "작성자", colSize: 3 },
        { title: "조회수", colSize: 1 },
        { title: "작성일", colSize: 2 },
      ],
      plans: [],
    };
  },
  created() {
    this.getPlans()
  },
  methods: {
    getPlans() {
      http
      .get("/plan", {
        headers: sessionStorage.getItem("access-token"),
      })
      .then((res) => {
        console.log(res)
        if (res.status === 200) {
          this.plans = res.data.data;
        }
      })
      .catch(() => {
        this.$alertDanger(
          "데이터 로드 실패 !",
          "추후에 예외처리 로직 추가 예정"
        );
      });
    }
  },
};
</script>
<style scoped>
#table { 
  min-height: 550px;
}
</style>
