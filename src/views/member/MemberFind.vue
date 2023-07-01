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
                                <!-- 아이디 찾기 -->
                                <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                                    ID Find
                                </p>
                                <form class="mx-1 mx-md-4" id='id-find-form'>
                                    <div class="d-flex flex-row mb-4">
                                        <i class="mt-3 fas fa-user fa-lg me-3 fa-fw"></i>
                                        <div class="form-outline flex-fill mb-0">
                                            <input type="text" placeholder="example@example.com" v-model="findIdInfo.email" id="find-id-email" ref="find-id-email" name="findIdEmail" class="form-control" v-focus/>
                                            <label class="form-label" for="find-id-email">Email</label>
                                        </div>
                                    </div>

                                    <div class="d-flex flex-row mb-4">
                                        <i class="mt-2 fas fa-birthday-cake fa-lg me-3 fa-fw"></i>
                                        <div class="form-outline flex-fill mb-0">
                                            <input type="text" placeholder="ex)990101" maxlength='6' v-model="findIdInfo.birth" id="find-id-birth" ref="find-id-birth" name="findIdBirth" class="form-control"/>
                                            <label class="form-label" for="find-id-birth">Birth</label>
                                        </div>
                                    </div>

                                    <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                        <button type="button" @click="findId" class="btn btn-primary btn-lg" id="find-id-button">
                                            아이디 찾기
                                        </button>
                                    </div>
                                </form>

                                <hr/>

                                <!-- 비밀번호 찾기 -->
                                <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                                    Password Find
                                </p>
                                <form class="mx-1 mx-md-4" id='login-form'>
                                    <div class="d-flex flex-row mb-4">
                                        <i class="mt-3 fas fa-user fa-lg me-3 fa-fw"></i>
                                        <div class="form-outline flex-fill mb-0">
                                            <input type="text" placeholder="사용자 ID" v-model="resetPwdInfo.loginId" id="find-pwd-login-id" ref="reset-pwd-login-id" name="findPwdId" class="form-control"/>
                                            <label class="form-label" for="find-pwd-login-id">ID</label>
                                        </div>
                                    </div>
                                    <div class="d-flex flex-row mb-4">
                                        <i class="mt-3 fas fa-envelope fa-lg me-3 fa-fw"></i>
                                        <div class="form-outline flex-fill mb-0">
                                            <input type="text" placeholder="example@example.com" v-model="resetPwdInfo.email" id="find-pwd-email" ref="reset-pwd-email" name="findPwdEmail" class="form-control"/>
                                            <label class="form-label" for="find-pwd-email">Email</label>
                                        </div>
                                    </div>

                                    <div class="d-flex flex-row mb-4">
                                        <i class="mt-2 fas fa-birthday-cake fa-lg me-3 fa-fw"></i>
                                        <div class="form-outline flex-fill mb-0">
                                            <input type="text" placeholder="ex)990101" maxlength='6' v-model="resetPwdInfo.birth" id="find-pwd-birth" ref="reset-pwd-birth" name="findPwdBirth" class="form-control"/>
                                            <label class="form-label" for="find-pwd-birth">Birth</label>
                                        </div>
                                    </div>

                                    <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                        <button type="button" @click="resetPwd" class="btn btn-primary btn-lg" id="find-pwd-button">
                                            비밀번호 초기화
                                        </button>
                                    </div>
                                </form>
                            </div>
                            <div class="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                                <img src="@/assets/img/member/login-section.jpg"
                                 class="img-fluid" alt="Sample image"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <b-modal 
        id="my-modal"
        ref="modal"
        @hidden="resetModal"
        :title="title"     
        >{{find}}</b-modal>
</section>
</template>

<script>
import http from "@/utils/api/http";

export default {
    name: "MemberFind",
    component:{},

    data(){
        return{
            findIdInfo:{
                email:"",
                birth:"",
            },
            resetPwdInfo:{
                loginId:"",
                email:"",
                birth:"",
            },
            find:"",
            title:"",
           
            
        };
    },
    methods: {
        findId(){
            const inputEmail = this.findIdInfo.email;
            const inputBirth = this.findIdInfo.birth;
            
            if(!inputEmail){
                this.$alertDanger("일부 정보가 누락되었습니다.", "Email을 입력해주세요.");
                this.$refs["find-id-email"].focus();
                return;
            }
            if(!inputBirth){
                this.$alertDanger("일부 정보가 누락되었습니다.", "Birth를 입력해주세요.");
                this.$refs["find-id-birth"].focus();
                return;
            }
            
            if(!inputEmail.includes('@')){
                this.$alertDanger("이메일이 유효하지 않습니다.", "이메일을 수정해주세요.");
                this.$refs["find-id-email"].focus();
                return;
            }

            if(inputBirth.length < 6){
                this.$alertDanger("생년월일을 다시 입력해주세요.", "ex)990215");
                this.$refs["find-id-birth"].focus();
                return;
            }

            http
                .get(`/member/login-id`, {params: {
                    birth: inputBirth, // 생년월일 값
                    email: inputEmail // 이메일 값
                }})
                .then((res) => {
                    if(res.status === 200){
                        const findId = res.data;
                        this.find = "찾은 ID는 [" + findId + "] 입니다.";
                        this.title = "아이디 찾기";
                        this.$refs["modal"].show();
                    }
                })
                .catch(() => {
                    this.title = "아이디 찾기에 실패했습니다.";
                    this.find = "입력한 이메일과 생년월일을 다시 확인해주세요.";
                    this.$refs["modal"].show();
                })
                
        },
        resetPwd(){
            const inputLoginId = this.resetPwdInfo.loginId;
            const inputEmail = this.resetPwdInfo.email;
            const inputBirth = this.resetPwdInfo.birth;
            
            if(!inputLoginId){
                this.$alertDanger("일부 정보가 누락되었습니다.", "ID를 입력해주세요.");
                this.$refs["reset-pwd-login-id"].focus();
                return;
            }
            if(!inputEmail){
                this.$alertDanger("일부 정보가 누락되었습니다.", "Email을 입력해주세요.");
                this.$refs["reset-pwd-email"].focus();
                return;
            }
            if(!inputBirth){
                this.$alertDanger("일부 정보가 누락되었습니다.", "Birth를 입력해주세요.");
                this.$refs["reset-pwd-birth"].focus();
                return;
            }
            
            
            if(!inputEmail.includes('@')){
                this.$alertDanger("이메일이 유효하지 않습니다.", "이메일을 수정해주세요.");
                this.$refs["reset-pwd-email"].focus();
                return;
            }

            if(inputBirth.length < 6){
                this.$alertDanger("생년월일을 다시 입력해주세요.", "ex)990215");
                this.$refs["reset-pwd-birth"].focus();
                return;
            }

            http
                .post(`/member/login-pwd`, this.resetPwdInfo)
                .then((res) => {
                    if(res.status === 200){
                        const restPwd = "00000000";
                        this.find = "초기화된 비밀번호는 [" + restPwd + "] 입니다.";
                        this.title = "비밀번호 초기화";
                        this.$refs["modal"].show();
                    }
                })
                .catch(() => {
                    this.title = "비밀번호 초기화에 실패했습니다.";
                    this.find = "입력한 이메일과 생년월일, ID를 다시 확인해주세요.";
                    this.$refs["modal"].show();
                })
        },
        resetModal(){
            this.find = '';
            this.title = '';
            console.log("실행했니?", this.find);
        },
    }
}
</script>

<style scoped>
#login-section{
  padding : 9rem 0;
}

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