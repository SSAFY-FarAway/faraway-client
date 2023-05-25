<template>
  <header id="nav-container" class="fixed-top">
    <div class="container">
      <nav id="navbar" class="navbar">
        <div class="logo p-0">
          <h1>
            <router-link to="/"><span>FAR AWAY</span></router-link>
          </h1>
        </div>
        <ul>
          <li>
            <router-link class="nav-link scrollto" to="/attraction/index"
              >Search-Place</router-link
            >
          </li>
          <li>
            <router-link class="nav-link scrollto" to="/plan/list?categoryId=1&title=&content=">Plan</router-link>
          </li>
          <li>
            <router-link class="nav-link scrollto" to="/hot-place/list"
              >Hot-Place</router-link
            >
          </li>
          <li>
            <router-link class="nav-link scrollto" to="/post/1/list?"
              >NOTICE</router-link
            >
          </li>
          <li class="dropdown nav-link">
            <router-link to="/post/2/list">
              <span>
                BOARD
                <b-icon icon="caret-down-fill" font-scale="1" />
              </span>
            </router-link>
            <ul>
              <li>
                <router-link
                  style="cursor: pointer"
                  class="nav-link scrollto nav-link-item"
                  to="/post/2/list"
                  >자유게시판</router-link
                >
              </li>
              <li>
                <router-link
                  class="nav-link scrollto nav-link-item"
                  to="/post/3/list"
                  >Q&A 게시판</router-link
                >
              </li>
            </ul>
          </li>
          <!-- 로그인 했을 때 -->
          <li class="dropdown nav-link" v-if="isLogin">
            <router-link to="/member/mypage">
              {{ loginMember?.loginId }} &nbsp;
              <b-icon icon="person-fill" font-scale="1" />
            </router-link>
            <ul>
              <li>
                <a
                  style="cursor: pointer"
                  class="nav-link scrollto nav-link-item"
                  @click="logout"
                  >LOGOUT</a
                >
              </li>
              <li>
                <router-link
                  class="nav-link scrollto nav-link-item"
                  to="/member/mypage"
                  >MY PAGE</router-link
                >
              </li>

            </ul>
          </li>
          <!-- 로그인 안했을 때 -->
          <li class="dropdown nav-link" v-else>
            <router-link to="/member/login">
              <span>LOGIN <b-icon icon="person-fill" font-scale="1" /></span>
            </router-link>
            <ul>
              <li>
                <router-link
                  class="nav-link scrollto nav-link-item"
                  to="/member/login"
                  >LOGIN</router-link
                >
              </li>
              <li>
                <router-link
                  class="nav-link scrollto nav-link-item"
                  to="/member/register"
                  >REGISTER</router-link
                >
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script>
import { mapActions, mapState } from "vuex";
import jwtDecode from "jwt-decode";
import http from "@/utils/api/http";
import router from '@/router/index';

export default {
  name: "TheNavbar",
  components: {},
  data() {
    return {
      message: "",
    };
  },
  computed: {
    ...mapState("memberStore", ["isLogin", "loginMember"]),
  },
  created() {},
  methods: {
    ...mapActions("memberStore", ["setIsLogin"]),
    async logout() {
      const token = jwtDecode(sessionStorage.getItem("access-token"));

      await http.get(`/member/logout/${token.memberId}`).then((res) => {
        if (res.status === 200) {
          this.$alertSuccess("로그아웃 성공", "메인페이지로 이동합니다.");
          console.log("[로그아웃 성공]")
          console.log(res)
          this.setIsLogin(false);
          if (router.currentRoute.path !== "/index") {
              router.push("/"); // 로그아웃 후 메인 페이지로 이동
            }
        }
      }).catch((error) => {
        this.$alertDanger("로그아웃에 실패했습니다.","잠시 후 다시 시도하세요.")
        console.log("[로그아웃 실패]")
        console.log(error)
      });
    },
  },
};
</script>

<style scoped>
@import "@/assets/css/style.css";
</style>
