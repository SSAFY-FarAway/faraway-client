<template>
  <div class="container">
    <page-header title="HOT-PLACE" subTitle="피드 상세보기" />
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
        <b-dropdown-item @click="modifyHotPlace">피드 수정</b-dropdown-item>
        <b-dropdown-item @click="deleteHotPlace">피드 삭제</b-dropdown-item>
      </b-dropdown>
    </div>

    <!-- 피드 정보 -->
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
          ></b-icon>
          {{ hotPlace.rating }} / 5
        </span>
      </div>
      <span id="created-date" class="text-secondary fw-light">
        <b-icon
          icon=" geo-alt"
          font-scale="1"
          style="color: var(--main-color)"
        ></b-icon>
        {{ hotPlace.mainAddress }} {{ hotPlace.subAddress }}

        <a href="#" role="button" @click="clipBoardCopy">
          <b-icon icon="file-text" font-scale="1"></b-icon>복사</a
        >
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
        <div class="h5" v-html="hotPlace.content"></div>
      </div>

      <!-- 좋아요 버튼 -->
      <div class="d-flex justify-content-center align-items-center mt-5">
        <!-- 좋아요 눌렀을 때 -->
        <button v-if="this.likeId" class="btn btn-primary" @click="unlike">
          <b-icon icon="heart-fill" font-scale="1"></b-icon>
          <span class="font-weight-bold ml-3">{{ hotPlace.likeCnt }}</span>
        </button>
        <!-- 좋아요 안 눌렀을 때 -->
        <button v-else class="btn btn-outline-secondary" @click="like">
          <b-icon icon="heart-fill" font-scale="1"></b-icon>
          <span class="font-weight-bold ml-3">{{ hotPlace.likeCnt }}</span>
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
        <comment-form @reloadData="getHotPlace" />
      </div>
    </div>

    <hr />

    <!-- 게시글 하단 메뉴 -->
    <div class="row p-0 m-0 justify-content-end">
      <router-link
        to="/hot-place/list"
        class="btn btn-outline-secondary text-secondary"
      >
        목록으로
      </router-link>
      <button class="btn btn-outline-secondary ml-2" @click="$toTop()">
        TOP
      </button>
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
  components: { pageHeader, CommentForm, CommentRow, BIcon },
  data() {
    return {
      hotPlace: {},
      comments: [],
      images: [],
      likeId: null,
    };
  },
  created() {
    this.getHotPlace();
  },
  methods: {
    getHotPlace() {
      http.get(`/hot-place/${this.$route.params.id}`).then((res) => {
        console.log(res);
        this.hotPlace = res.data;
        this.hotPlace.content = this.$formattedText(res.data.content);
        this.comments = this.hotPlace.commentResponses;
        this.images = this.hotPlace.imageResponses;
        this.likeId = res.data.likeId;
      });
    },
    modifyHotPlace() {
      if (confirm("수정 페이지로 이동하시겠습니까?")) {
        this.$router.push(`/hot-place/${this.$route.params.id}/edit`);
      }
    },
    deleteHotPlace() {
      if (confirm("삭제하시겠습니까? 삭제된 글은 복구할 수 없습니다.")) {
        http.delete(`/hot-place/${this.$route.params.id}`).then((response) => {
          if (response.status === 200) {
            alert("삭제가 완료되었습니다.");
            this.$router.replace(`/hot-place/list`);
          }
        });
      }
    },
    clipBoardCopy() {
      window.navigator.clipboard
        .writeText(this.hotPlace.mainAddress + " " + this.hotPlace.subAddress)
        .then(() => {
          this.$alertSuccess("복사 성공", "주소가 복사되었습니다.");
        });
    },
    like() {
      http
        .post(`/hot-place/${this.hotPlace.id}/like`)
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            this.likeId = res.data;
            this.hotPlace.likeCnt++;
            this.$alertSuccess("좋아요❤", "해당 피드에 좋아요를 눌렀습니다.");
          }
        })
        .catch((res) => {
          this.$alertDanger("오류 확인", res);
          this.$alertDanger("오류 발생", "추후 예외처리 추가 예정");
        });
    },
    unlike() {
      http
        .delete(`/hot-place/like/${this.likeId}`)
        .then((res) => {
          if (res.status === 200) {
            this.likeId = null;
            this.hotPlace.likeCnt--;
            this.$alertSuccess(
              "좋아요❤ 취소",
              "해당 피드에 좋아요를 취소했습니다."
            );
          }
        })
        .catch((res) => {
          this.$alertDanger("오류 확인", res);
          this.$alertDanger("오류 발생", "추후 예외처리 추가 예정");
        });
    },
  },
};
</script>

<style scoped>
span {
  padding: 0px 15px 0px 0px;
}

a {
  color: var(--main-color);
}

#content {
  min-height: 400px;
}
</style>
