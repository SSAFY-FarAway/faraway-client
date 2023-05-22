<template>
  <div class="container">
    <!-- Header -->
    <page-header title="WRITE" subTitle="게시글 작성"/>
    <hr />
    <b-form-select class="col-3 text-center"  id="category-select-box" v-model="request.categoryId" :options="options"
  >
  </b-form-select>
    <!-- 게시글 제목 -->
    <div class="row m-0 mt-3">
      <input type="text" class="form-control " id="title" style="font-size : 1.1em" v-model="request.title" placeholder="제목을 입력해주세요"/>
    </div>

    <!-- 게시글 정보 -->
    <div class="mt-3">
      <span id="member-id" class="text-secondary fw-light" style="font-size : 0.9em">
        작성자 : {{ loginMember.loginId }} 
      </span>
      <br />
      <span id="created-date" class="text-secondary fw-light" style="font-size : 0.9em">
        작성일 : {{ $options.filters.timeFilter(new Date()) }}
      </span>
    </div>

    <!-- 게시글 내용 -->
    <textarea class="form-control mt-3" id="content" v-model="request.content" rows="7" placeholder="내용을 입력해주세요">
    </textarea>

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
      <button class="btn btn-primary ml-2" @click="write">글 작성</button>
    </div>
   
  </div>  
</template>

<script>
import http from "@/utils/api/http";
import pageHeader from "@/components/common/page/pageHeader";
import { mapState } from 'vuex';


export default {
  name: "PostWrite",
  components: {pageHeader},
  data() {
    return {
      options: [
        { value: null, text: "카테고리 선택" },
        { value: 1, text: "공지사항" },
        { value: 2, text: "자유게시판" },
        { value: 3, text: "Q&A 게시판" },
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
    }
  },
  computed: {
    ...mapState("memberStore",["loginMember"])
  },
  created() {},
};
</script>

<style scoped>
#content {
  min-height: 400px;
}

</style>
