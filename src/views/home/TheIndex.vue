<template>
  <div>
    <div style="position : relative">
      <!-- 배너 고정 문구 -->
      <div
        style="top : 10%; left: 20%; position:absolute; z-index: 99;"
        class="masthead"
      >
        <div class="masthead-subheading animate__animated animate__fadeInDown">
          wherever you go,
        </div>
        <div
          class="masthead-heading text-uppercase animate__animated animate__fadeInDown"
        >
          FAR AWAY
        </div>
        <router-link
          style="width: 180px; line-height: 40px"
          class="btn btn-primary btn-xl text-uppercase animate__animated animate__fadeInDown"
          to="/attraction/index"
          >Search Place
        </router-link>
      </div>
      <!-- 타이틀(masthead) 영역 -->
      <carousel
        ref="carousel"
        :autoplay="true"
        :loop="true"
        :navigation-enabled="true"
        :per-page="1"
        :autoplay-timeout="4000"
        :speed="800"
        navigationNextLabel="▶"
        navigationPrevLabel="◀"
      >
        <!-- 슬라이드 1 -->
        <slide v-for="slideId in slideIds" :key="slideId">
          <div :id="slideId" class="masthead-img" />
        </slide>
      </carousel>
    </div>
    <div class="container mt-5 text-center">
      <h2
        class="mt-5 section-subheading text-muted animate__animated animate__fadeInDown"
      >
        <p style="color:var(--main-color); " class="font-weight-bold">
          <span style="color:#00A67E; font-weight: bold;">CHAT GPT</span>
          에게 물어보세요 !
        </p>
      </h2>
      <!-- GPT 검색 -->
      <tag-search-bar @submitTags="getTagSearchResult" />
      <div v-if="isFinding">
        <div v-if="tagSearchResults.length">
          <div
            v-for="result,idx in tagSearchResults"
            :key="idx"
            id="tag-search-results"
          >
            <b-card :title="result.destinationName" class="mt-3">
              <b-card-text>
                <span style="font-weight: bold;">{{ result.region }} 소재</span>
              </b-card-text>
              <b-card-text>
                <span style="font-weight: bold;">관광지 설명</span> :
                {{ result.description }}
              </b-card-text>
              <b-card-text>
                <span style="font-weight: bold;">추천 이유</span> :
                {{ result.recommendationReason }}
              </b-card-text>
              <a
                :href="'https://search.naver.com/search.naver?query=' + result.destinationName"
                class="card-link"
                target="_blank"
                style="color: #03c85a;"
                >네이버 검색하기</a
              >
            </b-card>
          </div>
        </div>
        <div v-else>
          <!-- 로딩 -->
          <p class="text-muted mt-3">
            <span style="color:#00A67E">CHAT GPT</span>가 답변중이에요!
            (네트워크 환경에 따라 최대 1분이 소요될 수 있습니다.)
          </p>
          <b-spinner
            style="margin: 5px; width: 0.9rem; height:0.9rem"
            v-for="idx in 3"
            :key="idx"
            variant="success"
            type="grow"
          ></b-spinner>
        </div>
      </div>
    </div>
    <!-- 메인 섹션 -->
    <section class="container">
      <div class="text-center" style="margin: 80px 0">
        <h2
          class="section-subheading text-muted animate__animated animate__fadeInDown"
        >
          <p style="color:var(--main-color); " class="font-weight-bold">
            이번 여름, 어디로 떠나실건가요?
          </p>
        </h2>
        <h1
          class="section-heading text-uppercase animate__animated animate__fadeInDown"
        >
          대한민국의 다양한 관광지와 컨텐츠를 찾아보세요 !
        </h1>
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
            여행을 떠나려는 지역의<br />
            관광지와 명소를 찾아보세요.
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
            나만의 완벽한 여행계획! <br />함께 공유해요.
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
            요즘 뜨고 있는 <br />핫플은 어디일까요?
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
      slideIds: ["slide1-bg", "slide2-bg", "slide3-bg", "slide4-bg", "slide5-bg"],
      tagSearchResults: [],
      isFinding: false,
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
    },
    getTagSearchResult(value) {
      this.$alertSuccess("GPT에게 여행지 추천을 요청합니다.", `입력된 키워드 : ${value}`)

      this.isFinding = true;
      this.tagSearchResults = [];

      // api-key (TODOS :: 보안 필요)
      const api_key = process.env.VUE_APP_OPEN_AI_API_KEY
      const url = "https://api.openai.com/v1/chat/completions"
      // message
      const messages = [
        { role: 'system', content: '대한민국 관광지,맛집,명소 등을 소개해주는 유용한 가이드야. 최소 3개 정도는 추천을 해줘야 해. {travelDestinations : { region : 지역명, destinationName : 여행지, description : 여행지 설명, recommendationReason : 추천 사유 }}와 같은 JSON 형태로 작성해줘야해. (key는 앞서 적은 것과 동일하게 출력해줘)' },
        { role: 'user', content: `'${value.toString()}' 키워드들과 꼭 연관이있는 국내 여행지를 JSON 형태로 추천해줘.` },
      ]

      // data
      const data = {
        model: 'gpt-3.5-turbo',
        temperature: 0.5,
        n: 1,
        messages: messages,
      }

      http.post(url, JSON.stringify(data), {
        headers: {
          Authorization: "Bearer " + api_key,
          'Content-Type' : "application/json"
        }
      }).then(res => {
        console.log(res)
        if (res.status === 200) {
          this.tagSearchResults = JSON.parse(res.data.choices[0].message.content).travelDestinations;
        }
      })
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
