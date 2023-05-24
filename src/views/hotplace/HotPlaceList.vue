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
          placeholder="검색어 입력"
        />
        <button
          type="button"
          class="btn btn-secondary ml-1 text-uppercase"
          @click="search"
        >
          Search
        </button>
      </form>
    </div>
    <feed-item
      v-for="hotPlace in hotPlaces"
      :key="hotPlace.id"
      :hotPlace="hotPlace"
      @like="like(hotPlace.id)"
      @unlike="unlike(hotPlace.id)"
    />
  </div>
</template>

<script>
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
  },
  data() {
    return {
      selected: null,
      keyword: "",
      options: [
        { value: null, text: "검색 조건" },
        { value: "title", text: "제목" },
        { value: "content", text: "내용" },
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
    "$route.fullPath"() {
      this.getHotPlaces();
    },
  },
  computed: {
    ...mapState("memberStore", ["loginMember"]),
  },
  methods: {
    getHotPlaces() {
      const pageNumber = this.isEmpty(this.$route.query.pageNumber);
      const title = this.isEmpty(this.$route.query.title);
      const content = this.isEmpty(this.$route.query.content);
      const memberId = this.getMemberId();

      let url = `/hot-place?title=${title}&content=${content}&pageNumber=${pageNumber}`;
      if (memberId) {
        url += `&memberId=${memberId}`;
      }
      http
        .get(url)
        .then((res) => {
          if (res.status === 200) {
            console.log(res);
            this.hotPlaces = res.data.data;
            this.pageTotalCnt = res.data.pageTotalCnt;
          }
        })
        .catch(() => {
          this.$alertDanger("오류 발생", "추후 예외처리 추가 예정");
        });
    },
    search() {
      let url = `/hot-place?${this.selected}=${this.keyword}`;
      this.$router.push(url).catch(() => {
        this.getHotPlaces();
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
