<template>
    <div class="container">
        <page-header :title="post.categoryName" subTitle="게시글 상세보기"/>
        <hr/>

        <!-- 게시글 제목 -->
        <div class="row m-0 mt-3">
            <h2 id="title" class="col-11 p-0">{{ post.title }}</h2>
            <b-dropdown
                    v-if="post.memberId === loginMember.id"
                    class="col-1 p-0"
                    size="md"
                    variant="link"
                    toggle-class="text-decoration-none"
                    no-caret
            >
                <template #button-content>
                    <b-icon
                            icon="caret-down-fill"
                            font-scale="1"
                            style="color: var(--main-color)"
                    ></b-icon>
                </template>
                <b-dropdown-item @click="moveModify">게시글 수정</b-dropdown-item>
                <b-dropdown-item @click="deletePost">게시글 삭제</b-dropdown-item>
            </b-dropdown>
        </div>

        <!-- 게시글 정보 -->
        <div class="mt-2">
      <span id="member-id" class="text-secondary fw-light">
        작성자 : {{ post.loginId }}
      </span>
            <br/>
            <span id="created-date" class="text-secondary fw-light">
        작성일 : {{ post.createdDate | timeFilter }}
      </span>
            <br/>
            <span id="hit" class="text-secondary fw-light">
        조회수 : {{ post.hit }}
      </span>

            <!-- 게시글 내용 -->
            <div class="mt-3" id="content">
                <pre>{{ post.content }}</pre>
            </div>

            <!-- 파일 첨부 영역 -->
            <!-- TODO: 파일 없는 경우 처리 해야함 -->
            <div v-if="attachments.length">
                <p class="font-weight-bold">첨부파일</p>
                <ul class="pl-3">
                    <li v-for="attachment in attachments" :key="attachment.id">
                        {{ attachment.fileName }}
                        <a :href="'http://localhost/attachment/download/' + attachment.id">
                            [다운로드]
                        </a>
                    </li>
                </ul>
            </div>

            <!-- 좋아요 버튼 -->
            <div class="d-flex justify-content-center align-items-center mt-5">
                <!-- 좋아요 눌렀을 때 -->
                <button v-if="this.likeId" class="btn btn-primary" @click="unlike">
                    <b-icon icon="heart-fill" font-scale="1"></b-icon>
                </button>
                <!-- 좋아요 안 눌렀을 때 -->
                <button v-else class="btn btn-outline-secondary" @click="like">
                    <b-icon icon="heart-fill" font-scale="1"></b-icon>
                </button>
            </div>
            <hr/>

            <!-- 댓글 영역 -->
            <div>
                <h5>{{ comments.length }}개의 댓글</h5>
                <!-- 댓글 목록 -->
                <div v-for="comment in comments" :key="comment.id">
                    <comment-row :comment="comment"/>
                </div>
                <!-- 댓글 작성 -->
                <comment-form/>
            </div>
        </div>

        <hr/>

        <!-- 게시글 하단 메뉴 -->
        <div class="row p-0 m-0 justify-content-end">
            <router-link to="/post/list" class="btn btn-outline-secondary">
                목록으로
            </router-link>
            <button class="btn btn-outline-secondary ml-2" @click="toTop">TOP</button>
        </div>
    </div>
</template>
<script>
import http from "@/utils/api/http";
import pageHeader from "@/components/common/page/pageHeader";
import CommentForm from "@/components/common/comment/CommentForm.vue";
import CommentRow from "@/components/common/comment/CommentRow";
import {BIcon} from "bootstrap-vue";
import jwtDecode from "jwt-decode";
import {mapState} from "vuex";

export default {
    name: "PostDetail",
    components: {pageHeader, CommentRow, CommentForm, BIcon},
    data() {
        return {
            post: {},
            comments: [],
            attachments: [],
            likeId: Number,
        };
    },
    created() {
        http.get(`/post/${this.$route.params.postId}`).then((res) => {
            console.log(res);
            this.post = res.data;
            this.comments = this.post.postCommentResponses;
            this.attachments = this.post.attachmentResponses;
            this.likeId = this.post.likeId;
        });
    },
    methods: {
        moveModify() {
            const url = `${this.$route.path}/edit`;
            console.log(url);
            this.$router.push(url);
        },
        deletePost() {
            if (confirm("삭제하시겠습니까? 삭제된 글은 복구할 수 없습니다.")) {
                http.delete(`/post/${this.$route.params.postId}`).then((res) => {
                    if (res.status === 200) {
                        alert("삭제가 완료되었습니다.");
                        this.$router.replace(`/post/list`);
                    }
                });
            }
        },
        toTop() {
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        },
        like() {
            const accessToken = sessionStorage.getItem("access-token");
            const decodedAccessToken = jwtDecode(accessToken);
            const memberId = decodedAccessToken.memberId;

            const data = {
                postId: this.post.id,
                memberId: memberId
            }

            http
                .post(`/post/${this.post.id}/like`, data)
                .then((response) => {
                    console.log(`like response: ${response}`);
                    if (response.status === 200) {
                        this.likeId = response.data;
                        this.$alertSuccess("좋아요", "게시글에 좋아요를 했습니다.");
                    }
                })
                .catch(() => {
                    this.$alertDanger("오류 발생", "추후 예외처리 추가 예정");
                });
        },
        unlike() {
            console.log(`likeId: ${this.likeId}`)
            http
                .delete(`/post/like/${this.likeId}`)
                .then((response) => {
                    if (response.status === 200) {
                        this.likeId = null;
                        this.$alertSuccess("좋아요 취소", "좋아요 취소를 누르셨습니다.");
                    }
                })
                .catch(() => {
                    this.$alertDanger("오류 발생", "추후 예외처리 추가 예정");
                })
        }
    },
    watch: {
        likeId(after, before) {
            console.log(before)
            console.log(after)
        }
    },
    computed: {
        ...mapState("memberStore", ["isLogin", "loginMember"]),
    }
};
</script>
<style scoped>
#content {
    min-height: 400px;
}
</style>
