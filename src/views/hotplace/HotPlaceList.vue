<template>
  <div class="hotplace-container">
    <!-- Header -->
    <page-header
      title="hot place"
      subTitle="여행지의 핫플레이스를 공유해보세요."
    />

    <!-- 검색 메뉴 -->
    <div class="p-0 m-0 mt-3 col-12 row justify-content-between">
      <write-btn path="/hot-place/write" btnName="add feed" />
      <form class="d-flex">
        <b-form-select class="col-md-4" v-model="selected" :options="options" />
        <input
          type="text"
          class="form-control ml-1"
          v-model="keyword"
          placeholder="키워드 입력"
        />
      </form>
    </div>
    <hr style="border-top: 1px solid rgb(219, 219, 219)" />

    <div class="row p-0 m-0 justify-content-end">
      <span class="font-weight-bold mr-3">피드 정렬</span>
      <b-form-group class="m-0" v-slot="{ ariaDescribedby }">
        <b-form-radio-group
          id="radio-group-1"
          v-model="feedSelected"
          :options="feedOptions"
          :aria-describedby="ariaDescribedby"
        ></b-form-radio-group>
      </b-form-group>
    </div>
    <hr style="border-top: 1px solid rgb(219, 219, 219)" />

    <feed-item
      v-for="hotPlace in hotPlaces"
      :key="hotPlace.id"
      :hotPlace="hotPlace"
      @like="like(hotPlace.id)"
      @unlike="unlike(hotPlace.id)"
    />
    <div
      v-if="!hotPlaces.length"
      class="d-flex flex-column align-items-center mt-3"
    >
      <b-icon class="text-center" icon="folder-x" font-scale="5" />
      <h3 class="text-center mt-3">피드가 존재하지 않습니다.</h3>
    </div>
  </div>
</template>

<script>
import { BIcon } from "bootstrap-vue";
import pageHeader from "@/components/common/page/pageHeader";
import writeBtn from "@/components/common/page/writeBtn";
import FeedItem from "@/components/hotplace/FeedItem";
import http from "@/utils/api/http";
import jwtDecode from "jwt-decode";
import { mapState } from "vuex";

export default {
  name: "HotPlaceList",
  components: {
    pageHeader,
    writeBtn,
    FeedItem,
    BIcon,
  },
  data() {
    return {
      selected: "title",
      feedSelected: 1,
      keyword: "",
      options: [
        { value: "title", text: "제목" },
        { value: "content", text: "내용" },
      ],
      feedOptions: [
        { value: 1, text: "최신 순" },
        { value: 2, text: "조회수 순" },
        { value: 3, text: "좋아요 순" },
      ],
      titles: [
        { title: "No", colSize: 1, colName: "id" },
        { title: "제목", colSize: 3, colName: "title" },
        { title: "작성자", colSize: 2, colName: "loginId" },
        { title: "주소", colSize: 2, colName: "mainAddress" },
        { title: "평점", colSize: 1, colName: "rating" },
        { title: "조회수", colSize: 1, colName: "hit" },
        { title: "작성일", colSize: 2, colName: "createdDate" },
      ],
      hotPlaces: [],
      pageTotalCnt: 0,
    };
  },
  created() {
    this.getHotPlaces();
  },
  watch: {
    keyword() {
      this.getHotPlaces();
    },
    feedSelected() {
      this.getHotPlaces();
    },
  },
  computed: {
    ...mapState("memberStore", ["loginMember"]),
  },
  methods: {
    getHotPlaces() {
      const pageNumber = this.isEmpty(this.$route.query.pageNumber);
      const memberId = this.getMemberId();

      let url = `/hot-place?${this.selected}=${this.keyword}&pageNumber=${pageNumber}&orderType=${this.feedSelected}`;
      if (memberId) {
        url += `&memberId=${memberId}`;
      }
      http
        .get(url)
        .then((res) => {
          if (res.status === 200) {
            this.hotPlaces = res.data.data;
            this.pageTotalCnt = res.data.pageTotalCnt;
          }
        })
        .catch(() => {
          this.$alertDanger("오류 발생", "추후 예외처리 추가 예정");
        });
    },
    isEmpty(value) {
      return value || "";
    },
    like(hotPlaceId) {
      if (!this.loginMember) {
        alert("로그인이 필요한 서비스입니다! 로그인 화면으로 이동합니다.");
        return this.$router.push("/member/login");
      }
      http
        .post(`/hot-place/${hotPlaceId}/like`)
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            this.$alertSuccess("좋아요❤", "피드에 좋아요를 눌렀습니다.");

            const hotPlace = this.findHotPlaceById(hotPlaceId);
            hotPlace.likeCnt++;
            hotPlace.likeId = res.data;
          }
        })
        .catch(() => {
          this.$alertDanger("좋아요 실패", "잠시 후 다시 시도하세요.");
        });
    },
    unlike(hotPlaceId) {
      const hotPlace = this.findHotPlaceById(hotPlaceId);
      let url = `/hot-place/like/${hotPlace.likeId}`;

      http
        .delete(url)
        .then((res) => {
          if (res.status === 200) {
            this.$alertSuccess("좋아요 취소", "피드에 좋아요를 취소했습니다.");
            hotPlace.likeCnt--;
            hotPlace.likeId = null;
          }
        })
        .catch(() => {
          this.$alertDanger("좋아요 취소 실패", "잠시 후 다시 시도하세요.");
        });
    },
    getMemberId() {
      const accessToken = sessionStorage.getItem("access-token");
      if (accessToken) {
        const decodedAccessToken = jwtDecode(accessToken);
        return decodedAccessToken.memberId;
      }
    },
    findHotPlaceById(hotPlaceId) {
      for (let i = 0; i < this.hotPlaces.length; i++) {
        if (this.hotPlaces[i].id === hotPlaceId) {
          return this.hotPlaces[i];
        }
      }
    },
  },
};
</script>

<style scoped>
#search-select-box {
  width: 200px;
}
</style>
