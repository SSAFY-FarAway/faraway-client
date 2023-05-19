<template>
  <header id="nav-container" class="fixed-top">
    <div class="container">
      <nav id="navbar" class="navbar">
        <div class="logo">
          <h1>
            <router-link to="/"><span>FAR AWAY</span></router-link>
          </h1>
        </div>
        <ul>
          <li>
            <router-link class="nav-link scrollto" to="/attraction/index"
              >Search Place</router-link
            >
          </li>
          <li>
            <router-link class="nav-link scrollto" to="/plan">Plan</router-link>
          </li>
          <li>
            <router-link class="nav-link scrollto" to="/hotplace"
              >HotPlace</router-link
            >
          </li>
          <li>
            <router-link class="nav-link scrollto" to="/post"
              >Community</router-link
            >
          </li>
          <!-- 로그인 했을 때 -->
          <li class="dropdown" v-if='isLogin'>
            <router-link to="/member/login" style="width:100px;">
              <span>{{loginMember.loginId}} 님</span>
            </router-link>
            <ul>
              <li>
                <a
                  class="nav-link scrollto nav-link-item"
                  @click='setIsLogin(false)'
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
          <li class="dropdown" v-else>
            <router-link to="/member/login"  style="width:100px">
              <span>LOGIN</span>
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
import { mapActions, mapState } from 'vuex';
export default {
  name: "TheNavbar",
  components: {},
  data() {
    return {
      message: "",
    };
  },
  computed: {
    ...mapState("memberStore",["isLogin","loginMember"])
  },
  created() {},
  methods: {
    ...mapActions("memberStore", ["setIsLogin"]),
  },
};
</script>

<style scoped>
@import "@/assets/css/style.css";
</style>
