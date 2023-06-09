import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "@/views/HomeView";
import AttractionView from "@/views/AttractionView";
import MemberView from "@/views/MemberView";
import PlanView from "@/views/PlanView";
import PostView from "@/views/PostView";
import PostDetail from "@/views/post/PostDetail";
import HotPlaceView from "@/views/HotplaceView";

import TheIndex from "@/views/home/TheIndex";
import MemberList from "@/views/member/MemberList";
import MemberRegister from "@/views/member/MemberRegister";
import MemberMypage from "@/views/member/MemberMyPage";
import MemberFind from "@/views/member/MemberFind";
import MemberLogin from "@/views/member/MemberLogin";
import MemberUpdatePwd from "@/views/member/MemberUpdatePwd";
import AttrationIndex from "@/views/attraction/AttrationIndex";
import PlanList from "@/views/plan/PlanList";
import PlanDetail from "@/views/plan/PlanDetail";
import PlanWrite from "@/views/plan/PlanWrite";
import PlanModify from "@/views/plan/PlanModify";
import PostList from "@/views/post/PostList";
import PostWrite from "@/views/post/PostWrite";
import PostModify from "@/views/post/PostModify";
import HotPlaceDetail from "@/views/hotplace/HotPlaceDetail";
import HotPlaceList from "@/views/hotplace/HotPlaceList";
import HotPlaceWrite from "@/views/hotplace/HotPlaceWrite";
import HotPlaceModify from "@/views/hotplace/HotPlaceModify";
import store from "@/store";

const beforeLogin = (isAuth) => (from, to, next) => {
  const isLogin = store.getters["memberStore/getIsLogin"];
  if ((isLogin && isAuth) || (!isLogin && !isAuth)) {
    return next();
  } else {
    // 로그인 화면으로 이동
    alert("로그인이 필요한 페이지 입니다. 로그인 페이지로 이동합니다.");
    router.replace("/member/login");
  }
};

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    redirect: "/index",
    children: [
      {
        path: "index",
        name: "index",
        component: TheIndex,
        children: [],
      },
    ],
  },
  {
    path: "/member",
    name: "member",
    component: MemberView,
    children: [
      // TODO : list 는 추후에 없애거나 관리자 모드 추가 시 변경 예정 (예시로 둔거임)
      {
        path: "list",
        name: "MemberList",
        component: MemberList,
      },
      {
        path: "register",
        name: "register",
        component: MemberRegister,
      },
      {
        path: "login",
        name: "login",
        component: MemberLogin,
      },
      {
        path: "find",
        name: "MemberFind",
        component: MemberFind,
      },
      {
        path:"changePassword",
        name : "MemberUpdatePwd",
        component :MemberUpdatePwd,
        beforeEnter: beforeLogin(true),
      },
      {
        path: ":memberId",
        name: "MemberMypage",
        component: MemberMypage,
        beforeEnter: beforeLogin(true),
      },
      
    ],
  },
  {
    path: "/attraction",
    name: "attraction",
    component: AttractionView,
    redirect: "/attraction/list",
    children: [
      {
        path: "index",
        name: "AttrationIndex",
        component: AttrationIndex,
        children: [],
      },
    ],
  },
  {
    path: "/plan",
    name: "plan",
    component: PlanView,
    redirect: "/plan/list",
    children: [
      {
        path: "list",
        name: "PlanList",
        component: PlanList,
        props: true,
        children: [],
      },
      {
        path: "write",
        name: "PlanWrite",
        component: PlanWrite,
        props: true,
        beforeEnter: beforeLogin(true),
        children: [],
      },
      {
        path: ":id/edit",
        name: "PlanModify",
        component: PlanModify,
        beforeEnter: beforeLogin(true),
        children: [],
      },
      {
        path: ":id",
        name: "PlanDetail",
        component: PlanDetail,
        beforeEnter: beforeLogin(true),
        children: [],
      },
    ],
  },
  {
    path: "/post",
    name: "post",
    component: PostView,
    redirect: "/post/list",
    children: [
      {
        path: "write",
        name: "PostWrite",
        component: PostWrite,
        beforeEnter: beforeLogin(true),
        children: [],
      },
      {
        path: ":categoryId/list",
        name: "PostList",
        component: PostList,
        children: [],
      },
      {
        path: ":categoryId/:id",
        name: "PostDetail",
        component: PostDetail,
        beforeEnter: beforeLogin(true),
        children: [],
      },
      {
        path: ":categoryId/:id/edit",
        name: "PostModify",
        component: PostModify,
        beforeEnter: beforeLogin(true),
        children: [],
      },
    ],
  },
  {
    path: "/hot-place",
    name: "hotPlace",
    component: HotPlaceView,
    redirect: "/hot-place/list",
    children: [
      {
        path: "list",
        name: "HotPlaceList",
        component: HotPlaceList,
        children: [],
      },
      {
        path: "write",
        name: "HotPlaceWrite",
        component: HotPlaceWrite,
        beforeEnter: beforeLogin(true),
        children: [],
      },
      {
        path: ":id",
        name: "HotPlaceDetail",
        component: HotPlaceDetail,
        beforeEnter: beforeLogin(true),
        children: [],
      },
      {
        path: ":id/edit",
        name: "HotPlaceModify",
        component: HotPlaceModify,
        beforeEnter: beforeLogin(true),
        children: [],
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
