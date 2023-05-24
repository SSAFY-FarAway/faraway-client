<template>
  <div>
    <!-- 지도 영역 -->
    <div class="flex" id="article-list-section" style="max-width: 100vw">
      <div class="row p-0 m-0">
        <!-- 사용자 추천 경로 -->
        <div class="col-6 m-0 p-0 text-center">
          <plan-detail-kakao-map
            mapId="recommand-map"
            :attractions="plan.attractionResponses"
          />
          <h4 class="mt-2">My Plan</h4>
        </div>
        <!-- 최단 경로 -->
        <div class="col-6 m-0 p-0 text-center">
          <plan-detail-kakao-map
            mapId="shortest-map"
            :attractions="plan.shortestPath"
          />
          <h4 class="mt-2">Shortest Plan</h4>
        </div>
      </div>
    </div>

    <div class="container">
      <page-header title="Plan" subTitle="여행경로 상세보기" />
      <hr />
      <!-- 경로 카드 -->
      <div class="row p-0 m-0 col-12">
        <plan-card
          class="col-3 p-0 mb-4"
          v-for="(p, idx) in plan.attractionResponses"
          :key="p.contentId"
          :plan="p"
          :idx="idx + 1"
          :maxIdx="plan.attractionResponses.length"
        />
      </div>
      <hr />

      <!-- 게시글 제목 -->
      <div class="row m-0 mt-3">
        <h2 id="title" class="col-11 p-0">{{ plan.title ?? "제목" }}</h2>
        <b-dropdown
          v-if="plan.memberId === loginMember.id"
          class="col-1 p-0"
          size="md"
          variant="link"
          toggle-class="text-decoration-none"
          no-caret
        >
          <template #button-content>
            <b-icon
              icon="caret-down-fill"
              font-scale="1"
              style="color: var(--main-color)"
            ></b-icon>
          </template>
          <b-dropdown-item @click="moveModify">여행계획 수정</b-dropdown-item>
          <b-dropdown-item @click="deletePlan">여행계획 삭제</b-dropdown-item>
        </b-dropdown>
      </div>

      <!-- 게시글 정보 -->
      <div class="mt-2">
        <span id="member-id" class="text-secondary fw-light">
          작성자 : {{ plan.loginId }}<br />
          조회수 : {{ plan.hit }}
        </span>

        <!-- 게시글 내용 -->
        <div class="mt-3" id="content">
          <div class="h5" style="word-wrap: break-word">
            {{ plan.content ?? "내용" }}
          </div>
        </div>
        <!-- 좋아요 버튼 -->
        <div class="d-flex justify-content-center align-items-center mt-5">
          <!-- 좋아요 눌렀을 때 -->
          <button v-if="this.likeId" class="btn btn-primary" @click="unlike">
            <b-icon icon="heart-fill" font-scale="1"></b-icon>
            <span class="font-weight-bold ml-3">{{ plan.likeCnt }}</span>
          </button>
          <!-- 좋아요 안 눌렀을 때 -->
          <button v-else class="btn btn-outline-secondary" @click="like">
            <b-icon icon="heart-fill" font-scale="1"></b-icon>
            <span class="font-weight-bold ml-3">{{ plan.likeCnt }}</span>
          </button>
        </div>
        <hr />
      </div>

      <!-- 게시글 하단 메뉴 -->
      <div class="row p-0 m-0 justify-content-end">
        <router-link to="/plan/list" class="btn btn-outline-secondary">
          목록으로
        </router-link>
        <button class="btn btn-outline-secondary ml-2" @click="$toTop()">
          TOP
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import http from "@/utils/api/http";
import pageHeader from "@/components/common/page/pageHeader";
import PlanCard from "@/components/plan/PlanCard.vue";
import PlanDetailKakaoMap from "@/components/plan/PlanDetailKakaoMap";
import { mapState } from "vuex";
// import jwtDecode from "jwt-decode";

export default {
  name: "PlanList",
  components: {
    pageHeader,
    PlanCard,
    PlanDetailKakaoMap,
  },
  data() {
    return {
      plan: {},
      likeId: null,
    };
  },
  watch: {
    $route(to, from) {
      if (to.path != from.path) {
        this.getPlanData();
      }
    },
  },
  created() {
    this.getPlanData();
  },
  methods: {
    getPlanData() {
      const planId = this.$route.params.id;
      http
        .get(`/plan/${planId}`)
        .then((res) => {
          if (res.status === 200) {
            this.plan = res.data;
            this.likeId = this.plan.likeId;
          }
        })
        .catch(() => {
          this.$alertDanger(
            "데이터 로드 실패 !",
            "추후에 예외처리 로직 추가 예정"
          );
        });
    },
    moveModify() {
      this.$router.push(`${this.$route.fullPath}/edit`);
    },
    deletePlan() {
      if (
        confirm(
          "정말 삭제하시겠습니까? \n삭제된 여행계획은 복구할 수 없습니다."
        )
      ) {
        http
          .delete(`/plan/${this.$route.params.id}`)
          .then((res) => {
            if (res.status === 200) {
              this.$alertDanger("삭제 완료", "삭제가 완료되었습니다.");
              this.$router.replace(`/plan/list`);
            }
          })
          .catch((e) => {
            console.log(e);
            this.$alertDanger("오류 발생", "추후 예외처리 추가 예정");
          });
      }
    },
    like() {
      const data = {
        planId: this.plan.id,
      };
      http
        .post(`/plan/${this.plan.id}/like`, data)
        .then((res) => {
          console.log("[planDetail - like]");
          console.log(res);
          if (res.status === 200) {
            this.likeId = res.data;
            this.plan.likeCnt++;
            this.$alertSuccess(
              "좋아요❤",
              "해당 여행계획에 좋아요를 눌렀습니다."
            );
          }
        })
        .catch((res) => {
          this.$alertDanger("오류 확인", res);
          this.$alertDanger("오류 발생", "추후 예외처리 추가 예정");
        });
    },
    unlike() {
      http
        .delete(`/plan/like/${this.likeId}`)
        .then((res) => {
          if (res.status === 200) {
            this.likeId = null;
            this.plan.likeCnt--;
            this.$alertSuccess(
              "좋아요❤ 취소",
              "해당 여행계획에 좋아요를 취소했습니다."
            );
          }
        })
        .catch((res) => {
          this.$alertDanger("오류 확인", res);
          this.$alertDanger("오류 발생", "추후 예외처리 추가 예정");
        });
    },
  },
  computed: {
    ...mapState("memberStore", ["isLogin", "loginMember"]),
  },
};
</script>

<style scoped>
#search-select-box {
  width: 200px;
}

#content {
  min-height: 400px;
}
</style>
