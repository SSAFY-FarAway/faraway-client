<template>
    <div>
      <!-- 지도 영역 -->
      <div class="flex " id="article-list-section">
        <div class="row m-0 p-0">
            <!-- 사용자 추천 경로 -->
            <div class="col-12 m-0 p-0 text-center">
                <plan-kakao-map mapId='write-map' :attractions='attractionPath'/>
            </div>
        </div>
    </div>
      <section class="container my-5" id="share-plan-view">
        <div class="text-center fw-bold" role="alert">
            <h2 class="row d-flex justify-content-around my-4" >
                Write Travle Plan
            </h2>
            <h4 class="section-heading text-uppercase">'memberLoginId' 님이 추천하는 여행계획입니다</h4>
            <hr/>
            <!-- 게시글 영역 -->
            <div class="col-md-12">
                
                <div class="mb-3">
                    <h5 class=" d-flex justify-content-start">
                        제목
                    </h5>
                    <input class="form-control" type="text" :value='plan.title'>
                </div>
                <div>
                    <h5 class=" d-flex justify-content-start">
                        내용
                    </h5>
                    <textarea class="form-control" id="" rows="3"  :value='plan.content'></textarea>
                </div>
            </div>
        </div>
        <div class="d-flex justify-content-center">
          <b-button class="col-6 mr-1" variant="secondary" >CANCLE</b-button>
          <b-button class="col-6 ml-1" variant="primary">WRITE</b-button>
        </div>
      </section>
    </div>
</template>
<script>
import PlanKakaoMap from '@/components/plan/PlanKakaoMap';

export default {
  name: "PlanWrite",
  components: {
    PlanKakaoMap
    },
  data() {
    return {
      plan: {
        title: '',
        content: '',
        travelPlan : []
      },
      attractionPath: []
    };
  },
    created() {
       
  },
  methods: {},
};
</script>

<style scoped>
#search-select-box { 
    width: 200px;
}
</style>
