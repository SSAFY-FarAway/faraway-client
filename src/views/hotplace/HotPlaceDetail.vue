<template>
  <div class="container">
    <page-header title="HOT-PLACE" subTitle="게시글 상세보기" />
    <hr />

    <!-- 제목 -->
    <div class="row m-0 mt-3">
      <h2 id="title" class="col-11 p-0">{{ hotPlace.title }}</h2>
      <b-dropdown
        class="col-1 p-0"
        size="md"
        variant="link"
        toggle-class="text-decoration-none"
        no-caret
      >
        <template #button-content>
          <b-icon
            icon="caret-down-fill"
            font-scale="1"
            style="color: var(--main-color)"
          ></b-icon>
        </template>
        <b-dropdown-item @click="modifyHotPlace">게시글 수정</b-dropdown-item>
        <b-dropdown-item @click="deleteHotPlace">게시글 삭제</b-dropdown-item>
      </b-dropdown>
    </div>
    
    <!-- 게시글 정보 -->
    <div class="mt-2">
      <span id="member-id" class="text-secondary fw-light">
        작성자 : {{ hotPlace.loginId }}
      </span>
      <br />
      <span id="created-date" class="text-secondary fw-light">
        작성일 : {{ hotPlace.createdDate | timeFilter }}
      </span>
      <br />
      <div>
        <span id="hit" class="text-secondary fw-light">
          조회수 : {{ hotPlace.hit }} 
        </span>
        <span id="rating" class="text-secondary fw-light">
          <b-icon     
              icon="star-fill"
              font-scale="1"
              style="color: var(--main-color)"
            ></b-icon> {{hotPlace.rating}} / 5
        </span>
      </div>
      <span id="created-date" class="text-secondary fw-light">
        <b-icon     
              icon=" geo-alt"
              font-scale="1"
              style="color: var(--main-color)"
            ></b-icon> {{hotPlace.mainAddress}} {{hotPlace.subAddress}}  
        
        <a href="#" role="button" @click="clipBoardCopy">
           <b-icon     
              icon="file-text"
              font-scale="1"
            ></b-icon>복사</a>
      </span>
      <!-- 파일 첨부 영역 -->
      <!-- TODO: 파일 없는 경우 처리 해야함 -->
      <div class="mt-3" v-if="images.length">
        <img
          style="max-width: 100%"
          v-for="image in images"
          :key="image.id"
          :src="'http://localhost/image/download/' + image.id"
        />
        <br />
      </div>

      <!-- 게시글 내용 -->
      <div class="mt-3" id="content">
        <pre>{{ hotPlace.content }}</pre>
      </div>

      

      <!-- 좋아요 버튼 -->
      <div class="d-flex justify-content-center align-items-center mt-5">
        <!-- 좋아요 눌렀을 때 -->
        <button v-if="this.testLike" class="btn btn-primary">
          <b-icon icon="heart-fill" font-scale="1"></b-icon>
        </button>
        <!-- 좋아요 안 눌렀을 때 -->
        <button v-else class="btn btn-outline-secondary">
          <b-icon icon="heart-fill" font-scale="1"></b-icon>
        </button>
      </div>
      <hr />

      <!-- 댓글 영역 -->
      <div>
        <h5>{{ comments.length }}개의 댓글</h5>
        <!-- 댓글 목록 -->
        <div v-for="comment in comments" :key="comment.id">
          <comment-row :comment="comment" />
        </div>
        <!-- 댓글 작성 -->
        <comment-form />
      </div>
    </div>

    <hr />

    <!-- 게시글 하단 메뉴 -->
    <div class="row p-0 m-0 justify-content-end"> 
      <router-link to="/post/list" class="btn btn-outline-secondary">
        목록으로
      </router-link>
      <button class="btn btn-outline-secondary ml-2" @click="toTop">TOP</button>
    </div>
  </div>
</template>

<script>
import http from "@/utils/api/http";
import pageHeader from "@/components/common/page/pageHeader";
import CommentRow from "@/components/common/comment/CommentRow";
import CommentForm from "@/components/common/comment/CommentForm.vue";
import { BIcon } from "bootstrap-vue";

export default {
  name: "HotPlaceDetail",
  components: { pageHeader, CommentForm, CommentRow, BIcon},
  data() {
    return {
      hotPlace: {},
      comments: [],
      images: [],
    };
  },
  created() {
    http.get(`/hot-place/${this.$route.params.id}`).then((response) => {
      console.log(response);
      this.hotPlace = response.data;
      this.comments = this.hotPlace.commentResponses;
      this.images = this.hotPlace.imageResponses;
    });
  },
  methods: {
    modifyHotPlace() {
      if (confirm("수정 페이지로 이동하시겠습니까?")) {
        location.href = `/hot-place/${this.$route.params.id}/edit`;
      }
    },
    deleteHotPlace() {
      if (confirm("삭제하시겠습니까? 삭제된 글은 복구할 수 없습니다.")) {
        http.delete(`/hotplace/${this.$route.params.id}`).then((response) => {
          if (response.status === 200) {
            alert("삭제가 완료되었습니다.");
            this.$router.replace(`/hot-place/list`);
          }
        });
      }
    },
    clipBoardCopy(){
      window.navigator.clipboard.writeText(this.hotPlace.mainAddress + " " + this.hotPlace.subAddress).then(() => {
        this.$alertSuccess("복사 성공", "주소가 복사되었습니다.");
      });
    },
    toTop() {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
  },
}
</script>

<style scoped>
  span{
    padding: 0px 15px 0px 0px;
  }

  a{
    color: var(--main-color)
  }

  #content {
  min-height: 400px;
}
</style>
