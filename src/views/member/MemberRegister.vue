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
            <input v-focus
              type="text"
              class="form-control"
              id="login-id"
              ref="loginId"
              @keyup="idCheck"
              v-model="registerMember.loginId"
              placeholder="아이디 입력" 
            />
            <small id="login-id-help" ref="login-id-help" class="form-text text-muted"
              >{{idCheckMsg}}</small
            >
          </div>
          <div class="form-group col-md-12 mb-3">
            <label for="login-pwd">비밀번호</label>
            <div class="row">
              <div class="col-md-10 ml-3">
                <input
                  type="password"
                  class="form-control"
                  id="login-pwd"
                  @keyup="validationPwd"
                  ref="loginPwd"
                  v-model="registerMember.loginPwd"
                  placeholder="비밀번호 입력"
                />
              </div>
              <div class="col-md-auto">
              <b-button variant="right">
                <b-icon 
                  @click="showLoginPwd"
                  class="fas fa-lg me-3 fa-fw"
                  ref="icon"
                  :icon="loginPwdShow ? 'eye-fill' : 'eye-slash-fill'"
                  font-scale="1.5"
                  ></b-icon>
              </b-button>
              
              </div>
            </div>
            <small id="login-pwd-help" ref="login-pwd-help" class="form-text text-muted"
              >{{pwdMsg}}</small
            >
          </div>

          <div class="form-group col-md-12 mb-5">
            <label for="login-pwd-confirm">비밀번호 확인</label>
            <input
              type="password"
              class="form-control"
              id="login-pwd-confirm"
              ref="loginPwdConfirm"
              @keyup="pwdLengthCheck"
              @copy="preventCopyPaste" @cut="preventCopyPaste" @paste="preventCopyPaste" 
              v-model="registerMember.loginPwdConfirm"
              placeholder="비밀번호 재입력"
            />
            <small id="login-pwd-confirm-help" ref="login-pwd-confirm-help" class="form-text text-muted"
              >{{pwdCheckMsg}}</small
            >     
          </div>
          <!-- 개인 정보 -->
          <div class="col-md-6 pr-1">
            <label for="last-name">성</label>
            <input
              type="text"
              class="form-control"
              id="last-name"
              ref="lastName"
              v-model="registerMember.lastName"
            />
          </div>
          <div class="col-md-6 mb-3 pl-1">
            <label for="first-name">이름</label>
            <input
              type="text"
              class="form-control"
              id="first-name"
              ref="firstName"
              v-model="registerMember.firstName"
            />
          </div>
          
          <!-- https://bootstrap-vue.org/docs/components/form-datepicker#date-constraints -->
          <div class="col-md-6 mb-3 pr-1">
            <label for="birth">생년월일</label>
            <input
              type="text"
              class="form-control"
              id="birth"
              ref="birth"
              maxlength="6"
              placeholder="ex)990215"
              v-model="registerMember.birth"
            />
          </div>


          <div class="col-md-12 mb-3">
            <label for="email">이메일</label>
            <input
              type="email"
              class="form-control"
              id="email"
              ref="email"
              v-model="registerMember.email"
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
              @click="findZipCode"
              readonly
              v-model="registerMember.zipcode"
            />
          </div>
          <div class="col-md-3 mb-3 ml-2 pr-1">
            <label for="zipcodeFind" style="visibility: hidden">찾기</label>
            <input type="button" 
              class="btn btn-primary"
              @click="findZipCode" 
              value="우편번호 찾기"
              />
          </div>
          <!-- <div class="col-md-9 mb-3 pl-1"> -->
          <div class="col-md-12 mb-3">
            <label for="main-address">주소</label>
            <input
              type="text"
              class="form-control"
              id="main-address"
              readonly
              v-model="registerMember.mainAddress"
            />
          </div>
          <div class="col-md-12 mb-5">
            <label for="sub-address">상세주소</label>
            <input
              type="text"
              class="form-control"
              id="sub-address"
              ref="subAddress"
              v-model="registerMember.subAddress"
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
import { BIcon } from "bootstrap-vue";


