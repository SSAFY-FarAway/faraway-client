<template>
  <div>
    <div class="container">
        <section class="page-section p-3 mt-3" id="share-plan-view">
            <div class="text-center fw-bold" role="alert">
                <h2 class="row d-flex justify-content-around my-4" >
                    Travle Plan
                </h2>
                <h4 class="section-heading text-uppercase">'{{plan.loginId}}' 님이 추천하는 여행계획입니다</h4>
                <hr/>
                <!-- 게시글 영역 -->
                <div class="col-md-12">
                    
                    <div class="mb-3">
                        <h5 class=" d-flex justify-content-start">
                            제목
                        </h5>
                        <input class="form-control" type="text" readonly :value='plan.title'>
                    </div>
                    <div>
                        <h5 class=" d-flex justify-content-start">
                            내용
                        </h5>
                        <textarea class="form-control" readonly id="" rows="3"  :value='plan.content'></textarea>
                    </div>
                </div>
                <hr/>
                <!-- 지도 영역 -->
                <div class="flex" id="article-list-section">
                    <div class="row  justify-content-center align-self-center mb-2">
                        <!-- 사용자 추천 경로 -->
                        <div class="col-6">
                            <div class="h4">My Plan</div>
                            <plan-kakao-map mapId='recommand-map' :attractions='plan.attractionResponses'/>
                        </div>
                        <!-- 최단 경로 -->
                        <div class="col-6">
                            <div class="h4">Shortest Plan</div>
                            <plan-kakao-map mapId='shortest-map' :attractions='plan.shortestPath'/>
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
import PlanKakaoMap from '@/components/plan/PlanKakaoMap';

export default {
  name: "PlanList",
    components: {
        PlanKakaoMap
    },
  data() {
    return {
        plan: {},
    };
  },
    created() {
        const planId = this.$route.params.planId;
        http.get(`/plan/${planId}`).then(res => {
            console.log(res)
            if (res.status === 200) {
                this.plan = res.data;
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
