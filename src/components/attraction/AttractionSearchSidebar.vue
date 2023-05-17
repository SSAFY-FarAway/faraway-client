<template>
    <div>
      <b-button class="btn-primary" v-b-toggle.attraction-search-sidebar>찾아보기</b-button>
      <b-sidebar class="col-12" id="attraction-search-sidebar" title="관광지 검색" shadow>
        <div class="col-12">
          <b-form-select class='col-12' id='select-sido' v-model="sidoSelected" :options="sidoOptions"></b-form-select>                          
        </div>
        <div class="col-12 mt-2">
          <b-form-select class='col-12' id='select-gugun' v-model="gugunSelected" :options="gugunOptions"></b-form-select>                          
        </div>
        <div class="col-12 mt-2">
          <b-form-select class='col-12' id='select-content' v-model="contentSelected" :options="contentOptions"></b-form-select>                          
        </div>
        <div class="col-12 mt-2">
          <b-button class="col-12" variant="primary" @click="search">검색</b-button>
        </div>
        <!-- 검색 결과 -->
        <div class="my-2" v-for="attraction in attractions" :key='attraction.contentId'>
          <attraction-search-result-item :attraction='attraction'/>
        </div>
        <attraction-search-result-totop-item v-if="attractions.length"/>
      </b-sidebar>
    </div>
  </template>

<script>
import http from '@/utils/api/http';
import AttractionSearchResultItem from './AttractionSearchResultItem';
import AttractionSearchResultTotopItem from './AttractionSearchResultTotopItem';

export default {
    name: 'AttractionSearchSidebar',
  components: {
    AttractionSearchResultItem,
    AttractionSearchResultTotopItem
    },
    data() {
      return {
          // select
          sidoSelected: null,
          sidoOptions: [
            { value: null, text: '검색할 시/도' },
          ],
          gugunSelected: null,
          gugunOptions: [
            { value : null, text : '검색할 구/군'}
          ],
          contentSelected: 0,
          contentOptions: [
            { value: 0, text: '여행지 유형' },
            { value: "12", text: '관광지' },
            { value: '14', text: '문화시설' },
            { value: '15', text: '축제/공연/행사' },
            { value: "25", text: '여행코스' },
            { value: '28', text: '레포츠' },
            { value: '32', text: '숙박' },
            { value: "38", text: '쇼핑' },
            { value: '39', text: '음식점' },
        ],

        attractions : [],
        };
    },
    created() {},
  methods: {
    search() {
      http.get("/attraction", {
        params: {
          "sidoCode" : "1",
          "gugunCode" : "1",
          "contentTypeId" : "12"
        },
        headers: {
    "Content-Type": "application/json",
        }
      }).then(res => {
        this.attractions = res.data
        console.log(res)
      });
      }
    },
};
</script>

<style scoped>
#attraction-search-sidebar {
  overflow-y: scroll;
}
</style>