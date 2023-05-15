<template>
  <div>
    <section class="container">
      <div class="text-center" style="padding-top: 40px">
        <h2 class="section-heading">회원가입</h2>
        <h3 class="section-subheading text-muted">
          <p class="sub-title">여행을 떠날 준비가 되셨나요?</p>
          <hr />
        </h3>
      </div>

      <!-- Form 영역 -->
      <form @submit.prevent>
        <div class="row">
          <!-- 로그인 정보 -->
          <div class="form-group col-md-12 col-md-12 mb-3">
            <label for="login-id">아이디</label>
            <input
              type="text"
              class="form-control"
              id="login-id"
              v-model="memberInfo.loginId"
              placeholder="아이디 입력"
            />
            <small id="login-id-help" class="form-text text-muted"
              >안보이다가 틀리면 보이게할거임</small
            >
          </div>
          <div class="form-group col-md-12 mb-3">
            <label for="login-pwd">비밀번호</label>
            <input
              type="password"
              class="form-control"
              id="login-pwd"
              v-model="memberInfo.loginPwd"
              placeholder="비밀번호 입력"
            />
            <small id="login-pwd-help" class="form-text text-muted"
              >안보이다가 틀리면 보이게할거임</small
            >
          </div>
          <div class="form-group col-md-12 mb-5">
            <label for="login-pwd-confirm">비밀번호 확인</label>
            <input
              type="password"
              class="form-control"
              id="login-pwd-confirm"
              v-model="memberInfo.loginPwdConfirm"
              placeholder="비밀번호 재입력"
            />
            <small id="login-pwd-confirm-help" class="form-text text-muted"
              >안보이다가 틀리면 보이게할거임</small
            >
          </div>
          <!-- 개인 정보 -->
          <div class="col-md-6 pr-1">
            <label for="first-name">이름</label>
            <input
              type="text"
              class="form-control"
              id="first-name"
              v-model="memberInfo.firstName"
            />
          </div>
          <div class="col-md-6 mb-3 pl-1">
            <label for="last-name">성</label>
            <input
              type="text"
              class="form-control"
              id="last-name"
              v-model="memberInfo.lastName"
            />
          </div>
          <!-- https://bootstrap-vue.org/docs/components/form-datepicker#date-constraints -->
          <div class="col-md-12 mb-5">
            <label for="example-datepicker">생년월일</label>
            <b-form-datepicker
              id="example-datepicker"
              v-model="memberInfo.birth"
              class="mb-2"
            />
          </div>

          <div class="col-md-12 mb-3">
            <label for="email">이메일</label>
            <input
              type="email"
              class="form-control"
              id="email"
              v-model="memberInfo.email"
            />
          </div>
          <!-- 주소 -->
          <!-- TODO : 추후에 주소 조회 api 연동 -->
          <div class="col-md-3 mb-3 pr-1">
            <label for="zipcode">우편번호</label>
            <input
              type="text"
              class="form-control"
              id="zipcode"
              v-model="memberInfo.zipcode"
            />
          </div>
          <div class="col-md-9 mb-3 pl-1">
            <label for="main-address">주소</label>
            <input
              type="text"
              class="form-control"
              id="main-address"
              v-model="memberInfo.mainAddress"
              placeholder="주소 선택"
            />
          </div>
          <div class="col-md-12 mb-5">
            <label for="sub-address">상세주소</label>
            <input
              type="text"
              class="form-control"
              id="sub-address"
              v-model="memberInfo.subAddress"
            />
          </div>

          <button
            id="register-btn"
            @click="register"
            class="btn btn-primary col-md-12 mb-5"
          >
            REGISTER
          </button>
        </div>
      </form>
    </section>
  </div>
</template>

<script>
import http from "@/utils/api/http";

export default {
  name: "MemberRegister",
  components: {},
  data() {
    return {
      memberInfo: {
        loginId: "",
        loginPwd: "",
        loginPwdConfirm: "",
        lastName: "",
        firstName: "",
        birth: "",
        email: "",
        zipcode: "",
        mainAddress: "",
        subAddress: "",
        salt: "",
      },
    };
  },
  methods: {
    // 회원가입
    register() {
      const memberInfo = this.memberInfo;
      const convertedBirth = this.$options.filters.convertBirth(
        memberInfo.birth
      );
      memberInfo.birth = convertedBirth;

      http
        .post("/member/sign-up", this.memberInfo)
        .then((res) => {
          if (res.status === 200) {
            this.$alertSuccess("회원가입 완료", "로그인 화면으로 이동합니다.");
            this.$router.replace("/member/login");
          }
        })
        .catch(() => {
          this.$alertDanger("회원가입 실패", "추후 예외 처리 추가 예정");
          //   alert("회원가입 실패 ! 추후에 예외 처리 추가 예정");
        });
    },
  },
  filters: {
    convertBirth(value) {
      return value.slice(2).replaceAll("-", "");
    },
  },
  created() {},
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

#register-btn {
  height: 50px;
}
.container {
  width: 456px !important;
}

.sub-title {
  font-size: 0.8em;
}
</style>
