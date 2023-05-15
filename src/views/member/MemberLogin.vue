<template>
  <div>
    <section class="container">
      <div class="text-center" style="padding-top: 40px">
        <h2 class="section-heading">로그인</h2>
        <hr />
      </div>

      <!-- Form 영역 -->
      <form>
        <div class="row">
          <!-- 로그인 정보 -->
          <div class="form-group mb-3">
            <label for="login-id">아이디</label>
            <input type="text" class="form-control" id="login-id" />
            <small id="login-id-help" class="form-text text-muted"
              >안보이다가 틀리면 보이게할거임</small
            >
          </div>
          <div class="form-group mb-4">
            <label for="login-pwd">비밀번호</label>
            <input type="text" class="form-control" id="login-pwd" />
          </div>

          <button id="login-btn" type="submit" class="btn btn-primary">
            LOGIN
          </button>
        </div>
      </form>

      <ul class="link_rel">
        <li>
          <router-link to="/">아이디 또는 비밀번호를 분실하셨나요?</router-link>
        </li>
        <li>
          <router-link to="/member/register">회원가입</router-link>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
export default {
  name: "MemberSignUp",
  components: {},
  data() {
    return {
      message: "",
    };
  },
  created() {},
  methods: {},
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
