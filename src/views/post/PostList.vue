<template>
  <div class="container">
    <!-- Header -->
    <page-header title="COMMUNITY" subTitle="공지사항" />

    <!-- 검색 메뉴 -->
    <div class="p-0 pb-1 m-0 col-12 row justify-content-between">
      <write-btn path="/post/write" btnName="write post" />
      <form class="d-flex">
        <b-form-select class="col-md-4" v-model="selected" :options="options" />
        <input
          type="text"
          class="form-control ml-1"
          placeholder="검색어 입력"
        />
        <button type="button" class="btn btn-secondary ml-1 text-uppercase">
          Search
        </button>
      </form>
    </div>
    <!-- 게시글 List - 테이블 -->
    <table class="table table-hover shadow rounded" id="plan-table">
      <thead>
        <table-row-header :titles="titles" />
      </thead>
      <tbody v-for="post in posts" :key="post.id">
        <table-row-data :data="post" :titles="titles" domain="post" />
      </tbody>
    </table>
    <!-- 페이지네이션 -->
    <page-navigation :totalCnt="posts.totalCnt" />
  </div>
</template>

<script>
import http from "@/utils/api/http";
import pageHeader from "@/components/common/page/pageHeader";
import tableRowHeader from "@/components/common/page/tableRowHeader";
import PageNavigation from "@/components/common/page/pageNavigation";
import writeBtn from "@/components/common/page/writeBtn";
import tableRowData from "@/components/common/page/tableRowData";

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
    },
  },
};
</script>

<style scoped>
#search-select-box {
  width: 200px;
}
</style>
