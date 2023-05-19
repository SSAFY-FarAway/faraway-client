<template>
<div class="container">
  <section class="" id="share-plan-list">
    <div class="text-center fw-bold" role="alert">
      <h2 class="section-heading text-uppercase">COMMUNITY</h2>
      <h3 class="section-subheading text-muted">공지사항</h3>
      <div class="row align-self-center mb-2">
        <div class="col-md-2 text-start">
          <router-link to="/post/write" class="btn btn-primary btn shadow-sm">글쓰기</router-link>
        </div>
        <div class="col-md-7 offset-3">
          <form class="d-flex" id="search-form">
            <b-form-select id='search-select-box' v-model="selected" :options="options"></b-form-select>
            <div class="input-group shadow-sm">
              <input type="text" class="form-control" v-model="keyword" placeholder="검색어 입력"/>
              <button class="btn btn-secondary" @click="search" type="button">Search</button>
            </div>
          </form>
        </div>
      </div>
      <!-- 게시글 List - 테이블 -->
      <table class="table table-hover shadow rounded" id="plan-table">
        <thead>
        <tr class="text-center table-warning">
          <th scope="col">글번호</th>
          <th scope="col">제목</th>
          <th scope="col">분류</th>
          <th scope="col">작성자</th>
          <th scope="col">조회수</th>
          <th scope="col">작성일</th>
        </tr>
        </thead>
        <tbody v-for="post in posts" :key="post.id">
        <post-table-row :post='post'/>
        </tbody>
      </table>
      <!-- 페이지네이션 -->
      <post-pagination :totalCnt="posts.totalCnt"/>
    </div>
  </section>
</div>
</template>
<script>
import http from "@/utils/api/http";
import PostTableRow from "@/components/post/PostTableRow";
import PostPagination from "@/components/post/PostPagination";

export default {
  name: "PostList",
  components: {
    PostTableRow,
    PostPagination
  },
  data() {
    return {
      selected: null,
      options: [
        {value: null, text: "검색 조건"},
        {value: "title", text: "제목"},
        {value: "content", text: "내용"}
      ],
      keyword: "",
      posts: [],
    };
  },
  created() {
    http
        .get("/post?categoryId=1")
        .then((response) => {
          if (response.status === 200) {
            console.log(response);
            this.posts = response.data.data;
          }
        })
        .catch(() => {
          this.$alertDanger("오류 발생", "추후 예외처리 추가 예정");
          console.log(`/post?categoryId=1`);
        });
  },
  methods: {
    search() {
      let url = `/post?${this.selected}=${this.keyword}&categoryId=1`;
      console.log(`selected: ${this.selected}`);
      http
          .get(url)
          .then((response) => {
            if (response.status === 200) {
              console.log(response);
              this.posts = response.data.data;
            }
          })
          .catch(() => {
            this.$alertDanger("오류 발생", "추후 예외처리 추가 예정");
          });
    }
  },
};
</script>

<style scoped>
  #search-select-box {
    width: 200px;
  }
</style>
