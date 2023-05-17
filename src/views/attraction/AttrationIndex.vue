<template>
  <div>
    <section class="container my-5" id="share-plan-view">
      <div class="text-center fw-bold" role="alert">
          <h2 class="row d-flex justify-content-around my-4 text-uppercase" >
            Travel Information
          </h2>
          <h5 class="section-subheading text-muted">원하는 여행지를 검색해보세요.</h5>
      </div>
      <div class="d-flex justify-content-center">
        <attraction-search-sidebar/>
      </div>
      <h2 class="section-heading text-uppercase"></h2>
    </section>
    <!-- 지도 영역 -->
    <div class="flex " id="article-list-section">
      <div class="row m-0 p-0">
        <!-- 사용자 추천 경로 -->
        <div class="col-12 m-0 p-0 text-center">
            <attraction-kakao-map mapId='map' :attractions='attractionPath'/>
        </div>
      </div>
  </div>
  
  </div>
</template>

<script>
import AttractionKakaoMap from '@/components/attraction/AttractionKakaoMap';
import AttractionSearchSidebar from '@/components/attraction/AttractionSearchSidebar'

export default {
  name: "AttractionIndex",
  components: {
    AttractionKakaoMap,
    AttractionSearchSidebar
  },
  data() {
    return {
      attractionPath: null
    };
  },
  created() {},
  methods: {},
};
</script>

<style scoped></style>
