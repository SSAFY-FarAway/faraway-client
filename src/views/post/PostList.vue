<template>
  <div class="container">
    <!-- Header -->
    <page-header
      :title="this.$route.params.categoryId | setTitle"
      :subTitle="this.$route.params.categoryId | setSubtitle"
    />

    <!-- 검색 메뉴 -->
    <div class="p-0 pb-1 m-0 col-12 row justify-content-between">
      <write-btn v-if="isBtnVisible" path="/post/write" btnName="write post" />
      <form class="d-flex">
        <b-form-select class="col-md-4" v-model="selected" :options="options" />
        <input
          type="text"
          class="form-control ml-1"
          v-model="keyword"
          placeholder="검색어 입력"
        />
        <button type="button" class="btn btn-secondary ml-1 text-uppercase" @click="search">
          Search
        </button>
      </form>
    </div>

    <!-- 게시글 List - 테이블 -->
    <div id="table-container">
      <table class="table table-hover shadow rounded" id="table">
        <thead>
          <table-row-header :titles="titles" />
        </thead>
        <tbody>
          <tr v-if="posts.length === 0">
            <td colspan="6">현재 등록된 게시글이 없습니다.</td>
          </tr>
          <table-row-data
            v-for="post in posts"
            :key="post.id"
            :data="post"
            :titles="titles"
            :domain="'post/'+$route.params.categoryId"
          />
        </tbody>
      </table>
    </div>
    <!-- 페이지네이션 -->
    <page-navigation :totalPages="pageTotalCnt" />
  </div>
</template>

<script>
import http from "@/utils/api/http";
import pageHeader from "@/components/common/page/pageHeader";
import tableRowHeader from "@/components/common/page/tableRowHeader";
import PageNavigation from "@/components/common/page/pageNavigation";
import writeBtn from "@/components/common/page/writeBtn";
import tableRowData from "@/components/common/page/tableRowData";
import {mapState} from "vuex";

export default {
  name: "PostList",
  components: {
    pageHeader,
    tableRowHeader,
    PageNavigation,
    tableRowData,
    writeBtn,
  },
  data() {
    return {
      selected: null,
      keyword: "",
      options: [
        { value: null, text: "검색 조건" },
        { value: "title", text: "제목" },
        { value: "content", text: "내용" },
      ],
      titles: [
        { title: "No", colSize: 1, colName: "id" },
        { title: "제목", colSize: 5, colName: "title" },
        { title: "작성자", colSize: 3, colName: "loginId" },
        { title: "조회수", colSize: 1, colName: "hit" },
        { title: "작성일", colSize: 2, colName: "createdDate" },
      ],
      posts: [],
      pageTotalCnt: 0,
    };
  },
  created() {
    this.getPosts();
      console.log(`categoryId: ${this.categoryId}`);
      console.log(`role: ${this.loginMember.role}`);
      console.log(`isBtnVisible: ${this.isBtnVisible()}`)
  },
  watch: {
    "$route.fullPath"() {
      this.getPosts();
    },
  },
  filters: {
    setTitle(categoryId) {
      switch (categoryId) {
        case "1":
          return "NOTICE";
        case "2":
          return "BOARD";
        case "3":
          return "BOARD";
      }
    },
    setSubtitle(categoryId) {
      switch (categoryId) {
        case "1":
          return "공지사항";
        case "2":
          return "자유게시판";
        case "3":
          return "Q&A게시판";
      }
    },
  },
  methods: {
    getPosts() {
      const pageNumber = this.isEmpty(this.$route.query.pageNumber);
      const title = this.isEmpty(this.$route.query.title);
      const content = this.isEmpty(this.$route.query.content);
      let url = `/post?title=${title}&content=${content}&categoryId=${this.categoryId}&pageNumber=${pageNumber}`
      console.log(`getURL : ${url}`);
      http
          .get(url)
          .then((res) => {
            if (res.status === 200) {
              this.pageTotalCnt = res.data.pageTotalCnt;
              this.posts = res.data.data;
              console.log('[PostList - getPosts]');
              console.log(res);
            }
          })
          .catch(() => {
            this.$alertDanger("오류 발생", "추후 예외처리 추가 예정");
          });
    },
    search() {
      const categoryId = this.$route.query.categoryId;
      let url = `/post?${this.selected}=${this.keyword}&categoryId=${categoryId}`;
      this.$router.push(url).catch(() => {
        this.getPosts();
      });
    },
    isEmpty(value) {
      return value || "";
    },
  },
    computed: {
        ...mapState("memberStore",["loginMember"]),
        categoryId() {
            return this.$route.params.categoryId;

        },
        isBtnVisible() {
            const role = this.loginMember.role;
            return (this.categoryId === "1" && role === "ADMIN") || (this.categoryId !== "1" && role !== "GUEST")
        }
    },
};
</script>

<style scoped>
#table-container {
  min-height: 550px;
}
</style>
