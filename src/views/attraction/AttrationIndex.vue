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
        <div class="col-12 m-0 p-0 text-center">
            <attraction-kakao-map mapId='map' :attractions='attractionPath'/>
        </div>
      </div>
    </div>
    <!-- 관광지 디테일 영역 -->
    <div id='attraction-detail' class="container text-center mt-5" v-if='selectedAttraction'>
         <!-- 게시글 영역 -->
          <img :src='selectedAttraction.firstImage'/>
          <h2 class="row d-flex justify-content-around my-4" >
            {{ selectedAttraction.title }}
          </h2>
          <h5 class="section-heading text-uppercase">{{`(${selectedAttraction.zipcode})`+selectedAttraction.addr1}}</h5>
        <hr/>
          <div>
              <h5 class=" d-flex justify-content-start">
                  관광지 소개
              </h5>
              <textarea class="form-control" readonly id="" rows="3"  ></textarea>
          </div>
    </div>
    
  </div>
</template>

<script>
import AttractionKakaoMap from '@/components/attraction/AttractionKakaoMap';
import AttractionSearchSidebar from '@/components/attraction/AttractionSearchSidebar'
import { mapState } from 'vuex';

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
  created() { },
  computed: {
    ...mapState('attractionStore',['selectedAttraction'])
  },
  methods: {},
};
</script>

<style scoped></style>
