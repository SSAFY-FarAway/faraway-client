<template>
    <header id="header" class="fixed-top d-flex align-items-center">
        <div class="container">
            <div class="header-container d-flex align-items-center justify-content-between">
                <div class="logo">
                    <h1 class="text-light">
                        <router-link to="/"><span>FAR AWAY</span></router-link>
                    </h1>
                </div>
    
                <nav id="navbar" class="navbar">
                    <ul>
                        <li><a class="nav-link scrollto" href="${root}/board?action=get-list&category=notice&pageNo=1&key=&word=">공지사항</a></li>
                        <li><a class="nav-link scrollto"
                               href="${root}/attraction?action=mv-list">지역별 여행지</a></li>
                        <li class="dropdown">
                            <a href="#">
                                <span>여행정보 공유</span>
                                <i class="bi bi-chevron-down"></i>
                            </a>
                            <ul>
                                <li><a class="nav-link scrollto" href="${root}/board?action=get-list&category=share&pageNo=1&key=&word=">공유게시판</a></li>
                                <li><a class="scrollto" href="${root}/plan?action=planlist&pageNo=1&key=&word=">나의
                                    여행계획</a></li>
                                <li><a class="nav-link scrollto" href="${root}/attraction/hotplace-index.jsp#hotplace">핫플 자랑하기</a>
                                </li>
                            </ul>
                        </li>
                        <li class="dropdown">
                            <a href="#">
                                    <span id="account">계정</span>
                                    <span id="account">님</span>
                                <i class="bi bi-chevron-down"></i>
                            </a>
                            <ul>
                                    <li><a class="nav-link scrollto" href="${root}/user?action=mv-login"> 로그인 </a></li>
                                    <li><a class="nav-link scrollto" href="${root}/user?action=mv-regist"> 회원가입 </a></li>
                                    <li><a class="nav-link scrollto" href="${root}/user?action=logout"> 로그아웃 </a></li>
                                    <li><a class="nav-link scrollto" href="${root}/user?action=mv-info"> 마이페이지 </a></li>
                            </ul>
                        </li>
                        <li>
                            <div style="width: 20px"></div>
                        </li>
                    </ul>
                    <i class="bi bi-list mobile-nav-toggle"></i>
                </nav>
            </div>
        </div>
    </header>
</template>

<script>
export default {
    name: 'NavBar',
    components: {},
    data() {
        return {
            message: '',
        };
    },
    created() {},
    methods: {},
};
</script>

<style scoped>
@import "@/assets/css/style.css";
</style>