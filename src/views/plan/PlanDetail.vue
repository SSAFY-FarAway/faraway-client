<template>
  <div>
    <div class="container">
        <section class="page-section p-3 mt-3" id="share-plan-view">
            <div class="text-center fw-bold" role="alert">
                <h2 class="section-heading text-uppercase">Write Travel Plan</h2>
                <h3 class="section-subheading text-muted">
                    원하는 여행경로를 공유해보세요.
                </h3>
                <div class="flex" id="article-list-section">
                    <div class="row  justify-content-center align-self-center mb-2">
                        <div class="col-4">
                            <div class="h4">My Plan</div>
                            <div id="map" class="mt-3 shadow" style="width: 100%; height: 600px"></div>
                        </div>
                        <div class="col-4">
                            <div class="h4">Shortest Plan</div>
                            <div id="shortest-map" class="mt-3 shadow" style="width: 100%; height: 600px"></div>
                        </div>
                        <div class="col-3 ms-1">
                            <div class="h2 row d-flex justify-content-around mb-2" >
                                Travle Plan
                            </div>
                            <div class="row d-flex justify-content-end mb-2" id = "writerId">
                            </div>
                            <div class="h5 row d-flex justify-content-start">
                                Title
                            </div>
                            <div class="row mb-2">
                                <div class="p-2 border shadow-sm" id="title">
                                </div>
                            </div>
                            <div class="h5 row d-flex justify-content-start">
                                Content
                            </div>
                            <div class="row mb-2">
                                <div class="p-2 border shadow-sm" style="height: 300px;" id="content">
                                </div>
                            </div>
                            <div class="ros d-flex justify-content-center" id="modify-button">
                                <div id="loginId" style="display: none">${loginMember.loginId}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    </section>
</div>
  </div>
</template>
<script>
import http from '@/utils/api/http';

export default {
  name: "PlanList",
    components: {
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
