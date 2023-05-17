<template>
  <form class="col-12 justify-content-center" @submit.prevent>
    <label for="content" class="form-label fw-bolder">댓글 작성</label>
    <textarea id="content" class="form-control" cols="80" v-model="request.content" placeholder="내용을 입력해주세요." ></textarea>
    <b-button class="mt-3" @click="writeComment">작성</b-button>
  </form>
</template>

<script>
import http from "@/utils/api/http"

export default {
  name: "CommentForm",
  components: {},
  data() {
    return {
      request: {
        "content": ""
      },
    }
  },
  methods: {
    writeComment() {
      let url = this.$route.path;
      let domain = url.split("/")[1];
      let id = this.$route.params.id;
      console.log(this.request);
      http
          .post(`/${domain}/${id}/comment`, this.request)
          .then((response) => {
            if (response.status === 200) {
              this.$alertDanger("댓글 작성 성공", "댓글 작성이 완료되었습니다.");
              this.$router.go(0);
            }
          })
          .catch(() => {
            this.$alertDanger("댓글 작성 실패", "추후 예외처리 추가 예정");
          });
    }
  }
}
</script>

<style scoped>

</style>