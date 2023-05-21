<template>
  <div class="container" id="mypage-section">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-lg-12 col-xl-11">
        <div
          class="card text-black shadow border border-primary"
          style="border-radius: 25px"
        >
          <div class="card-body p-md-5 sh" id="bgimg">
            <div class="row justify-content-center">
              <div class="container" id="article-list-section">
                <div class="row justify-content-center">
                  <div class="col-lg-8 col-md-10 col-sm-12">
                    <h2
                      class="border border-warning rounded my-3 py-3 shadow-sm text-center"
                    >
                      글쓰기
                    </h2>
                  </div>
                  <div class="col-lg-8 col-md-10 col-sm-12">
                    <form @submit.prevent>
                      <div class="mb-3">
                        <label for="title" class="form-label fw-bolder"
                          >제목 :
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          id="title"
                          v-model="request.title"
                          placeholder="제목을 입력해주세요."
                        />
                      </div>
                      <div class="mb-3">
                        <b-form-select
                          id="category-select-box"
                          v-model="request.categoryId"
                          :options="options"
                        >
                        </b-form-select>
                      </div>
                      <div class="mb-3">
                        <label for="content" class="form-label fw-bolder"
                          >내용 :
                        </label>
                        <textarea
                          class="form-control"
                          id="content"
                          v-model="request.content"
                          rows="7"
                          placeholder="내용을 입력해주세요."
                        ></textarea>
                      </div>
                      <div class="mb-3">
                        <label for="upload-file" class="form-label"
                          >파일:</label
                        >
                        <input
                          type="file"
                          @change="selectFile"
                          class="form-control border"
                          id="upload-file"
                          ref="uploadFile"
                          multiple
                        />
                      </div>
                      <div class="col-auto text-center">
                        <button
                          id="btn-register"
                          @click="write"
                          class="btn shadow btn-primary mb-3"
                        >
                          글작성
                        </button>
                        <button type="reset" class="btn btn-danger shadow mb-3">
                          초기화
                        </button>
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
</template>

<script>
import http from "@/utils/api/http";

export default {
  name: "PostWrite",
  components: {},
  data() {
    return {
      options: [
        { value: null, text: "카테고리 선택" },
        { value: 1, text: "공지사항" },
        { value: 2, text: "자유게시판" },
      ],
      request: {
        title: "",
        content: "",
        categoryId: null,
      },
      files: [],
    };
  },
  methods: {
    selectFile() {
      this.files = this.$refs.uploadFile.files;
      console.log(this.files);
    },
    write() {
      const formData = new FormData();
      [...this.files].forEach((file) => formData.append("files", file));
      formData.append(
        "request",
        new Blob([JSON.stringify(this.request)], { type: "application/json" })
      );
      http
        .post("/post", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log(response);
          if (response.status === 200) {
            alert("글 작성 완료!");
            this.$router.replace(`/post/${response.data}`);
          }
        });
    },
  },
  created() {},
};
</script>

<style scoped></style>
