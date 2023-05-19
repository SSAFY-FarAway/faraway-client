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
                               v-model="hotPlace.title" placeholder="제목을 입력해주세요." />
                      </div>
                      <div class="mb-3">
                        <label for="zipcode" class="form-label fw-bolder">우편번호 :
                        </label>
                        <input type="text" class="form-control" id="zipcode"
                               v-model="hotPlace.zipcode" placeholder="우편번호를 입력해주세요." />
                      </div>
                      <div class="mb-3">
                        <label for="main-address" class="form-label fw-bolder">주소 :
                        </label>
                        <input type="text" class="form-control" id="main-address"
                               v-model="hotPlace.mainAddress" placeholder="주소를 입력해주세요." />
                      </div>
                      <div class="mb-3">
                        <label for="sub-address" class="form-label fw-bolder">상세주소 :
                        </label>
                        <input type="text" class="form-control" id="sub-address"
                               v-model="hotPlace.subAddress" placeholder="상세주소를 입력해주세요." />
                      </div>
                      <div class="mb-3">
                        <label for="rating" class="form-label fw-bolder">평점 :
                        </label>
                        <input type="number" class="form-control" id="rating"
                               v-model="hotPlace.rating" placeholder="평점..." />
                      </div>
                      <div class="mb-3">
                        <label for="content" class="form-label fw-bolder">내용 :
                        </label>
                        <textarea class="form-control" id="content" v-model="hotPlace.content"
                                  rows="7" placeholder="내용을 입력해주세요."></textarea>
                      </div>
                      <div class="mb-3">
                          <label for="files" class="form-label">기존 파일:</label>
                          <div v-for="image in images" :key="image.id">
                              <span :id="image.id" class="form-control" v-if="check(image.id)">
                                {{image.uploadFileName | fileNameFilter}}
                                <button id="btn-delete-file" class="btn-outline-danger" @click="addDeleteImageId(image.id)">삭제</button>
                              </span>
                          </div>
                      </div>
                      <div class="mb-3">
                        <label for="upload-file" class="form-label">파일 : 이미지 파일(.jpg, .png, .gif, ...)만 업로드 가능합니다:</label>
                        <input type="file" @change="selectFile" class="form-control border" id="upload-file" ref="uploadFile" multiple>
                      </div>
                      <div class="col-auto text-center">
                        <button id="btn-register"
                                @click="modify"
                                class="btn shadow btn-primary mb-3">
                          글수정
                        </button>
                        <button @click="reset" class="btn btn-danger shadow mb-3">초기화</button>
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
    name: "HotPlaceModify",
    components: {},
    data() {
        return {
            hotPlace: {
                title: "",
                content: "",
                zipcode: "",
                mainAddress: "",
                subAddress: "",
                rating: 0,
                deleteImageIds: [],
            },
            images: [],
        }
    },
    methods: {
        selectFile() {
            this.images = this.$refs.uploadFile.files;
            console.log(this.images);
        },
        modify() {
            const formData = new FormData();
            [...this.images].forEach((file) => formData.append("files", file));
            formData.append("request", new Blob([JSON.stringify(this.hotPlace)], {type: "application/json"}));
            http.put(`/hot-place/${this.$route.params.id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
                .then((response) => {
                    console.log(response);
                    if (response.status === 200) {
                        this.$alertSuccess("수정 완료", "수정 완료");
                        this.$router.replace(`/hot-place/view/${response.data}`);
                    }
                })
                .catch(() => {
                    this.$alertDanger("수정 싶패", "추후 예외 처리 추가 예정");
                });
        },
        getHotPlace() {
            http
                .get(`/hot-place/${this.$route.params.id}`)
                .then((response) => {
                    console.log(response);
                    let data = response.data;
                    this.hotPlace.title = data.title;
                    this.hotPlace.content = data.content;
                    this.hotPlace.zipcode = data.zipcode;
                    this.hotPlace.mainAddress = data.mainAddress;
                    this.hotPlace.subAddress = data.subAddress;
                    this.hotPlace.rating = data.rating;
                    this.images = data.imageResponses;
                })
        },
        addDeleteImageId(id) {
            console.log(`id: ${id}`);
            this.hotPlace.deleteImageIds.push(id);
        },
        check(id) {
            return !this.hotPlace.deleteImageIds.includes(id);
        },
        reset() {
            this.getHotPlace();
            this.hotPlace.deleteImageIds = [];
        }
    },
    created() {
        this.getHotPlace();
    },
}
</script>

<style scoped>

</style>