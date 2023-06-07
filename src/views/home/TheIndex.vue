<template>
  <div >
    <div style="position : relative" >
      <!-- 배너 고정 문구 -->
      <div style="top : 10%; left: 20%; position:absolute; z-index: 99;" class="masthead">
        <div class="masthead-subheading animate__animated animate__fadeInDown">wherever you go,</div>
        <div class="masthead-heading text-uppercase animate__animated animate__fadeInDown">FAR AWAY</div>
        <router-link
            style="width: 180px; line-height: 40px"
            class="btn btn-primary btn-xl text-uppercase animate__animated animate__fadeInDown"
            to="/attraction/index"
        >Search Place
        </router-link>
    </div>
    <!-- 타이틀(masthead) 영역 -->
    <carousel ref="carousel" :autoplay="true" :loop="true" :navigation-enabled="true" :per-page="1" :autoplay-timeout="4000" :speed="800"
              navigationNextLabel="▶" navigationPrevLabel="◀">
      <!-- 슬라이드 1 -->
      <slide v-for="slideId in slideIds" :key="slideId">
        <div :id='slideId' class="masthead-img"/>
      </slide>
    </carousel>
  </div>
  <div class="container mt-5 text-center">
    <h2 class="section-subheading text-muted animate__animated animate__fadeInDown">
      <p style="color:var(--main-color); " class="font-weight-bold">
        <span style="color:#00A67E">CHAT GPT</span> 에게 물어보세요 !</p>
    </h2>
    <tag-search-bar/>
  </div>
    <!-- 메인 섹션 -->
    <section class="container">
      <div class="text-center" style="margin: 80px 0">
        <h2 class="section-subheading text-muted animate__animated animate__fadeInDown">
          <p style="color:var(--main-color); " class="font-weight-bold">
            이번 여름, 어디로 떠나실건가요?</p>
        </h2>
        <h1  class="section-heading text-uppercase animate__animated animate__fadeInDown" >대한민국의 다양한 관광지와 컨텐츠를 찾아보세요 !</h1>
      </div>

      <!-- 카드 영역 -->
      <div class="d-flex justify-content-center " style="margin-bottom: 100px">
        <!-- 카드 1 -->
        <b-card
            title="SEARCH-PLACE"
            style="max-width: 20rem; position: relative; border: none"
            class="mb-2 mx-5 text-center animate__animated animate__fadeInRight"
        >
          <b-icon
              class="my-5"
              style="width: 100%; height: 200px;"
              icon="zoom-in"
              animation="fade"
              font-scale="4"
          ></b-icon>
          <b-card-text class="font-weight-bold font-italic">
            여행을 떠나려는 지역의<br/> 관광지와 명소를 찾아보세요.
          </b-card-text>
          <router-link
            style="width: 180px; line-height: 30px"
            class="mt-5 btn btn-primary btn-xl text-uppercase animate__animated animate__fadeInDown"
            to="/attraction/index"
        >Go Search-Place
        </router-link>
        </b-card>

        <!-- 카드 2 -->
        <b-card
            title="PLAN"
            style="max-width: 20rem; position: relative; border: none"
            class="mb-2 mx-5 text-center animate__animated animate__fadeInRight"
        >
          <b-icon
              class="my-5"
              style="width: 100%; height: 200px;"
              icon="calendar2-check"
              animation="fade"
              font-scale="4"
          ></b-icon>
          <b-card-text class="font-weight-bold font-italic">
            나만의 완벽한 여행계획! <br/>함께 공유해요.
          </b-card-text>
          <router-link
            style="width: 180px; line-height: 30px"
            class="mt-5 btn btn-primary btn-xl text-uppercase animate__animated animate__fadeInDown"
            to="/plan/list"
        >Go PLAN
        </router-link>
        </b-card>

        <!-- 카드 -->
        <b-card
            title="HOT-PLACE"
            style="max-width: 20rem; position: relative; border: none"
            class="mb-2 mx-5 text-center animate__animated animate__fadeInRight"
        >
          <b-icon
              class="my-5 "
              style="width: 100%; height: 200px;"
              icon="geo-alt"
              animation="fade"
              font-scale="4"
          ></b-icon>
          <b-card-text class="font-weight-bold font-italic">
            요즘 뜨고 있는 <br/>핫플은 어디일까요?
          </b-card-text>
          <router-link
            style="width: 180px; line-height: 30px"
            class="mt-5 btn btn-primary btn-xl text-uppercase animate__animated animate__fadeInDown"
            to="/hot-place/list"
        >go hot-place
        </router-link>
        </b-card>
      </div>
    </section>
  </div>
</template>

<script>
import {BIcon} from "bootstrap-vue";
import jwtDecode from 'jwt-decode';
import http from '@/utils/api/http';
import {mapActions, mapState} from 'vuex';
import 'animate.css';
import TagSearchBar from "@/components/home/TagSearchBar.vue";

export default {
  name: "TheIndex",
  components: { BIcon, TagSearchBar },
  data() {
    return {
      slideIds : ["slide1-bg","slide2-bg","slide3-bg","slide4-bg","slide5-bg"]
    };
  },
  created() {
    if (this.isLogin && sessionStorage.getItem("access-token")) {
      this.getMemberInfo();
    } else {
      this.setIsLogin(false)
      this.setLoginMember(null)
    }

  },
  computed: {
    ...mapState("memberStore", ["isLogin"])
  },
  methods: {
    ...mapActions("memberStore", ["setIsLogin", "setLoginMember"]),
    getMemberInfo() {
      const accessToken = sessionStorage.getItem("access-token");
      const decodedAccessToken = jwtDecode(accessToken);
      const memberId = decodedAccessToken.memberId;

      http
          .get(`/member/info/${memberId}`)
          .then((res) => {
            console.log("[loginMember]");
            console.log(res.data.loginMember)
            this.setLoginMember(res.data.loginMember);
          })
          .catch((error) => {
            console.log("[로그인 에러] " + error);
            this.$alertDanger(
                "사용자 정보 불러오기 실패 !",
                "추후 예외처리 추가 예정"
            );
          });
    },
    previousSlide() {
      this.$refs.carousel.prev();
    },
    nextSlide() {
      this.$refs.carousel.next();
    }
  },
};
</script>

<style scoped>
.card-title {
  color : var(--main-color);
  text-decoration : underline
}
</style>
