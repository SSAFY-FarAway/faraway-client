<template>
  <div>
    <!-- 지도 영역 -->
    <div class="flex " id="article-list-section">
      <div class="row m-0 p-0">
        <!-- 사용자 추천 경로 -->
        <div class="col-12 m-0 p-0 text-center">
            <attraction-kakao-map mapId='map' :attractions='attractionPath'/>
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
  <div class="container mt-5 text-center fw-bold" role="alert">
    <h2 class="section-heading text-uppercase">Travel Information</h2>
    <h5 class="section-subheading text-muted">원하는 여행지를 검색해보세요.</h5>

    <!-- 관광지 검색 start -->
    <form class="mb-3 d-flex justify-content-center" onsubmit="return false;" role="search">
      <div class="col-3 mt-3">
        <select id="search-area" class="form-select shadow">
          <option value="0" selected>검색 할 시도</option>
          <!-- TODO: 검색할 시도 반복문으로 표시하기  -->
        </select>
      </div>
      <div class="col-3 mt-3">
        <select id="search-sigun" class="form-select shadow">
          <option value="0" selected>검색 할 구군</option>
          <!-- TODO: 검색할 구군 반복문으로 표시하기  -->
        </select>
      </div>
      <div class="col-3 mt-3">
        <select
          id="search-content-id"
          class="form-select shadow bg-gradient"
          style="background-color: #fefaea"
        >
          <option value="0" selected>컨텐츠 선택</option>
          <option value="12">관광지</option>
          <option value="14">문화시설</option>
          <option value="15">축제공연행사</option>
          <option value="25">여행코스</option>
          <option value="28">레포츠</option>
          <option value="32">숙박</option>
          <option value="38">쇼핑</option>
          <option value="39">음식점</option>
        </select>
      </div>
      <div class="mt-3">
        <button id="btn-search" class="btn btn-outline-success shadow" type="button">
          Search
        </button>
      </div>
    </form>
    <!-- 관광지 검색 end -->

    <!-- kakao map start -->
    <div class="d-flex justify-content-center">
      <div id="map" class="col-10 shadow" style="width: 100%; height: 600px"></div>
    </div>
    <!-- kakao map end -->
  </div>
  </div>
</template>

<script>
import AttractionKakaoMap from '@/components/attraction/AttractionKakaoMap';
export default {
  name: "AttrationIndex",
  components: {AttractionKakaoMap},
  data() {
    return {
      message: "",
    };
  },
  created() {},
  methods: {},
};
</script>

<style scoped></style>
