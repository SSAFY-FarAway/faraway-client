<template>
    <div class="pl-3">
        <div class="p-0 align-items-center">
            <div>
                <span class="font-weight-bold">{{ comment.loginId }}</span>
                <span class="pl-2 small text-secondary fw-light">{{
                    comment.createdDate | timeFilter
                    }}</span>

                <b-dropdown
                        v-if="comment.memberId === loginMember.id"
                        class="p-0"
                        size="md"
                        variant="link"
                        toggle-class="text-decoration-none"
                >
                    <b-dropdown-item @click="modifyComment">댓글 수정</b-dropdown-item>
                    <b-dropdown-item @click="deleteComment">댓글 삭제</b-dropdown-item>
                </b-dropdown>
            </div>
        </div>
        <div>
            <p>{{ comment.content }}</p>
            <hr/>
        </div>
    </div>
</template>

<script>
import http from "@/utils/api/http";
import {mapState} from "vuex";

export default {
    name: "CommentRow",
    components: {},
    props: {
        comment: Object,
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
                        this.$alertDanger("삭제 성공", "삭제가 완료되었습니다.");
                        this.$router.go(0);
                    }
                })
                .catch(() => {
                    this.$alertDanger("삭제 실패", "추후 예외처리 추가 예정");
                });
        },
    },
    computed: {
        ...mapState("memberStore", ["isLogin", "loginMember"]),
    }
};
</script>

<style scoped></style>
