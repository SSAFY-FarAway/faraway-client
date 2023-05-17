import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView";
import AttractionView from "../views/AttractionView";
import MemberView from "../views/MemberView";
import PlanView from "../views/PlanView";
import PostView from "../views/PostView";
import PostDetail from "@/views/post/PostDetail";
import HotPlaceView from "../views/HotplaceView";

import TheIndex from "../views/home/TheIndex";
import MemberList from "../views/member/MemberList";
import MemberRegister from "../views/member/MemberRegister";
import MemberLogin from "../views/member/MemberLogin";
import AttrationList from "../views/attraction/AttrationList";
import PlanList from "../views/plan/PlanList";
import PlanDetail from "../views/plan/PlanDetail";
import PlanWrite from "../views/plan/PlanWrite";
import PostList from "../views/post/PostList";
import PostWrite from "@/views/post/PostWrite.vue";
import PostModify from "@/views/post/PostModify.vue";
import HotPlaceDetail from "@/views/hotplace/HotPlaceDetail.vue";
import HotPlaceList from "@/views/hotplace/HotPlaceList.vue";
import HotPlaceWrite from "@/views/hotplace/HotPlaceWrite.vue";

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
    redirect: "/member/list",
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
    ],
  },
  {
    path: "/attraction",
    name: "attraction",
    component: AttractionView,
    redirect: "/attraction/list",
    children: [
      {
        path: "list",
        name: "AttractionList",
        component: AttrationList,
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
        children: [],
      },
      {
        path: "write",
        name: "PlanWrite",
        component: PlanWrite,
        children: [],
      },
      {
        path: ":planId",
        name: "PlanDetail",
        component: PlanDetail,
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
        path: "list",
        name: "PostList",
        component: PostList,
        children: [],
      },
      {
        path: "view/:postId",
        name: "PostDetail",
        component: PostDetail,
        children: [],
      },
      {
        path: "write",
        name: "PostWrite",
        component: PostWrite,
        children: [],
      },
      {
        path:"modify/:postId",
        name:"PostModify",
        component: PostModify,
        children: [],
      }
    ],
  },
  {
    path: "/hotplace",
    name: "hotPlace",
    component: HotPlaceView,
    redirect: "/hotplace/list",
    children: [
      {
        path: "list",
        name: "HotPlaceList",
        component: HotPlaceList,
        children: [],
      },
      {
        path: "view/:hotPlaceId",
        name: "HotPlaceDetail",
        component: HotPlaceDetail,
        children: [],
      },
      {
        path: "write",
        name: "HotPlaceWrite",
        component: HotPlaceWrite,
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