export default {
  name: "MemberRegister",
  components: {BIcon},
  data() {
    return {
      idCheckMsg :"6자리 이상의 아이디를 입력하세요.",
      pwdCheckMsg : "비밀번호를 한번 더 입력하세요.",
      pwdMsg : "영문 숫자 특수기호를 조합하여 8자리 이상의 비밀번호를 입력하세요.",
      loginPwdShow : false, //true : 보여주기 , false : 숨기기
      registerMember: {
        loginId: "",
        loginPwd: "",
        loginPwdConfirm: "",
        firstName: "",
        lastName: "",
        birth: "",
        email: "",
        zipcode: "",
        mainAddress: "",
        subAddress: "",
      },
    };
  },
  
  methods: {
    // 회원가입
    register() {
      const registerMember = this.registerMember;
      // const convertedBirth = this.$options.filters.convertBirth(
      //   registerMember.birth
      // );
      // registerMember.birth = convertedBirth;
      
      for (let key in registerMember) {
        console.log(key);
        if (!registerMember[key]) {
          if(key == "zipcode"){
            this.$alertDanger("회원가입에 실패했습니다.","주소를 찾아주세요.")
            return;
          }
          this.$alertDanger("회원가입에 실패했습니다.","모든 정보를 입력해 주세요.")
          this.$refs[key].focus();
          return ;
        }
      }
      if(registerMember.birth.length != 6){
        this.$alertDanger("생년월일이 6자리가 아닙니다.","정확히 정보를 입력해 주세요.")
        this.$refs["birth"].focus();
        return;
      }

      http
        .post("/member/sign-up", this.registerMember)
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            this.$alertSuccess("회원가입 완료", "로그인 화면으로 이동합니다.");
            this.$router.replace("/member/login");
          }
        })
        .catch((error) => {
          console.log(error);
          console.log(this.res);
          this.$alertDanger("회원가입 실패", "추후 예외 처리 추가 예정");
          //   alert("회원가입 실패 ! 추후에 예외 처리 추가 예정");
        });
    },
    idCheck(){
      const idMsgBox = this.$refs["login-id-help"];
      if(this.registerMember.loginId.length < 6){
        this.idCheckMsg = "6자리 이상의 아이디를 입력하세요.";
        idMsgBox.className = "form-text text-muted";
        return;
      }
      http
        .get(`/member/check/${this.registerMember.loginId}`)
        .then((res) => {
          console.log("아이디 중복 체크 " + res);
          if(res.status === 200){
            idMsgBox.className = "form-text text-primary";
            this.idCheckMsg = "사용 가능한 아이디입니다.";
          }
        })
        .catch(() => {
          idMsgBox.className = "form-text text-danger";
          this.idCheckMsg = "사용 불가능한 아이디 입니다.";
        })
      
    },
    validationPwd(){
        var pattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
        var isValid = pattern.test(this.registerMember.loginPwd);
        const pwdMsgBox = this.$refs["login-pwd-help"]; 
        if(isValid){
          pwdMsgBox.className = "form-text text-primary";
          this.pwdMsg = "비밀번호가 유효합니다.";
        }else{
          pwdMsgBox.className = "form-text text-danger";
          this.pwdMsg = "영문 숫자 특수기호를 조합하여 8자리 이상의 비밀번호를 입력하세요.";
        }
    },

    pwdLengthCheck(){
      const pwdMsgBox = this.$refs["login-pwd-confirm-help"];
      if(this.registerMember.loginPwdConfirm.length == 0){
        pwdMsgBox.className = "form-text text-muted";
        this.pwdCheckMsg = "비밀번호를 한번 더 입력하세요." 
      }
      else if(this.registerMember.loginPwd != this.registerMember.loginPwdConfirm){
          pwdMsgBox.className = "form-text text-danger";
          this.pwdCheckMsg = "비밀번호가 동일하지 않습니다." 
      }
      else if(this.registerMember.loginPwd == this.registerMember.loginPwdConfirm){
          pwdMsgBox.className = "form-text text-primary";
          this.pwdCheckMsg = "비밀번호가 동일합니다." 
      }

    },
    preventCopyPaste(event) {
      event.preventDefault();
    },

    showLoginPwd(){
      const loginPwdBox = this.$refs["loginPwd"];
      const icon = this.$refs["icon"];
    
      if(this.loginPwdShow){
        loginPwdBox.type = "password";
        this.loginPwdShow = false;
        icon.icon = "eye-slash-fill";
      }else{
        loginPwdBox.type = "text";
        this.loginPwdShow = true;
        icon.icon = "eye-fill";
      }
    },
    
    findZipCode(){
      new window.daum.Postcode({
        oncomplete: (data) => {
            // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

            // 도로명 주소의 노출 규칙에 따라 주소를 조합한다.
            // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
            let fullRoadAddr = data.roadAddress; // 도로명 주소 변수
            let extraRoadAddr = ''; // 도로명 조합형 주소 변수

            // 법정동명이 있을 경우 추가한다. (법정리는 제외)
            // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
            if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
                extraRoadAddr += data.bname;
            }
            // 건물명이 있고, 공동주택일 경우 추가한다.
            if(data.buildingName !== '' && data.apartment === 'Y'){
              extraRoadAddr += (extraRoadAddr !== '' ? ', ' + data.buildingName : data.buildingName);
            }
            // 도로명, 지번 조합형 주소가 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
            if(extraRoadAddr !== ''){
                extraRoadAddr = ' (' + extraRoadAddr + ')';
            }
            // 도로명, 지번 주소의 유무에 따라 해당 조합형 주소를 추가한다.
            if(fullRoadAddr !== ''){
                fullRoadAddr += extraRoadAddr;
            }

            // 우편번호와 주소 정보를 해당 필드에 넣는다.
            this.registerMember.zipcode = data.zonecode; //5자리 새우편번호 사용
            this.registerMember.mainAddress = fullRoadAddr;
        }
       }).open()
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

.btn:active, .btn:focus {
outline:none !important;
box-shadow:none !important;}
</style>
