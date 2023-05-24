<template>
  <div>
    <!-- 지도 영역 -->
    <div class="flex" id="article-list-section">
      <div class="row m-0 p-0">
        <!-- 사용자 추천 경로 -->
        <div class="col-12 m-0 p-0 text-center">
          <plan-write-kakao-map mapId="modify-map" />
        </div>
      </div>
    </div>
    <section class="container my-5" id="share-plan-view">
      <div class="text-center fw-bold" role="alert">
        <h2 class="row d-flex justify-content-around my-4">
          Modify Travle Plan
        </h2>
        <!-- 헤더 영역 -->
        <h4 class="section-heading text-uppercase">
          {{ loginMember.loginId }} 님이 추천하는 여행계획입니다
        </h4>
        <hr />

        <!-- 관광지 추가 사이드바 버튼 -->
        <div class="row p-0 m-0 col-12">
          <plan-add-card
            class="col-3 p-0 mb-4"
            v-for="(plan, idx) in myPlan"
            :key="plan.contentId"
            :plan="plan"
            :idx="idx + 1"
          />
          <!-- arrow-right-circle-fill -->
          <attraction-search-sidebar domain="plan" />
        </div>

        <hr />
        <!-- 게시글 영역 -->
        <div class="col-md-12">
          <div class="mb-3">
            <h5 class="d-flex justify-content-start">제목</h5>
            <input class="form-control" type="text" v-model="planPost.title" />
          </div>
          <div>
            <h5 class="d-flex justify-content-start">내용</h5>
            <textarea
              class="form-control"
              id=""
              rows="3"
              v-model="planPost.content"
            ></textarea>
          </div>
        </div>
      </div>
      <div class="d-flex justify-content-center mt-5">
        <b-button class="col-6 mr-1" variant="secondary" @click="$router.go(-1)"
          >CANCEL</b-button
        >
        <b-button class="col-6 ml-1" variant="primary" @click="modifyPlan"
          >MODIFY</b-button
        >
      </div>
    </section>
  </div>
</template>
<script>
import AttractionSearchSidebar from "@/components/attraction/AttractionSearchSidebar";
import PlanWriteKakaoMap from "@/components/plan/PlanWriteKakaoMap";
import PlanAddCard from "@/components/plan/PlanAddCard";
import http from "@/utils/api/http";
import { mapActions, mapGetters, mapState } from "vuex";

export default {
  name: "PlanWrite",
  components: {
    AttractionSearchSidebar,
    PlanWriteKakaoMap,
    PlanAddCard,
  },
  data() {
    return {
      planPost: {
        title: "",
        content: "",
        travelPlan: "",
      },
      attractionPath: [],
    };
  },
  computed: {
    ...mapState("attractionStore", ["pickedAttractions"]),
    ...mapState("memberStore", ["loginMember"]),
    ...mapState("planStore", ["myPlan"]),
    ...mapGetters("planStore", ["getContentIds"]),
  },
  created() {
    this.getPlanData();
  },
  methods: {
    ...mapActions("attractionStore", [
      "addPickedAttraction",
      "removePickedAttraction",
    ]),
    ...mapActions("planStore", ["addPlan", "clearPlan"]),
    modifyPlan() {
      this.planPost.travelPlan = `${this.getContentIds.toString()}`;
      const url = `/plan/${this.$route.params.planId}`
      console.log(url)
      console.log(this.planPost)
      http.put(url, this.planPost).then((res) => {
        console.log(res)
        if (res.status === 200) {
          this.$alertSuccess(
            "여행 계획 수정 성공",
            "여행 계획을 성공적으로 수정했습니다. 해당 게시글로 이동합니다."
          );
          this.$router.replace(`/plan/${res.data}`);
        }
      }).catch(error => {
        console.log(error)
      });
    },
    getPlanData() {
      const planId = this.$route.params.id;
      http
        .get(`/plan/${planId}`)
        .then((res) => {
          if (res.status === 200) {
            console.log(res.data)
            this.plan = res.data;
            this.planPost.title = res.data.title
            this.planPost.content = res.data.content
            this.clearPlan();
            res.data.attractionResponses.forEach((el) => {
              this.addPlan(el);
            });
          }
        })
        .catch(() => {
          this.$alertDanger(
            "데이터 로드 실패 !",
            "추후에 예외처리 로직 추가 예정"
          );
        });
    },
  },
};
</script>

<style scoped>
#search-select-box {
  width: 200px;
}
</style>
