<template>
  <!-- TODO : img 디폴트 이미지 추가할 것. -->
  <b-card
    :title="attraction.title"
    :img-src="$options.filters.defaultImgSrcFilter(attraction.firstImage)"
    img-top
    tag="article"
    style="max-width: 20rem"
    class="mb-1"
    @click="selectAttraction"
  >
    <b-card-text>
      {{ attraction.addr1 }}
    </b-card-text>

    <!-- 좋아요 눌렀을 때 -->
    <button v-if="this.likeId" class="btn btn-primary" @click="unlike">
      <b-icon icon="heart-fill" font-scale="1"></b-icon>
      <span class="font-weight-bold ml-3">{{ this.likeCnt }}</span>
    </button>
    <!-- 좋아요 안 눌렀을 때 -->
    <button v-else class="btn btn-outline-secondary" @click="like">
      <b-icon icon="heart-fill" font-scale="1"></b-icon>
      <span class="font-weight-bold ml-3">{{ this.likeCnt }}</span>
    </button>

    <!-- 여행 계획의 아이템으로 사용되는 경우 -->
    <button
      class="btn btn-primary"
      v-if="domain === 'plan'"
      @click="addMyPath(attraction)"
    >
      내 경로에 추가하기
    </button>
  </b-card>
</template>

<script>
import { mapActions, mapState } from "vuex";
import jwtDecode from "jwt-decode";
import http from "@/utils/api/http";

export default {
  name: "AttractionSearchResultItem",
  components: {},
  props: {
    attraction: Object,
    domain: String,
  },
  data() {
    return {
      likeId: this.attraction.likeId,
      likeCnt: this.attraction.likeCnt,
    };
  },
  created() {},
  computed: {
    ...mapState("planStore", ["myPlan"]),
    ...mapState("memberStore", ["isLogin", "loginMember"]),
  },
  methods: {
    ...mapActions("attractionStore", ["setAttraction"]),
    ...mapActions("planStore", ["addPlan"]),
    selectAttraction() {
      this.setAttraction(this.attraction);
    },
    addMyPath(attraction) {
      let flag = true;

      if (
        this.myPlan.filter((el) => el.contentId === attraction.contentId)
          .length > 0
      ) {
        flag = false;
      }

      if (flag) {
        this.$alertSuccess("경로 추가", "경로가 성공적으로 추가되었습니다.");
        this.addPlan(attraction);
      } else {
        this.$alertDanger("경로 추가 실패", "이미 추가된 경로입니다.");
      }
    },
    like() {
      const accessToken = sessionStorage.getItem("access-token");
      const decodedAccessToken = jwtDecode(accessToken);
      const memberId = decodedAccessToken.memberId;

      const data = {
        attractionId: this.attraction.contentId,
        memberId: memberId,
      };
      http
        .post(`/attraction/${this.attraction.contentId}/like`, data)
        .then((res) => {
          console.log(`like res: ${res}`);
          if (res.status === 200) {
            this.likeId = res.data;
            this.likeCnt++;
            this.$alertSuccess("좋아요", "관광지에 좋아요를 했습니다.");
          }
        })
        .catch((res) => {
          this.$alertDanger("오류 확인", res);
          this.$alertDanger("오류 발생", "추후 예외처리 추가 예정");
        });
    },
    unlike() {
      console.log(`likeId: ${this.likeId}`);
      http
        .delete(`/attraction/like/${this.likeId}`)
        .then((res) => {
          if (res.status === 200) {
            this.likeId = null;
            this.likeCnt--;
            this.$alertSuccess("좋아요 취소", "좋아요 취소를 누르셨습니다.");
          }
        })
        .catch((res) => {
          this.$alertDanger("오류 확인", res);
          this.$alertDanger("오류 발생", "추후 예외처리 추가 예정");
        });
    },
  },
};
</script>

<style scoped></style>
