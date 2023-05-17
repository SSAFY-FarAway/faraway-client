<template>
  <div class="col-12">
    <span class="small text-secondary fw-light">작성자 : {{ comment.loginId }}</span>
    <span class="small col-3 text-secondary fw-light">작성일 : {{ comment.createdDate | timeFilter }}</span>
    <b-btn-group class="justify-content-end">
      <button class="btn-outline-primary" @click="modifyComment">수정</button>
      <button class="btn-outline-danger ml-2" @click="deleteComment">삭제</button>
    </b-btn-group>
    <br>
    <span>{{ comment.content }}</span>
    <hr>
  </div>
</template>

<script>
import http from "@/utils/api/http"

export default {
  name: "CommentItem",
  components: {},
  props: {
    comment: Object
  },
  methods: {
    modifyComment() {
      // TODO: 수정 로직 처리해야함
    },
    deleteComment() {
      let url = this.$route.path;
      console.log(this.$route.params);
      console.log(url);
      let domain = url.split("/")[1];
      http
          .delete(`/${domain}/comment/${this.comment.id}`)
          .then((response) => {
            if (response.status === 200) {
              this.$alertDanger("삭제 성공","삭제가 완료되었습니다.");
              this.$router.go(0);
            }
          })
          .catch(() => {
            this.$alertDanger("삭제 실패", "추후 예외처리 추가 예정");
          });
    }
  }
}
</script>

<style scoped>

</style>