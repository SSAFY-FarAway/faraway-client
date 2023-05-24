<template>
  <div class="hotplace-container">
    <!-- 아이디, 작성일, 별점, 주소 -->
    <div id="item-header">
      <b-icon class="mr-1 color-primary" icon="person-fill" font-scale="1" />
      <span id="loginId" class="font-weight-bold">{{ hotPlace.loginId }}</span>
      <span class="m-1 text-gray">•</span>
      <span id="date" class="text-gray">{{
        $options.filters.timeFilter(hotPlace.createdDate)
      }}</span>
      <span class="m-1 text-gray">•</span>
      <span id="date" class="text-gray">조회 {{ hotPlace.hit }}</span>
      <div id="rating">
        <b-icon class="mr-1 color-primary" icon="star-fill" font-scale="1" />
        <span>{{ hotPlace.rating }}.0 / 5.0</span>
      </div>
      <div>
        <b-icon
          class="mr-1 color-primary"
          icon="geo-alt-fill"
          font-scale="1"
        ></b-icon>
        <span
          id="address"
          @click="viewOnKakaoMap"
          title="카카오맵에서 보기"
          class="cursor-pointer"
          >{{ hotPlace.mainAddress }}</span
        >
        <span
          id="copy-address-btn"
          class="ml-1 cursor-pointer"
          @click="clipBoardCopy"
          title="주소 복사하기"
          >복사</span
        >
      </div>
    </div>

    <!-- 이미지 -->
    <div id="img-wrap" class="mt-2">
      <img
        id="feed-item-img"
        :src="'http://localhost/image/download/' + hotPlace.thumbnailId"
      />
    </div>

    <!-- 좋아요, 댓글, 공유 버튼 -->
    <div id="menu-wrap">
      <b-icon
        v-if="hotPlace.likeId"
        class="mt-2 cursor-pointer"
        icon="suit-heart-fill"
        font-scale="2"
        style="color: red"
        @click="$emit('unlike')"
      />
      <b-icon
        v-else
        class="mt-2 cursor-pointer"
        icon="suit-heart"
        font-scale="2"
        @click="$emit('like')"
      />

      <b-icon
        class="mt-2 ml-3 cursor-pointer"
        icon="chat-dots"
        font-scale="2"
        @click="moveDetail"
      />

      <b-icon class="mt-2 ml-3 cursor-pointer" icon="share" font-scale="2" />
    </div>
    <div id="like " class="mt-2 font-weight-bold">
      좋아요 {{ hotPlace.likeCnt }}개
    </div>

    <!-- 작성자, 제목, 내용, 댓글 개수 -->
    <div id="item-body" class="mt-2">
      <span class="font-weight-bold">{{ hotPlace.loginId }}</span>
      <span>&nbsp;</span>
      <span id="title">{{ hotPlace.title }}</span>
      <br />
      <span id="content" class="mb-2">{{ hotPlace.content }}</span>
      <span class="text-gray cursor-pointer" @click="moveDetail"
        >댓글 {{ hotPlace.commentCnt }}개 모두 보기</span
      >
    </div>
    <hr style="border-top: 1px solid rgb(219, 219, 219)" />
  </div>
</template>

<script>
import { BIcon } from "bootstrap-vue";

export default {
  name: "FeedItem",
  components: { BIcon },
  props: {
    hotPlace: Object,
  },
  data() {
    return {};
  },

  methods: {
    moveDetail() {
      this.$router.push(`/hot-place/${this.hotPlace.id}`);
    },
    clipBoardCopy() {
      window.navigator.clipboard
        .writeText(this.hotPlace.mainAddress)
        .then(() => {
          this.$alertSuccess("복사 성공", "주소가 복사되었습니다.");
        });
    },
    viewOnKakaoMap() {
      const url = `https://map.kakao.com/?q=${this.hotPlace.mainAddress}`;
      window.open(url, "_blank");
    },
  },
};
</script>

<style scoped>
#img-wrap {
  width: 100%;
  position: relative;
}

#img-wrap:after {
  content: "";
  display: block;
  padding-bottom: 100%;
}

#feed-item-img {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 5px;
  border: 1px solid rgb(239, 239, 239);
}

#content {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  line-height: 1.3;
  -webkit-line-clamp: 2;
  overflow: hidden;
}

#copy-address-btn {
  color: var(--main-color);
  font-size: 0.8em;
  text-decoration: underline;
}

#address:hover {
  text-decoration: underline var(--main-color);
  color: var(--main-color);
}
.text-gray {
  color: #737373 !important;
}

.cursor-pointer {
  cursor: pointer;
}

.color-primary {
  color: var(--main-color);
}
</style>
