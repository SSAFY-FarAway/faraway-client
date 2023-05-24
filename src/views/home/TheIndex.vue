  <template>
  <div>
    <!-- 타이틀(masthead) 영역 -->
    <header class="masthead">
      <div>
        <div  class="masthead-subheading animate__animated animate__fadeInDown">wherever you go,</div>
        <div class="masthead-heading text-uppercase animate__animated animate__fadeInDown">FAR AWAY</div>
        <router-link
          style="width: 180px; line-height: 40px"
          class="btn btn-primary btn-xl text-uppercase animate__animated animate__fadeInDown"
          to="/attraction/index"
          >Search Place</router-link
        >
      </div>
    </header>
    <!-- 메인 섹션 -->
    <section class="container py-5">
      <div class="text-center" style="margin: 80px 0">
        <h1 class="section-heading text-uppercase animate__animated animate__fadeInDown">Customize Your Travel</h1>
        <h2 class="section-subheading text-muted animate__animated animate__fadeInDown">
          <p>
            You can make your own Plan By our Website And Share your Gorgeous
            Plan!
          </p>
        </h2>
      </div>

      <!-- 카드 영역 -->
      <div class="d-flex justify-content-center " style="margin-bottom: 100px">
        <b-card
          title="Travel With Your Friends"
          style="max-width: 20rem; position: relative; border: none"
          class="mb-2 mx-5 text-center animate__animated animate__fadeInRight"
        >
          <b-icon
            class="my-5 "
            style="width: 100%; height: 200px; color: var(--main-color)"
            icon="people"
            animation="fade"
            font-scale="4"
          ></b-icon>
          <b-card-text>
            친구와 떠나는 신나는 이번 여행,<br />어떤 경로로 가면 좋을까요?
          </b-card-text>
        </b-card>
        <b-card
          title="Where To Go?"
          style="max-width: 20rem; position: relative; border: none"
          class="mb-2 mx-5 text-center animate__animated animate__fadeInRight"
        >
          <b-icon
            class="my-5"
            style="width: 100%; height: 200px; color: var(--main-color)"
            icon="compass"
            animation="fade"
            font-scale="4"
          ></b-icon>
          <b-card-text>
            어디로 여행을 가면 좋을까요?<br />추천해주세요 !
          </b-card-text>
        </b-card>
        <b-card
          title="You get Tired ?"
          style="max-width: 20rem; position: relative; border: none"
          class="mb-2 mx-5 text-center animate__animated animate__fadeInRight"
        >
          <b-icon
            class="my-5 "
            style="width: 100%; height: 200px; color: var(--main-color)"
            icon="emoji-dizzy"
            animation="fade"
            font-scale="4"
          ></b-icon>
          <b-card-text>
            피곤에 찌든 자여,<br />지금 당장 여행을 떠나라 ~
          </b-card-text>
        </b-card>
      </div>
    </section>
  </div>
</template>

<script>
import { BIcon } from "bootstrap-vue";
import jwtDecode from 'jwt-decode';
import http from '@/utils/api/http';
import { mapActions, mapState } from 'vuex';
import 'animate.css';


export default {
  name: "TheIndex",
  components: { BIcon },
  data() {
    return {
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
    ...mapState("memberStore",["isLogin"])
  },
  methods: {
    ...mapActions("memberStore",["setIsLogin","setLoginMember"]),
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
    },},
};
</script>

<style scoped></style>
