<template>
  <div>
    <div id="mypage-section" class="mt-9">
      <div class="container">
        <div class="row d-flex justify-content-center align-items-center h-100">
                <div class="col-lg-12 col-xl-11">
                    <div class="card text-black shadow" style="border-radius: 25px">
                        <div class="card-body sh" style="position:relative">
                            <div class="row justify-content-center">
                                <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                                    <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                                        My Page
                                    </p>

                                    <div class="mx-1 mx-md-4" id="form-modify">
                                        <div class="d-flex flex-row mb-4">
                                            <b-icon 
                                            class="mt-2 mr-2 fas fa-lg me-3 fa-fw"
                                            icon="file-earmark-person-fill"
                                            font-scale="1.5"
                                            ></b-icon>
                                            <div class="form-outline flex-fill mb-0">
                                                <input type="text" id="login-id" ref="login-id" name="loginId" class="form-control"
                                                v-model="memberInfo.loginId"
                                                readonly=/>
                                                <label class="form-label" for="login-id">ID</label>
                                            </div>

                                        </div>
                                        <div class="d-flex flex-row mb-4">
                                            <b-icon 
                                            class="mt-2 mr-2 fas fa-lg me-3 fa-fw"
                                            icon="person-fill"
                                            font-scale="1.5"
                                            ></b-icon>
                                            <div class="form-outline flex-fill mb-0">
                                                <input type="text" id="last-name" ref="last-name" name='lastName' class="form-control"
                                                v-model="memberInfo.lastName"
                                                      readonly/>
                                                <label class="form-label" for="last-name">Last Name</label>
                                                <input type="text" id="first-name" ref="first-name" name='firstName' class="form-control"
                                                v-model="memberInfo.firstName"
                                                      readonly/>
                                                <label class="form-label" for="first-name">First Name</label>
                                            </div>
                                        </div>
                                        <div class="d-flex flex-row mb-4">
                                            <b-icon 
                                              class="mt-2 mr-2 fas fa-lg me-3 fa-fw"
                                              icon="mastodon"
                                              font-scale="1.5"
                                              ></b-icon>
                                            <div class="form-outline flex-fill mb-0">
                                                <input type="text" id="mileage" name='mileage' class="form-control"
                                                v-model="memberInfo.mileage"
                                                      readonly/>
                                                <label class="form-label" for="mileage">Mileage</label>
                                                <input type="text" id="role" name='role' class="form-control"
                                                v-model="memberInfo.mileage"
                                                 readonly/>
                                                <label class="form-label" for="role">Role</label>
                                            </div>
                                        </div>
                                        <div class="d-flex flex-row mb-4">
                                          <b-icon 
                                              class="mt-2 mr-2 fas fa-lg me-3 fa-fw"
                                              icon="emoji-smile-fill"
                                              font-scale="1.5"
                                              ></b-icon>
                                            <div class="form-outline flex-fill mb-0">
                                                <input type="text" id="birth" ref="birth" name="birth" class="form-control"
                                                v-model="memberInfo.birth"
                                                 readonly/>
                                                <label class="form-label" for="birth">Your Birth (ex. 990101)</label>
                                            </div>
                                        </div>
                                        <div class="d-flex flex-row mb-4">
                                          <b-icon 
                                              class="mt-2 mr-2 fas fa-lg me-3 fa-fw"
                                              icon="envelope-fill"
                                              font-scale="1.5"
                                              ></b-icon>
                                            <div class="form-outline flex-fill mb-0">
                                                <input type="email" id="email" ref="email" name="email" class="form-control"
                                                v-model="memberInfo.email"
                                                 readonly/>
                                                <label class="form-label" for="email">Your Email</label>
                                            </div>
                                        </div>
                                        <div class="d-flex flex-row mb-4">
                                          <b-icon 
                                              class="mt-2 mr-2 fas fa-lg me-3 fa-fw"
                                              icon="house-door-fill"
                                              font-scale="1.5"
                                              ></b-icon>
                                            <div class="form-outline flex-fill mb-0">
                                                <div class="row">
                                                    <div class="col-md-6">
                                                        <input type="text" id="zipcode" ref="zipcode"  name="zipcode" class="form-control"
                                                        v-model="memberInfo.zipcode"
                                                            readonly/>
                                                    </div>
                                                    <div class="col-auto">
                                                        <input type="button"
                                                            style= display:none
                                                            class="btn btn-primary"
                                                            ref="find-btn"
                                                            @click="findZipCode" 
                                                            value="찾기"
                                                            />
                                                    </div>
                                                </div>
                                                <label class="form-label" for="zipcode">Your Zipcode (ex. 90000)</label>
                                                <input type="text" id="main-address" ref="main-address" name="mainAddress"
                                                class="form-control" 
                                                v-model="memberInfo.mainAddress"
                                                readonly/>
                                                <label class="form-label" for="main-address">Your Main
                                                    Address</label>
                                                <input type="text" id="sub-address" ref="sub-address" name="subAddress" 
                                                class="form-control"
                                                v-model="memberInfo.subAddress"
                                                readonly/>
                                                <label class="form-label" for="sub-address">Your Sub
                                                    Address</label>
                                            </div>
                                        </div>
                                 
                                        <div id="normal-mode-btns" class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                            <b-button
                                                    v-b-modal.modal-prevent-closing
                                                    class="btn btn-primary btn-lg shadow" id="modify-button" 
                                                    ref="modify-button"
                                                    >
                                                Modify
                                            </b-button>
                                        </div>
                                        <div class="row justify-content-center">
                                        <span 
                                            @click='showDeleteModal' 
                                            ref="delete-member"
                                            class="text-center text-muted mr-3" 
                                            style="margin-top : 80px; font-size:0.875em; text-decoration:underline; cursor:pointer">
                                            회원탈퇴
                                        </span>

                                        <router-link
                                            ref="change-login-pwd"
                                            to="/member/changePassword"
                                            class="text-center text-muted" 
                                            style="margin-top : 80px; font-size:0.875em; text-decoration:underline; cursor:pointer">
                                            비밀번호 변경
                                        </router-link>
                                    </div>
                                        <div id="modify-mode-btns"  class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                            <button
                                                    class="btn btn-primary btn-lg shadow me-3" id="modify-submit-button" 
                                                    ref="modify-submit-button"
                                                    @click="submit"
                                                    style= display:none;>
                                                Submit
                                            </button>
                                            <button
                                                    class="btn btn-secondary btn-lg shadow ml-3" id="modify-cancel-button"
                                                    ref="modify-cancel-button"
                                                    @click="cancel"
                                                    style= display:none;>
                                                Cancel
                                            </button>
                                        </div>
                                    </div>

                                </div>
                                <div class="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                                    <img src="@/assets/img/member/login-section.jpg"
                                        class="img-fluid" alt="Sample image"/></div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
      </div>
        </div>
    <b-modal 
        id="confirm-delete-modal" 
        ref="confirm-delete-modal" 
        title="회원탈퇴"
        @ok="deleteMember">
        <p class="my-4">정말로 회원탈퇴를 진행하시겠습니까?</p>
    </b-modal>

    <b-modal
      id="modal-prevent-closing"
      ref="modal"
      :title="modalTitle"
      @show="resetShowModal"
      @hidden="resetModal"
      @ok="handleOk"
      
    >
      <form ref="form" @submit.prevent='handleOk'>
        <b-form-group
          label="비밀번호를 입력해주세요."
          label-for="LoginPwd-input"
          invalid-feedback="LoginPwd is required"
        >
          <b-form-input
            id="LoginPwd-input"
            v-model="inputLoginPwd"
            type="password"
            autofocus
            required
          ></b-form-input>
        </b-form-group>
      </form>
    </b-modal>    
    </div>

