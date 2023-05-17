<template>
  <div class="container">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-lg-12 col-xl-11">
        <div class="card text-black shadow border border-primary" style="border-radius: 25px">
          <div class="card-body sh" id="bgimg">
            <div class="row justify-content-center">
              <div class="container" id="article-view-section">
                <div class="row justify-content-center">
                  <div class="col-lg-8 col-md-10 col-sm-12">
                    <h2 class="border border-warning rounded my-3 py-3 shadow-sm  text-center">
                      글보기
                    </h2>
                  </div>
                  <div class="col-lg-8 col-md-10 col-sm-12 bg-white border rounded-3 shadow">
                    <div class="row my-2">
                      <h2 id="title" class="px-5">{{ hotPlace.title }}</h2>
                    </div>
                    <div class="row">
                      <div class="col-md-12">
                        <div class="clearfix align-content-center">
                          <img class="avatar md-start bg-light p-2"
                               src="https://raw.githubusercontent.com/twbs/icons/main/icons/person-fill.svg"/>
                          <span id="member-id" class="p-2 fw-bold">작성자 : {{ hotPlace.loginId }}</span>
                          <p>
                            <span id="created-date" class="text-secondary fw-light">작성일 : {{ hotPlace.createdDate | timeFilter }}</span>
                            <span id="hit" class="text-secondary fw-light">조회수 : {{ hotPlace.hit }}</span>
                            <span class="text-secondary fw-light">평점 : {{hotPlace.rating}}</span>
                          </p>
                          <hr>
                        </div>
                      </div>
                      <div class="col-md-12">
                        <p class="fw-bold">{{hotPlace.mainAddress}}, {{hotPlace.subAddress}}</p>
                        <img class="p-lg-5" v-for="image in images" :key="image.id" :src="'http://localhost/image/download/' + image.id">
                        <br>
                        <span>{{ hotPlace.content }}</span>
                        <hr>
                      </div>
                      <div class="mt-3">
                        <div id="btn-area" class="col justify-content-end">
                          <button id="btn-list"
                                  @click="listHotPlace"
                                  class="btn btn-outline-primary shadow-sm mb-3">
                            글목록
                          </button>
                          <button id="btn-modify"
                                  @click="modifyHotPlace"
                                  class="btn btn-outline-success shadow-sm mb-3 ms-1">
                            글수정
                          </button>
                          <button id="btn-delete"
                                  @click="deleteHotPlace"
                                  class="btn btn-outline-danger shadow-sm mb-3 ms-1">
                            글삭제
                          </button>
                        </div>
                        <hr>
                      </div>
                      <!-- TODO: 댓글 없는 경우 처리 해야함 -->
                      <div class="col-12"><h5>댓글 : {{ comments.length}}</h5>
                        <hr>
                      </div>
                      <div class="col-12" id="comments" v-for="comment in comments"
                           :key="comment.id">
                        <div class="col-12">
                          <span class="small text-secondary fw-light">작성자 : {{ comment.loginId }}</span>
                          <span class="small col-6 text-secondary fw-light">작성일 : {{ comment.createdDate | timeFilter }}</span>
                        </div>
                        <span class="col-12">{{ comment.content }}</span>
                        <hr>
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
  </div>
</template>

<script>
import http from "@/utils/api/http";

export default {
  name: "HotPlaceDetail",
  components: {},
  data() {
    return {
      hotPlace: {},
      comments: [],
      images: [],
    };
  },
  created() {
    http
        .get(`/hotplace/${this.$route.params.hotPlaceId}`)
        .then((response) => {
          console.log(response);
          this.hotPlace = response.data;
          this.comments = this.hotPlace.commentResponses;
          this.images = this.hotPlace.imageResponses;
        })
  },
  methods: {
    listHotPlace() {
      this.$router.replace(`hotplace/list`);
    },
    modifyHotPlace() {
      if (confirm("수정 페이지로 이동하시겠습니까?")) {
        this.$router.replace(`/hotplace/${this.$route.params.hotPlaceId}`);
      }
    },
    deleteHotPlace() {
if (confirm("삭제하시겠습니까? 삭제된 글은 복구할 수 없습니다.")) {
  http
      .delete(`/hotplace/${this.$route.params.hotPlaceId}`)
      .then((response) => {
        if (response.status===200) {
          alert("삭제가 완료되었습니다.");
          this.$router.replace(`/hotplace/list`);
        }
      })
}
    },
  }
}
</script>

<style scoped>

</style>