<template>
  <div>
    <section class="container my-5" id="share-plan-view">
      <!-- Header -->
      <title-header
        title="Travel Information"
        subTitle="원하는 여행지를 검색해보세요."
      />
      <!-- 관광지 검색 SideBar -->
      <attraction-search-sidebar />
    </section>

    <!-- 지도 영역 -->
    <attraction-kakao-map mapId="map" :attractions="attractionPath" />

    <!-- 관광지 디테일 영역 START -->
    <div
      id="detail"
      class="container text-center mt-5"
      v-if="selectedAttraction"
    >
      <!-- 게시글 영역 -->
      <img :src="selectedAttraction.firstImage" />
      <h2 class="row d-flex justify-content-around my-4">
        {{ selectedAttraction.title }}
      </h2>
      <h5 class="section-heading text-uppercase">
        {{ `(${selectedAttraction.zipcode})` + selectedAttraction.addr1 }}
      </h5>
      <hr />
      <div>
        <h5 class="d-flex justify-content-start">관광지 소개</h5>
        <textarea class="form-control" readonly id="" rows="3"></textarea>
      </div>
    </div>
    <!-- 관광지 디테일 영역 END -->
  </div>
</template>

<script>
import titleHeader from "@/components/common/page/pageHeader.vue";
import AttractionKakaoMap from "@/components/attraction/AttractionKakaoMap";
import AttractionSearchSidebar from "@/components/attraction/AttractionSearchSidebar";
import { mapState } from "vuex";

export default {
  name: "AttractionIndex",
  components: {
    titleHeader,
    AttractionKakaoMap,
    AttractionSearchSidebar,
  },
  data() {
    return {
      attractionPath: null,
    };
  },
  created() {},
  computed: {
    ...mapState("attractionStore", ["selectedAttraction"]),
  },
  methods: {},
};
</script>

<style scoped></style>