</template>


<script>
import http from "@/utils/api/http";
import { mapActions, mapState} from "vuex";
import router from '@/router/index';
import { BIcon } from "bootstrap-vue";



export default {
    name: 'MemberMypage',
    components: {BIcon},
    data() {
        return {
            memberInfo:{},
            modifyMode:false,
            inputLoginPwd : "",
            LoginPwdState: null,
            modalTitle:"회원 정보 수정",
            isModifyModalflag: true, // true : modify modal  , false : delte modal
        
        };
    },
    created(){
        http
                .get(`/member/mypage`)
                .then((res) => {
                    this.memberInfo = res.data;
                    console.log("member info ")
                })
    },
    computed: {
        ...mapState("memberStore", ["isLogin", "loginMember"]),
    },
    methods: {
        ...mapActions("memberStore", ["setIsLogin"]),
    modify(){
        // TODO : 나중에 쿼리스트링 방식에서 body에서 받도록 해야함. (controller 단에서)
        const modifyInfo = {
          id:"",
          loginPwd:"",
        }
        modifyInfo.id = this.memberInfo.id;
        modifyInfo.loginPwd = this.inputLoginPwd;

        const url = "/member/check/password"
        http
            .post(url, modifyInfo)
            .then((res) =>{
                console.log(res)
                if(res.status === 200){
                    this.modifyMode = true;
                    this.changeView();
                    this.$bvModal.hide('modal-prevent-closing')
                    this.$alertSuccess("비밀번호가 맞습니다.", "회원정보를 수정해주세요.");
                }
            })
            .catch((error) => {
                console.log(error.response);
                this.$alertDanger("비밀번호가 틀렸습니다.", "비밀번호를 다시 입력해 주세요.");
                return false;
            })
            return false;
    },
    changeView() {
        
        const lastName = this.$refs["last-name"];
        const firstName = this.$refs["first-name"];
        const birth = this.$refs["birth"];
        const email = this.$refs["email"];
        const subAddress = this.$refs["sub-address"];
        
        const modifyButton =  this.$refs["modify-button"];
        const modifySubmitButton = this.$refs["modify-submit-button"];
        const modifyCancelButton = this.$refs["modify-cancel-button"];
        const delteButton = this.$refs["delete-member"];
        const findBtn = this.$refs["find-btn"];

        console.log("flag : ", this.modifyMode);
        if(this.modifyMode){
            lastName.readOnly = false;
            firstName.readOnly = false;
            birth.readOnly = false;
            email.readOnly = false;
            subAddress.readOnly = false;
            modifyButton.style.display="none";
            delteButton.style.display="none";
            modifySubmitButton.style.display="block";
            modifyCancelButton.style.display="block";
            findBtn.style.display="block";

        }else{
            lastName.readOnly = true;
            firstName.readOnly = true;
            birth.readOnly = true;
            email.readOnly = true;
            subAddress.readOnly = true;
            modifyButton.style.display="block";
            delteButton.style.display="block";
            modifySubmitButton.style.display="none";
            modifyCancelButton.style.display="none";
            findBtn.style.display="none";
        }
    },
    submit(){
        const lastName = this.$refs["last-name"];
        const firstName = this.$refs["first-name"];
        const birth = this.$refs["birth"];
        const email = this.$refs["email"];
        const zipcode = this.$refs["zipcode"];
        const mainAddress = this.$refs["main-address"];
        const subAddress = this.$refs["sub-address"];
        
        if (!(lastName.value && firstName.value && birth.value && email.value && zipcode.value && mainAddress.value && subAddress.value)) {
            this.$alertDanger("일부 정보가 누락되었습니다.", "수정할 정보를 입력해주세요.");
            return;
        }

        if(!email.value.includes('@')){
            this.$alertDanger("이메일이 유효하지 않습니다.", "이메일을 수정해주세요.");
            return;
        }

        const modifyInfo = {
          id : this.memberInfo.id,
          lastName : lastName.value,
          firstName : firstName.value,
          birth : birth.value,
          email : email.value,
          zipcode : zipcode.value,
          mainAddress : mainAddress.value,
          subAddress : subAddress.value,
      }

        const url = "/member"
        http
            .put(url, modifyInfo)
            .then((res) =>{

                if(res.status === 200){
                    this.$alertSuccess("회원정보 수정 성공", "마이페이지로 이동합니다.");
                    this.$router.go(this.$router.currentRoute);
                }
            })
            .catch((error) => {
                console.log(error.response);
                if(error.request){
                    console.log('No response received');
                    console.log('Error request:', error.request);
                }else{
                    console.log('Error message:', error.message);
                }
                console.log('Error config:', error.config);
                this.$alertDanger("비밀번호가 틀렸습니다", "추후 예외 처리 추가 예정");

            })
        },
        cancel(){
            if(confirm("취소하시겠습니까 ? ")){
                this.$router.go(this.$router.currentRoute);
            }
            
        },
        checkFormValidity(){
            if(this.inputLoginPwd == ""){
                return false;
            }
            return true;
        },

        handleOk(){
            if (!this.checkFormValidity()) {
                this.$alertDanger("비밀번호를 입력해주세요.","로그인 비밀번호를 입력해주세요")
                return
            }
            if(this.isModifyModalflag){
                this.modify()
            }else{
                this.delte();
            }
            
            
        },
        resetShowModal(){
            this.inputLoginPwd = ''
        },

        resetModal() {
            this.inputLoginPwd = ''
            this.modalTitle = "회원 정보 수정"
            this.isModifyModalflag = true;
        },
        showDeleteModal(){
            this.$refs["confirm-delete-modal"].show();    
        },
        deleteMember() {
            this.modalTitle = "회원 탈퇴"
            this.isModifyModalflag = false;
            this.$refs["modal"].show();
            console.log("deleteMember")
        },
        delte(){
            const deleteInfo = {
                id:"",
                loginPwd:"",
            }

            deleteInfo.id = this.memberInfo.id;
            deleteInfo.loginPwd = this.inputLoginPwd;
            console.log("delete info : ", deleteInfo);
            // 로그아웃 먼저 진행
                http
                .post("/member", deleteInfo)
                .then((res) => {
                    if(res.status === 200){
                        this.$alertSuccess("회원 탈퇴 성공", "메인페이지로 이동합니다.");
                        this.setIsLogin(false);  
                         if (router.currentRoute.path !== "/index") {
                            router.push("/"); // 로그아웃 후 메인 페이지로 이동
                        }
                    }
                })
                .catch(() => {
                    this.$alertDanger("회원 탈퇴 실패", "비밀번호가 틀렸습니다.");
                })
            },
            
         logout(){
            http
                .get(`/member/logout/${this.memberInfo.id}`)
                .then((res) => {
                        if (res.status === 200) {
                        // this.$alertSuccess("로그아웃 성공", "메인페이지로 이동합니다.");
                        // console.log("[로그아웃 성공]")
                            console.log("로그아웃 세션이 안지워집니다.")
                            console.log(res);
                            this.setIsLogin(false);
                            return true;
                        }
                })
                .catch(() => {
                    return false;
                })
            return false;
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
            this.memberInfo.zipcode = data.zonecode; //5자리 새우편번호 사용
            this.memberInfo.mainAddress = fullRoadAddr;
        }
       }).open()
        },
        
    },
};
</script>

<style scoped>
  
#mypage-section{
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