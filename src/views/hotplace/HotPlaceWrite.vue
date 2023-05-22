<template>
  <div class="container">
    <!-- Header -->
    <page-header title="WRITE" subTitle="게시글 작성"/>
    <hr />
    <div class="row m-0 mt-3">
      <input type="text" class="form-control " id="title" style="font-size : 1.1em" v-model="request.title" placeholder="제목을 입력해주세요"/>
    </div>

        <!-- 게시글 정보 -->
    <!--
    <div class="mt-3">
      <span id="member-id" class="text-secondary fw-light" style="font-size : 0.9em">
        작성자 : {{ loginMember.loginId }} 
      </span>
      <br />
      <span id="created-date" class="text-secondary fw-light" style="font-size : 0.9em">
        작성일 : {{ $options.filters.timeFilter(new Date()) }}
      </span>
    </div>
    -->
  
    <!-- 주소입력 API 사용 -->
    <div class="mt-3 row">
      <div class="col-auto">
        <input type="text" class="form-control" id="zipcode" readonly @click="findZipCode" style="font-size : 1em" v-model="request.zipcode" placeholder="우편번호를 입력해주세요."/>
      </div>
      <div class="col-auto">
        <input type="button" class="btn btn-primary" @click="findZipCode" value="우편번호 찾기"><br>
      </div>  
    </div>
    <div class="mt-3 row">
      <div class="col-4">
        <input type="text" class="form-control" id="mainAddress" readonly style="font-size : 1em" v-model="request.mainAddress" placeholder="도로명 주소를 입력해주세요."/>
      </div>
      <div class="col-8">
        <input type="text" class="form-control" id="subAddress" style="font-size : 1em" v-model="request.subAddress" placeholder="상세 주소를 입력해주세요."/>
      </div>
    </div>

    <!-- 평점 -->
    <form class="mb-3 mt-4" name="myform" id="myform">
      <fieldset>
        <h3 class="text-center">!HOT-PLACE를 평가해주세요</h3>
        <span id="ratingview" class="px-3">5 / {{request.rating}} </span>
        <span class="text-bold">
        <input type="radio" name="reviewStar"  @change="ratingClick($event)" value="5" id="rate1"><label for="rate1">★</label>
        <input type="radio" name="reviewStar"  @change="ratingClick($event)" value="4" id="rate2"><label for="rate2">★</label>
        <input type="radio" name="reviewStar"  @change="ratingClick($event)" value="3" id="rate3"><label for="rate3">★</label>
        <input type="radio" name="reviewStar"  @change="ratingClick($event)" value="2" id="rate4"><label for="rate4">★</label>
        <input type="radio" name="reviewStar"  @change="ratingClick($event)" value="1" id="rate5"><label for="rate5">★</label>
        </span>
      </fieldset>
    </form>	

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
              this.$router.replace(`/hot-place/${response.data}`);
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
    },
    ratingClick(event){
      this.request.rating = event.target.value; 
    },

  },
  computed: {
    ...mapState("memberStore",["loginMember"])
  },
}
</script>

<style scoped>

#content {
  min-height: 400px;
}


#myform fieldset{
    display: inline;
    direction: rtl;

    border:0;
}
#myform fieldset legend{
    text-align: right;
}
#myform input[type=radio]{
    display: none;
}
#myform label{
    font-size: 3em;
    color: transparent;
    text-shadow: 0 0 0 #f0f0f0;
}
#myform label:hover{
    text-shadow: 0 0 0 rgba(250, 208, 0, 0.99);
}
#myform label:hover ~ label{
    text-shadow: 0 0 0 rgba(250, 208, 0, 0.99);
}
#myform input[type=radio]:checked ~ label{
    text-shadow: 0 0 0 rgba(250, 208, 0, 0.99);
}
#reviewContents {
    width: 100%;
    height: 150px;
    padding: 10px;
    box-sizing: border-box;
    border: solid 1.5px #D3D3D3;
    border-radius: 5px;
    font-size: 16px;
    resize: none;
}
#ratingview{
  font-size: 30px;
  
}
</style>