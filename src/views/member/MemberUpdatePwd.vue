<template>
    <!-- Login Section -->
<section id="login-section">
    <div class="container">
        <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col-lg-12 col-xl-11">
                <div class="card text-black shadow" style="border-radius: 25px">
                    <div class="card-body p-md-5 sh">
                        <div class="row justify-content-center">
                            <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                               

                                <!-- 비밀번호 찾기 -->
                                <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                                    Change Password
                                </p>
                                <form class="mx-1 mx-md-4" id='login-form'>
                                    <div class="d-flex flex-row mb-4">
                                        <div class="form-outline flex-fill mb-4">
                                            <label for="current-pwd">비밀번호</label>                     
                                            <div class="input-group">
                                                <input 
                                                    type="password" 
                                                    placeholder="현재 비밀번호" 
                                                    v-model="changePwdInfo.currentLoginPwd" 
                                                    id="current-pwd" 
                                                    ref="current-pwd" 
                                                    name="current-pwd" 
                                                    class="form-control"
                                                />
                                                <b-button variant="right" type="button" @click="showLoginPwd">
                                                    <b-icon
                                                    ref="icon"
                                                    :icon="loginPwdShow ? 'eye-fill' : 'eye-slash-fill'"
                                                    font-scale="1.5"
                                                    ></b-icon>
                                                </b-button>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="d-flex flex-row mb-4">
                                        <div class="form-outline flex-fill mb-0">
                                            <label class="form-label" for="new-pwd">새로운 비밀번호</label>
                                            <div class="input-group">
                                            <input 
                                                type="password" 
                                                placeholder="새로운 비밀번호" 
                                                v-model="changePwdInfo.newLoginPwd"
                                                @keyup="validationPwd" 
                                                id="new-pwd" 
                                                ref="new-pwd" 
                                                name="new-pwd" 
                                                class="form-control"/>
                                                <b-button variant="right" type="button" @click="showNewLoginPwd">
                                                    <b-icon
                                                    ref="new-icon"
                                                    :icon="loginNewPwdShow ? 'eye-fill' : 'eye-slash-fill'"
                                                    font-scale="1.5"
                                                    ></b-icon>
                                                </b-button>
                                            </div>
                                            <small id="new-pwd-help" ref="new-pwd-help" class="form-text text-muted">{{newPwdMsg}}</small>
                                        </div>
                                    </div>

                                    <div class="d-flex flex-row mb-4">
                                        <div class="form-outline flex-fill mb-0">
                                            <label class="form-label" for="new-pwd-confirm">새로운 비밀번호 확인</label>
                                            <input 
                                                type="password" 
                                                placeholder="새로운 비밀번호 확인" 
                                                v-model="newLoginPwdConfirm" 
                                                id="new-pwd-confirm" 
                                                ref="new-pwd-confirm" 
                                                @keyup="pwdLengthCheck"
                                                @copy="preventCopyPaste" @cut="preventCopyPaste" @paste="preventCopyPaste" 
                                                name="new-pwd-confirm" 
                                                class="form-control"/>
                                            <small id="new-pwd-confirm-help" ref="new-pwd-confirm-help" class="form-text text-muted">{{newPwdCheckMsg}}</small>
                                        </div>
                                    </div>

                                    <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                        <button type="button" @click="change" class="btn btn-primary btn-lg" id="find-pwd-button">
                                            비밀번호 변경
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</section>
</template>


<script>
import http from "@/utils/api/http";
import { BIcon } from "bootstrap-vue";
import { mapState } from "vuex";

