<template>
  <div class="container">
    <!-- Header -->
    <page-header title="WRITE" subTitle="게시글 작성"/>
    <hr />
    <div class="row m-0 mt-3">
      <input type="text" class="form-control " id="title" style="font-size : 1.1em" v-model="request.title" placeholder="제목을 입력해주세요"/>
    </div>

        <!-- 게시글 정보 -->
    <div class="mt-3">
      <span id="member-id" class="text-secondary fw-light" style="font-size : 0.9em">
        작성자 : {{ loginMember.loginId }} 
      </span>
      <br />
      <span id="created-date" class="text-secondary fw-light" style="font-size : 0.9em">
        작성일 : {{ $options.filters.timeFilter(new Date()) }}
      </span>
    </div>
  
    <!-- 주소입력 API 사용 -->
    <div class="mb-3 mt-3 row">
      <div class="col-auto">
        <input type="text" class="form-control" id="zipcode" readonly @click="findZipCode" style="font-size : 1.1em" v-model="request.zipcode" placeholder="우편번호를 입력해주세요."/>
      </div>
      <div class="col-auto">
        <input type="button" class="btn btn-primary mb-3" @click="findZipCode" value="우편번호 찾기"><br>
      </div>  
    </div>
    <div class="mb-3 mt-3 row">
      <div class="col-4">
        <input type="text" class="form-control" id="mainAddress" readonly style="font-size : 1.1em" v-model="request.mainAddress" placeholder="도로명 주소를 입력해주세요."/>
      </div>
      <div class="col-8">
        <input type="text" class="form-control" id="subAddress" style="font-size : 1.1em" v-model="request.subAddress" placeholder="상세 주소를 입력해주세요."/>
      </div>
    </div>

    <!-- 게시글 내용 -->
    <textarea class="form-control mt-3" id="content" v-model="request.content" rows="7" placeholder="내용을 입력해주세요">
    </textarea>

        <!-- 파일 첨부 영역 -->
    <div class='mt-3'>
      <p class="font-weight-bold">첨부파일 : 이미지 파일(.jpg, .png, .gif, ...)만 업로드 가능합니다</p>
      <input style="cursor:pointer" type="file" @change="selectFile" ref="uploadFile" multiple/>
    </div>

    <hr/>

     <!-- 게시글 하단 메뉴 -->
    <div class="row p-0 m-0 justify-content-end">
      <button @click="$router.go(-1)" class="btn btn-secondary">
        이전으로
      </button>
      <button class="btn btn-primary ml-2" @click="write">글 작성</button>
    </div>


  <div class="container" id="mypage-section">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-lg-12 col-xl-11">
        <div class="card text-black shadow border border-primary" style="border-radius: 25px">
          <div class="card-body p-md-5 sh" id="bgimg">
            <div class="row justify-content-center">
              <div class="container" id="article-list-section">
                <div class="row justify-content-center">
                  <div class="col-lg-8 col-md-10 col-sm-12">
                  </div>
                  <div class="col-lg-8 col-md-10 col-sm-12">
                    <form @submit.prevent>
                      <div class="mb-3">
                        <label for="zipcode" class="form-label fw-bolder">우편번호 :
                        </label>
                        <input type="text" class="form-control" id="zipcode"
                               v-model="request.zipcode" placeholder="우편번호를 입력해주세요." />
                      </div>
                      <div class="mb-3">
                        <label for="main-address" class="form-label fw-bolder">주소 :
                        </label>
                        <input type="text" class="form-control" id="main-address"
                               v-model="request.mainAddress" placeholder="주소를 입력해주세요." />
                      </div>
                      <div class="mb-3">
                        <label for="sub-address" class="form-label fw-bolder">상세주소 :
                        </label>
                        <input type="text" class="form-control" id="sub-address"
                               v-model="request.subAddress" placeholder="상세주소를 입력해주세요." />
                      </div>
                      <div class="mb-3">
                        <label for="rating" class="form-label fw-bolder">평점 :
                        </label>
                        <input type="number" class="form-control" id="rating"
                               v-model="request.rating" placeholder="평점..." />
                      </div>
                      <div class="mb-3">
                        <label for="content" class="form-label fw-bolder">내용 :
                        </label>
                        <textarea class="form-control" id="content" v-model="request.content"
                                  rows="7" placeholder="내용을 입력해주세요."></textarea>
                      </div>
                      <div class="mb-3">
                        <label for="upload-file" class="form-label">파일 : 이미지 파일(.jpg, .png, .gif, ...)만 업로드 가능합니다:</label>
                        <input type="file" @change="selectFile" class="form-control border" id="upload-file" ref="uploadFile" multiple>
                      </div>
                      <div class="col-auto text-center">
                        <button id="btn-register"
                                @click="write"
                                class="btn shadow btn-primary mb-3">
                          글작성
                        </button>
                        <button type="reset"
                                class="btn btn-danger shadow mb-3">초기화</button>
                      </div>
                    </form>
                  </div>
                </div>
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
import pageHeader from "@/components/common/page/pageHeader";
import { mapState } from 'vuex';

export default {
  name: "HotPlaceWrite",
  components: {pageHeader},
  data() {
    return {
      request: {
        title: "",
        content: "",
        zipcode: "",
        mainAddress: "",
        subAddress: "",
        rating: 0,
      },
      files: [],
    };
  },
  methods: {
    selectFile() {
      this.files = this.$refs.uploadFile.files
      console.log(this.files);
    },
    write() {
      const formData = new FormData();
      [...this.files].forEach((file) => formData.append("files", file));
      formData.append("request", new Blob([JSON.stringify(this.request)], {type: "application/json"}));
      http.post("/hot-place", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
          .then((response) => {
            console.log(response);
            if (response.status === 200) {
              this.$alertSuccess("작성 성공", "글 작성이 완료되었습니다.");
              this.$router.replace(`/hot-place/view/${response.data}`);
            }
          })
          .catch(() => {
            this.$alertDanger("작성 실패", "추후 예외 처리 추가 예정");
          });
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
            this.request.zipcode = data.zonecode; //5자리 새우편번호 사용
            this.request.mainAddress = fullRoadAddr;
        }
       }).open()
    }
    
  },
  computed: {
    ...mapState("memberStore",["loginMember"])
  },
}
</script>

<style scoped>

</style>