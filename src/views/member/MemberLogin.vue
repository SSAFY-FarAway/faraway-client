<template>
  <div>
    <section class="container">
      <div class="text-center" style="padding-top: 40px">
        <h2 class="section-heading">로그인</h2>
        <hr />
      </div>

      <!-- Form 영역 -->
      <form @submit.prevent>
        <div class="row">
          <!-- 로그인 정보 -->
          <div class="form-group col-md-12 mb-3">
            <label for="login-id">아이디</label>
            <input
              type="text"
              class="form-control"
              id="login-id"
              v-model="loginMember.loginId"
            />
            <!-- <small id="login-id-help" class="form-text text-muted"
              >6자리 이상의 아이디를 입력하세요.</small
            > -->
          </div>
          <div class="form-group col-md-12 mb-4">
            <label for="login-pwd">비밀번호</label>
            <input
              type="password"
              class="form-control"
              id="login-pwd"
              v-model="loginMember.loginPwd"
            />
          </div>

          <button
            id="login-btn"
            @click="login(loginMember)"
            class="btn btn-primary col-md-12"
          >
            LOGIN
          </button>
        </div>
      </form>

      <ul class="link_rel">
        <li>
          <router-link to="/member/find"
            >아이디 또는 비밀번호를 분실하셨나요?</router-link
          >
        </li>
        <li>
          <router-link to="/member/register">회원가입</router-link>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
import http from '@/utils/api/http';
import { mapActions } from 'vuex';

export default {
  name: "MemberSignUp",
  components: {},
  data() {
    return {
      loginMember: {
        loginId: "",
        loginPwd: "",
      },
    };
  },
  created() {},
  methods: {
    ...mapActions("memberStore", ["setIsLogin","setLoginMember"]),
    login() {
      http.post("/member/login", this.loginMember).then(res => {
        console.log(res)
        if (res.status === 200) {
          this.$alertSuccess("로그인 성공", "메인페이지로 이동합니다.")
          this.setIsLogin(true)
          this.setLoginMember(res.data)
          this.$router.replace("/") 
        }
      }).catch(() => {
        this.$alertDanger("로그인 실패", "로그인에 실패했습니다. 추후 예외 처리 로직 추가")
        this.setIsLogin(false)
      })
    }

  },
};
</script>

<style scoped>
label {
  font-size: 0.9em;
}

small {
  font-size: 0.8em;
}

div {
  padding: 0px;
}

.container {
  width: 456px !important;
}

.sub-title {
  font-size: 0.8em;
}

.link_rel {
  margin-top: 40px;
  padding: 0;
  text-align: center;
}
.link_rel ul,
li {
  list-style: none;
  display: block;
  display: inline-block;
}

.link_rel li:before {
  content: "";
  width: 1px;
  height: 10px;
  background: #cdcdcd;
  margin: -3px 13px 0 12px;
  vertical-align: middle;
  display: inline-block;
}

.link_rel li:first-child::before {
  display: none;
}

#login-btn {
  height: 50px;
}
</style>
