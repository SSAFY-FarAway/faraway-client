<template>
    <div>
        <section class="container">
        <div class="text-center" style="padding-top:40px">
            
          <h2 class="section-heading">회원가입</h2>
          <h3 class="section-subheading text-muted">
            <p class="sub-title">
             여행을 떠날 준비가 되셨나요?
            </p>
            <hr/>
          </h3>
        </div>
        
        <!-- Form 영역 -->
        <form>
            <div class="row">
                <!-- 로그인 정보 -->
                <div class="form-group mb-3">
                    <label for="login-id">아이디</label>
                    <input type="text" class="form-control" id="login-id" placeholder="아이디를 입력하세요.">
                    <small id="login-id-help" class="form-text text-muted">안보이다가 틀리면 보이게할거임</small>
                </div>
                <div class="form-group mb-3">
                    <label for="login-pwd">비밀번호</label>
                    <input type="text" class="form-control" id="login-pwd" placeholder="비밀번호를 입력하세요.">
                    <small id="login-pwd-help" class="form-text text-muted">안보이다가 틀리면 보이게할거임</small>
                </div>
                <div class="form-group mb-5">
                    <label for="login-pwd-confirm">비밀번호 확인</label>
                    <input type="text" class="form-control" id="login-pwd-confirm" placeholder="비밀번호를 재입력하세요.">
                    <small id="login-pwd-confirm-help" class="form-text text-muted">안보이다가 틀리면 보이게할거임</small>
                </div>
                <!-- 개인 정보 -->
                <div class="col-md-6 pe-1">
                  <label for="first-name">이름</label>
                  <input type="text" class="form-control" id="first-name" value="Mark" required>
                </div>
                <div class="col-md-6 mb-3 ps-1">
                  <label for="last-name">성</label>
                  <input type="text" class="form-control" id="last-name" value="Otto" required>
                </div>
                <!-- https://bootstrap-vue.org/docs/components/form-datepicker#date-constraints -->
                <div class="col-md-12 mb-5">
                    <label for="example-datepicker">생년월일</label>
                    <b-form-datepicker id="example-datepicker" v-model="value" class="mb-2"/>
                </div>
              <!-- 주소 -->
              <!-- TODO : 추후에 주소 조회 api 연동 -->
                <div class="col-md-3 mb-3 pe-1">
                    <label for="inputZip">우편번호</label>
                    <input type="text" class="form-control" id="inputZip">
                </div>
                <div class="col-md-9 mb-3 ps-1">
                    <label for="inputAddress">주소</label>
                    <input type="text" class="form-control" id="inputAddress" placeholder="주소 선택">
                </div>
                <div class="col-md-12 mb-5">
                    <label for="inputAddress2">상세주소</label>
                    <input type="text" class="form-control" id="inputAddress2" >
                </div>

                <button id="register-btn" type="submit" class="btn btn-primary">Register</button>
            </div>
        </form>
      </section>
    </div>
</template>

<script>
export default {
    name: 'MemberRegister',
    components: {},
    data() {
        return {
            message: '',
        };
    },
    created() {},
    methods: {},
};
</script>

<style scoped>
label{
    font-size: 0.9em;
}

small {
    font-size: 0.8em;
}

div { 
    padding : 0px;
}

#register-btn {
    height: 50px;
}
.container {
    width : 456px!important;
}

.sub-title {
    font-size: 0.8em;
}
</style>