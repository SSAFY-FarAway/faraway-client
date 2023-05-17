<template>
    <div class="container">
        <section class="mt-5" id="share-plan-list">
            <div class="text-center fw-bold" role="alert">
                <h2 class="section-heading text-uppercase">Travel Plan</h2>
                <h3 class="section-subheading text-muted">원하는 여행경로를 공유해보세요.</h3>
                <div class="p-0 pb-1 m-0 col-12 row justify-content-between">
                    <router-link to="/plan/write" type="button" class="btn btn-primary btn">WRITE PLAN</router-link>
                    <form class="d-flex justify-content-end">
                        <div class="input-group col-10 p-0">
                            <b-form-select class='col-md-4' id='search-select-box' v-model="selected" :options="options"></b-form-select>                          
                            <input type="text" class="form-control" placeholder="검색어 입력" />
                            <button class="btn btn-secondary ml-1" id="search-btn" type="button">Search</button>
                        </div>
                    </form>
                </div>
                <!-- 여행경로 List - 테이블 -->
                <table class="table table-hover shadow rounded" id="plan-table">
                    <thead>
                    <tr class="text-center table-warning">
                        <th scope="col">경로번호</th>
                        <th scope="col">제목</th>
                        <th scope="col">작성자</th>
                        <th scope="col">조회수</th>
                        <th scope="col">작성일</th>
                    </tr>
                    </thead>
                    <tbody v-for="plan in plans" :key="plan.id">
                        <plan-table-row :plan='plan'/>
                    </tbody>
                </table>
                <!-- 페이지네이션 -->
                <plan-pagination :totalCnt="plans.totalCnt"/>
            </div>
        </section>
    </div>
</template>
<script>
import http from '@/utils/api/http';
import PlanTableRow from '@/components/plan/PlanTableRow';
import PlanPagination from '@/components/plan/PlanPagination';

export default {
  name: "PlanList",
    components: {
        PlanTableRow,
        PlanPagination
    },
  data() {
    return {
        selected: null,
        options: [
         { value: null, text: '검색 조건' },
          { value: "title", text: '제목' },
          { value: 'member', text: '작성자' },
        ],
        plans: [],
    };
  },
    created() {
        http.get("/plan").then(res => {
            console.log(res)
            if (res.status === 200) {
                this.plans = res.data.data;
            }
        }).catch(() => {
            this.$alertDanger("데이터 로드 실패 !", "추후에 예외처리 로직 추가 예정")
        })
  },
  methods: {},
};
</script>

<style scoped>
#search-select-box { 
    width: 200px;
}
</style>
