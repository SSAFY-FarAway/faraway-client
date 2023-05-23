<template>
    <div class="container">
        <!-- Header -->
        <page-header title="WRITE" subTitle="게시글 수정"/>
        <hr />
        <!-- 카테고리 필터 예정 -->

        <!-- 게시글 제목 -->
        <div class="row m-0 mt-3">
            <input type="text" class="form-control " id="title" style="font-size : 1.1em" v-model="post.title" v-focus placeholder="제목을 입력해주세요"/>
        </div>

        <!-- 게시글 정보 -->
        <div class="mt-3">
            <!--      <span id="member-id" class="text-secondary fw-light" style="font-size : 0.9em">-->
            <!--        작성자 : {{ loginMember.loginId }} -->
            <!--      </span>-->
            <!--      <br />-->
            <span id="created-date" class="text-secondary fw-light" style="font-size : 0.9em">
        작성일 : {{ $options.filters.timeFilter(new Date()) }}
      </span>
        </div>

        <!-- 게시글 내용 -->
        <textarea class="form-control mt-3" id="content" v-model="post.content" rows="7" placeholder="내용을 입력해주세요">
    </textarea>

        <!-- 기존 파일 영역 -->
        <div class="mt-3">
            <p class="font-weight-bold">기존파일</p>
            <div v-for="attachment in post.attachments" :key="attachment.id">
                <span class="" :id="attachment.id" v-if="check(attachment.id)">
                    {{attachment.fileName}}
                    <b-icon
                            style=" color: red; cursor: pointer"
                            icon="x-square-fill"
                            font-scale="1"
                            class="font-weight-lighter" @click="addDeleteId(attachment.id)"></b-icon>
                </span>
            </div>
        </div>

        <!-- 파일 첨부 영역 -->
        <div class='mt-3'>
            <p class="font-weight-bold">첨부파일</p>
            <input style="cursor:pointer" type="file" @change="selectFile" ref="uploadFile" multiple/>
        </div>

        <hr/>

        <!-- 게시글 하단 메뉴 -->
        <div class="row p-0 m-0 justify-content-end">
            <button @click="$router.go(-1)" class="btn btn-secondary">
                이전으로
            </button>
            <button class="btn btn-primary ml-2" @click="modify">글 수정</button>
        </div>

    </div>
</template>

<script>
import http from "@/utils/api/http";
import pageHeader from "@/components/common/page/pageHeader.vue";
import {BIcon} from "bootstrap-vue";

export default {
    name: "PostModify",
    components: {BIcon, pageHeader},
    data() {
        return {
            post: {
                title: "",
                content: "",
                categoryId: "",
                categoryName: "",
                attachments: [],
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
            http.put(`/post/${this.$route.params.postId}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
                .then((response) => {
                    console.log(response);
                    if (response.status === 200) {
                        this.$alertSuccess("글 수정 완료!");
                        this.$router.replace(`/post/${this.$route.params.categoryId}/${response.data}`);
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
                .get(`/post/${this.$route.params.postId}`)
                .then((response) => {
                    console.log(response);
                    let data = response.data;
                    this.post.title = data.title;
                    this.post.content = data.content;
                    this.post.categoryId = data.categoryId;
                    this.post.categoryName = data.categoryName;
                    this.post.attachments = data.attachmentResponses;
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