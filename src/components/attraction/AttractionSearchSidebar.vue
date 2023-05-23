<template>
  <div class="d-flex justify-content-center">
    <b-card
      v-if="domain === 'plan'"
      class="font-small justify-content-center"
      v-b-toggle.attraction-search-sidebar
      no-body
      style="height: 265.25px; width: 220px; border-color: var(--main-color)"
    >
      <h4 class="m-0" @click="toTop">
        <b-icon
          class="my-3"
          style="width: 100%; color: var(--main-color)"
          icon="plus-circle"
          animation="fade"
          font-scale="3"
        ></b-icon
        >나만의 경로<br />추가하기
      </h4>
    </b-card>
    <b-button v-else class="btn-primary" v-b-toggle.attraction-search-sidebar
      >찾아보기</b-button
    >
    <b-sidebar
      class="col-12"
      id="attraction-search-sidebar"
      title="관광지 검색"
      shadow
    >
      <div class="col-12">
        <b-form-select
          class="col-12"
          id="select-sido"
          v-model="sidoSelected"
          :options="sidoOptions"
        />
      </div>
      <div class="col-12 mt-2">
        <b-form-select
          class="col-12"
          id="select-gugun"
          v-model="gugunSelected"
          :options="gugunOptions"
        />
      </div>
      <div class="col-12 mt-2">
        <b-form-select
          class="col-12"
          id="select-content"
          v-model="contentSelected"
          :options="contentOptions"
        />
      </div>
      <div class="col-12 mt-2">
        <b-form-input
            class="col-12"
            id="input-title"
            v-model="title"
            placeholder="관광지명을 입력해주세요."
        />
      </div>
      <div class="col-12 mt-2">
        <b-button class="col-12" variant="primary" @click="search(1)"
          >검색</b-button
        >
      </div>
      <!-- 검색 결과 -->
      <div class="mt-3 font-weight-bold text-center" v-if="attractions.length === 0">
        검색결과가 없습니다.
      </div>
      <div
        class="my-2"
        v-for="attraction in attractions"
        :key="attraction.contentId"
      >
        <attraction-search-result-item
          :attraction="attraction"
          :domain="domain"
        />
      </div>
      <attraction-search-result-totop-item v-if="attractions.length" />
      <page-navigation v-if="attractions.length" :total-pages="totalPages" @search='search'></page-navigation>
    </b-sidebar>
  </div>
</template>

<script>
import http from "@/utils/api/http";
import AttractionSearchResultItem from "./AttractionSearchResultItem";
import AttractionSearchResultTotopItem from "./AttractionSearchResultTotopItem";
import { BIcon } from "bootstrap-vue";

import { mapActions } from "vuex";
import PageNavigation from "@/components/attraction/pageNavigation.vue";

export default {
  name: "AttractionSearchSidebar",
  components: {
    PageNavigation,
    BIcon,
    AttractionSearchResultItem,
    AttractionSearchResultTotopItem,
  },
  props: {
    domain: String,
  },
  data() {
    return {
      // select
      sidoSelected: 0,
      sidoOptions: [{ value: 0, text: "검색할 시/도" }],
      gugunSelected: 0,
      gugunOptions: [{ value: 0, text: "검색할 구/군" }],
      contentSelected: 0,
      contentOptions: [
        { value: 0, text: "여행지 유형" },
        { value: "12", text: "관광지" },
        { value: "14", text: "문화시설" },
        { value: "15", text: "축제/공연/행사" },
        { value: "25", text: "여행코스" },
        { value: "28", text: "레포츠" },
        { value: "32", text: "숙박" },
        { value: "38", text: "쇼핑" },
        { value: "39", text: "음식점" },
      ],
      title: "",
      attractions: [],
      totalPages: Number,
    };
  },
  created() {
    // 시도 옵션 추가
    http.get("/attraction/sido").then((res) => {
      if (res.status === 200) {
        res.data.forEach((el) => {
          const option = { value: el.sidoCode, text: el.sidoName };
          this.sidoOptions.push(option);
        });
      }
    });
    console.log(this.domain);
  },
  watch: {
    sidoSelected() {
      this.gugunOptions = [{ value: 0, text: "검색할 구/군" }];
      this.gugunSelected = 0;

      if (this.sidoSelected) {
        http.get(`/attraction/gugun/${this.sidoSelected}`).then((res) => {
          if (res.status === 200) {
            res.data.forEach((el) => {
              const option = { value: el.gugunCode, text: el.gugunName };
              this.gugunOptions.push(option);
            });
          }
        });
      }
    },
  },
  methods: {
    ...mapActions("attractionStore", ["setAttractions"]),
    search(currentPage) {
      http
        .get("/attraction", {
          params: {
            sidoCode: this.setParam(this.sidoSelected),
            gugunCode: this.setParam(this.gugunSelected),
            contentTypeId: this.setParam(this.contentSelected),
            pageNumber: currentPage,
            title: this.title,
          },
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          console.log(res);
          this.attractions = res.data.data;
          this.setAttractions(res.data.data);
          this.totalPages = res.data.pageTotalCnt;
        });
    },
    toTop() {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
    setParam(value) {
      if (value === 0) {
        return null;
      }
      return value;
    }
  },
};
</script>

<style scoped>
#attraction-search-sidebar {
  overflow-y: scroll;
}
</style>
