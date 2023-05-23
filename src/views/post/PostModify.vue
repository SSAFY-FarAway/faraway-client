<template>
  <div class="container" id="mypage-section">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-lg-12 col-xl-11">
        <div class="card text-black shadow border border-primary" style="border-radius: 25px">
          <div class="card-body p-md-5 sh" id="bgimg">
            <div class="row justify-content-center">
              <div class="container" id="article-list-section">
                <div class="row justify-content-center">
                  <div class="col-lg-8 col-md-10 col-sm-12">
                    <h2 class="border border-warning rounded my-3 py-3 shadow-sm  text-center">
                      글수정
                    </h2>
                  </div>
                  <div class="col-lg-8 col-md-10 col-sm-12">
                    <form @submit.prevent>
                      <div class="mb-3">
                        <label for="title" class="form-label fw-bolder">제목 :
                        </label>
                        <input type="text" class="form-control" id="title"
                               v-model="post.title" placeholder="제목을 입력해주세요." />
                      </div>
                      <div class="mb-3">
                        <label for="category" class="form-label fw-bolder">카테고리 : </label>
                        <span id="category" class="form-control">{{categoryName}}</span>
                      </div>
                      <div class="mb-3">
                        <label for="content" class="form-label fw-bolder">내용 :
                        </label>
                        <textarea class="form-control" id="content" v-model="post.content"
                                  rows="7" placeholder="내용을 입력해주세요."></textarea>
                      </div>
                      <div class="mb-3">
                        <label for="files" class="form-label">기존 파일:</label>
                          <div v-for="attachment in attachments" :key="attachment.id">
                            <span :id="attachment.id" class="form-control"  v-if="check(attachment.id)">
                              {{attachment.fileName}}
                              <button id="btn-delete-file" class="btn-outline-danger" @click="addDeleteId(attachment.id)">삭제</button>
                            </span>
                          </div>
                      </div>
                      <div class="mb-3">
                        <label for="upload-file" class="form-label">파일 : </label>
                        <input id="upload-file" type="file" @change="selectFile" class="form-control border" ref="uploadFile" multiple>
                      </div>
                      <div class="col-auto text-center">
                        <button id="btn-register"
                                @click="modify"
                                class="btn shadow btn-primary mb-3">
                          글작성
                        </button>
                        <button @click="reset"
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
</template>

<script>
import http from "@/utils/api/http";

export default {
    name: "PostModify",
    components: {},
    data() {
        return {
            attachments: [],
            categoryName: "",
            post: {
                title: "",
                content: "",
                deleteAttachmentIds: [],
            },
            files: [],
        }
    },
    methods: {
        selectFile() {
            this.files = this.$refs.uploadFile.files;
            console.log(this.files);
        },
        modify() {
            const formData = new FormData();
            [...this.files].forEach((file) => formData.append("files", file));
            formData.append("request", new Blob([JSON.stringify(this.post)], {type: "application/json"}));
            console.log(this.post);
            http.put(`/post/${this.$route.params.id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
                .then((response) => {
                    console.log(response);
                    if (response.status === 200) {
                        alert("글 수정 완료!");
                        this.$router.replace(`/post/view/${response.data}`);
                    }
                });
        },
        addDeleteId(id) {
            this.post.deleteAttachmentIds.push(id);
        },
        check(id){
            return !this.post.deleteAttachmentIds.includes(id);
        },
        reset() {
          this.getPost();
          this.post.deleteAttachmentIds = [];
        },
        getPost() {
            http
                .get(`/post/${this.$route.params.id}`)
                .then((response) => {
                    console.log(response);
                    let data = response.data;
                    this.post.title = data.title;
                    this.post.content = data.content;
                    this.categoryName = data.categoryName;
                    this.attachments = data.attachmentResponses;
                })
        },
    },
    created() {
        this.getPost();
    },
}
</script>

<style scoped>

</style>