export default {
    name: "MemberUpdatePwd",
    component:{BIcon},

    data(){
        return{
            changePwdInfo:{
                id:"",
                currentLoginPwd:"",
                newLoginPwd:"",
                
            },
            newLoginPwdConfirm:"",
            loginPwdShow : false,
            loginNewPwdShow : false,
            newPwdMsg : "영문 숫자 특수기호를 조합하여 8자리 이상의 비밀번호를 입력하세요.",
            newPwdCheckMsg : "비밀번호를 한번 더 입력하세요.",
            validationCheck : false,
            canChange : false,
           
            
        };
    },
    computed: {
        ...mapState("memberStore", ["loginMember"]),
    },
    methods: {
        validationPwd(){ // 새로운 비밀번호 검증
            var pattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
            var isValid = pattern.test(this.changePwdInfo.newLoginPwd);
            const pwdMsgBox = this.$refs["new-pwd-help"]; 
            if(isValid){
                pwdMsgBox.className = "form-text text-primary";
                this.newPwdMsg = "비밀번호가 유효합니다.";
                this.validationCheck = true;
            }else{
                pwdMsgBox.className = "form-text text-danger";
                this.newPwdMsg = "영문 숫자 특수기호를 조합하여 8자리 이상의 비밀번호를 입력하세요.";
                this.validationCheck = false;
            }
            this.pwdLengthCheck();
        },
        pwdLengthCheck(){
            const pwdMsgBox = this.$refs["new-pwd-confirm-help"];
            if(this.newLoginPwdConfirm.length == 0){
                pwdMsgBox.className = "form-text text-muted";
                this.newPwdCheckMsg = "비밀번호를 한번 더 입력하세요." 
                this.canChange = false;
            }
            else if(this.changePwdInfo.newLoginPwd != this.newLoginPwdConfirm){
                pwdMsgBox.className = "form-text text-danger";
                this.newPwdCheckMsg = "비밀번호가 동일하지 않습니다."
                this.canChange = false; 
            }
            else if(this.changePwdInfo.newLoginPwd == this.newLoginPwdConfirm){
                pwdMsgBox.className = "form-text text-primary";
                this.newPwdCheckMsg = "비밀번호가 동일합니다."
                this.canChange = true; 
            }

        },
        showLoginPwd(){
            const loginPwdBox = this.$refs["current-pwd"];
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
        showNewLoginPwd(){
            const loginPwdBox = this.$refs["new-pwd"];
            const icon = this.$refs["new-icon"];
            
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
        preventCopyPaste(event) {
            event.preventDefault();
        },
        
        change(){
            if(!this.changePwdInfo.currentLoginPwd){
                this.$alertDanger("비밀번호 변경 실패.","모든 정보를 입력해 주세요.")
                this.$refs["current-pwd"].focus();
                return ;
            }

            if(!this.changePwdInfo.newLoginPwd){
                this.$alertDanger("비밀번호 변경 실패.","모든 정보를 입력해 주세요.")
                this.$refs["new-pwd"].focus();
                return ;
            }

            if(!this.newLoginPwdConfirm){
                this.$alertDanger("비밀번호 변경 실패.","모든 정보를 입력해 주세요.")
                this.$refs["new-pwd-confirm"].focus();
                return ;
            }

            if(!this.validationCheck){ // 유효성 검사
                this.$alertDanger("비밀번호 재입력.","영문 숫자 특수기호를 조합하여 8자리 이상의 비밀번호를 입력하세요.")
                this.$refs["new-pwd"].focus();
                return;
            }

            if(!this.canChange){ // 비밀번호 확인 했는지.
                this.$alertDanger("새로운 비밀번호 확인.","새로운 비밀번호를 확인해주세요.")
                this.$refs["new-pwd-confirm"].focus();
                return;
            }
            this.changePwdInfo.id = this.loginMember.id;
            const changePwdInfo = this.changePwdInfo;
            // console.log(this.changePwdInfo.id);
            http
                .put("/member/password", changePwdInfo)
                .then((res) => {
                    if(res.status ===200){
                        this.$alertSuccess("비밀번호 변경 완료", "비밀번호가 성공적으로 변경되었습니다.");
                    }
                })
                .catch(() => {
                    this.$alertDanger("비밀번호 변경 실패", "올바른 정보를 입력해주세요.");
                })
        }

    }
}
</script>

<style scoped>
#login-section{
  padding : 9rem 0;
}

.btn:active, .btn:focus {
outline:none !important;
box-shadow:none !important;}



container,
.container-fluid,
.container-xxl,
.container-xl,
.container-lg,
.container-md,
.container-sm {
  width: 100%;
  padding-right: var(--bs-gutter-x, 0.75rem);
  padding-left: var(--bs-gutter-x, 0.75rem);
  margin-right: auto;
  margin-left: auto;
}
</style>