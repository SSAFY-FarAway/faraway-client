<template>
  <form class="pl-3" @submit.prevent>
    <label for="content" class="font-weight-bold">댓글 쓰기</label>
    <div class="d-flex">
      <b-form-textarea
        v-model="request.content"
        placeholder="내용을 입력해주세요"
        rows="3"
        max-rows="6"
      ></b-form-textarea>
      <b-button class="btn-primary ml-2" @click="writeComment">WRITE</b-button>
    </div>
  </form>
</template>

<script>
import http from "@/utils/api/http";

export default {
  name: "CommentForm",
  components: {},
  data() {
    return {
      request: {
        content: "",
      },
    };
  },
  
  methods: {
    writeComment() {
      let url = this.$route.path;
      let domain = url.split("/")[1];
      let id = this.$route.params.id;

      http
        .post(`/${domain}/${id}/comment`, this.request)
        .then((response) => {
          if (response.status === 200) {
            this.$alertSuccess("댓글 작성 성공", "댓글 작성이 완료되었습니다.");
            this.$emit("reloadData")
          }
        })
        .catch(() => {
          this.$alertDanger("댓글 작성 실패", "추후 예외처리 추가 예정");
        });
    },
  },
};
</script>

<style scoped></style>
