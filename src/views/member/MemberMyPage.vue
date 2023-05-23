<template>
  <div>
    <div id="mypage-section" class="mt-9">
      <div class="container">
        <div class="row d-flex justify-content-center align-items-center h-100">
                <div class="col-lg-12 col-xl-11">
                    <div class="card text-black shadow" style="border-radius: 25px">
                        <div class="card-body p-md-5 sh">
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
                                                <input type="text" id="zipcode" ref="zipcode" name="zipcode" class="form-control"
                                                v-model="memberInfo.zipcode"
                                                      readonly/>
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
                                            <button
                                                    class="btn btn-primary btn-lg shadow" id="modify-button" 
                                                    ref="modify-button"
                                                    @click="modify">
                                                Modify
                                            </button>
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
                                                    class="btn btn-secondary btn-lg shadow" id="modify-cancel-button"
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
  </div>
</template>


<script>
import http from "@/utils/api/http";
import { BIcon } from "bootstrap-vue";



export default {
  name: 'MemberMypage',
  components: {BIcon},
  data() {
    return {
        memberInfo:{},
        modifyMode:false,
      
    };
  },
  created(){
     http
            .get(`/member/mypage`)
            .then((res) => {
                this.memberInfo = res.data;
                console.log(this.memberInfo)
            })
  },
  methods: {
    modify(){
        // TODO : 나중에 쿼리스트링 방식에서 body에서 받도록 해야함. (controller 단에서)
        const modifyInfo = {
          id:"",
          loginPwd:"",
        }
        const loginPwd = window.prompt("비밀번호를 입력해주세요");
        if(loginPwd == null){
            return;
        }
        modifyInfo.id = this.memberInfo.id;
        modifyInfo.loginPwd = loginPwd;

        const url = "/member/check"
        http
            .post(url, modifyInfo)
            .then((res) =>{
                console.log(res)
                if(res.status === 200){
                    this.modifyMode = true;
                    this.changeView();   
                    
                }
            })
            .catch((error) => {
                console.log(error);
                alert("비밀번호가 틀렸습니다.")
            })
    },
    changeView() {
        
        const lastName = this.$refs["last-name"];
        const firstName = this.$refs["first-name"];
        const birth = this.$refs["birth"];
        const email = this.$refs["email"];
        const zipcode = this.$refs["zipcode"];
        const mainAddress = this.$refs["main-address"];
        const subAddress = this.$refs["sub-address"];
        
        const modifyButton =  this.$refs["modify-button"];
        const modifySubmitButton = this.$refs["modify-submit-button"];
        const modifyCancelButton = this.$refs["modify-cancel-button"];
        // modifyButton.style.display="none";
        // modifySubmitButton.style.display="block";
        console.log("flag : ", this.modifyMode);
        if(this.modifyMode){
            lastName.readOnly = false;
            firstName.readOnly = false;
            birth.readOnly = false;
            zipcode.readOnly = false;
            email.readOnly = false;
            mainAddress.readOnly = false;
            subAddress.readOnly = false;
            modifyButton.style.display="none";
            modifySubmitButton.style.display="block";
            modifyCancelButton.style.display="block";

        }else{
            lastName.readOnly = true;
            firstName.readOnly = true;
            birth.readOnly = true;
            zipcode.readOnly = true;
            email.readOnly = true;
            mainAddress.readOnly = true;
            subAddress.readOnly = true;
            modifyButton.style.display="block";
            modifySubmitButton.style.display="none";
            modifyCancelButton.style.display="none";
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
            alert("모든 정보를 입력해주세요.");
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

        const url = "/member/"
        http
            .put(url, modifyInfo)
            .then((res) =>{
                console.log(res)
                if(res.status === 200){
                    alert("회원정보 수정 성공");
                    this.$router.go(this.$router.currentRoute);
                }
            })
            .catch(() => {
                // this.$alertDanger("비밀번호가 틀렸습니다", "추후 예외 처리 추가 예정");
                alert("회원정보 수정 실패 !");
            })
        },
        cancel(){
            if(confirm("취소하시겠습니까 ? ")){
                this.$router.go(this.$router.currentRoute);
                // this.$router.push({name: 'MemberMypage', params: {id: this.memberInfo.id}})
                // this.$router.replace("/member/"+this.memberInfo.id);
                // this.modifyMode=false;
                // this.changeView();
            }
            
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