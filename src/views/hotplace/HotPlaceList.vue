<template>
  <div class="container">
    <section class="" id="share-plan-list">
      <div class="text-center fw-bold" role="alert">
        <h2 class="section-heading text-uppercase">Hot Place</h2>
        <h3 class="section-subheading text-muted">여행지의 핫플레이스를 공유해보세요.</h3>
        <div class="row align-self-center mb-2">
          <div class="col-md-2 text-start">
            <router-link class="btn btn-primary btn shadow-sm" to="/hotplace/write">글쓰기</router-link>
          </div>
          <div class="col-md-7 offset-3">
            <form class="d-flex" id="search-form">
              <b-form-select id='search-select-box' v-model="selected" :options="options"></b-form-select>
              <div class="input-group shadow-sm">
                <input type="text" class="form-control" placeholder="검색어 입력"/>
                <button class="btn btn-secondary" @click="search" type="button">Search</button>
              </div>
            </form>
          </div>
        </div>
        <!-- 핫플레이스 List - 테이블 -->
        <table class="table table-hover shadow rounded" id="plan-table">
          <thead>
          <tr class="text-center table-warning">
            <th scope="col">글번호</th>
            <th scope="col">제목</th>
            <th scope="col">작성자</th>
            <th scope="col">조회수</th>
            <th scope="col">주소</th>
            <th scope="col">평점</th>
            <th scope="col">작성일</th>
          </tr>
          </thead>
          <tbody v-for="hotPlace in hotPlaces" :key="hotPlace.id">
          <hot-place-table-row :hot-place='hotPlace'/>
          </tbody>
        </table>
        <!-- 페이지네이션 -->
        <hot-place-pagination :totalCnt="hotPlaces.totalCnt"/>
      </div>
    </section>
  </div>
</template>

<script>
import HotPlaceTableRow from "@/components/hotplace/HotPlaceTableRow.vue";
import HotPlacePagination from "@/components/hotplace/HotPlacePagination.vue";
import http from "@/utils/api/http";

export default {
  name: "HotPlaceList",
  components: {
    HotPlacePagination,
    HotPlaceTableRow
  },
  data() {
    return {
      selected: null,
      options: [
        {value: null, text: "검색 조건"},
        {value: "title", text: "제목"},
        {value: "content", text: "내용"}
      ],
      hotPlaces: [],
    };
  },
  created() {
    http
        .get("/hotplace")
        .then((response) => {
          if (response.status === 200) {
            console.log(response);
            this.hotPlaces = response.data.data;
          }
        });
  },
  methods: {
    search() {
      http
          .get("/hotplace")
          .then((response) => {
            if (response.status === 200) {
              console.log(response);
              this.hotPlaces = response.data.data;
            }
          })
          .catch(() => {
            this.$alertDanger("검색 실패", "예외 처리 추가 예정");
          });
    }
  },
};
</script>

<style scoped>
#search-select-box {
  width: 200px;
}
</style>
