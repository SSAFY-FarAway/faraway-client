import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView";
import AttractionView from "../views/AttractionView";
import MemberView from "../views/MemberView";
import PlanView from "../views/PlanView";
import PostView from "../views/PostView";
import HotplaceView from "../views/HotplaceView";

import TheIndex from "../views/home/TheIndex";
import MemberList from "../views/member/MemberList";
import MemberRegister from "../views/member/MemberRegister";
import MemberMypage from "../views/member/MemberMyPage";
import MemberFind from "../views/member/MemberFind";
import MemberLogin from "../views/member/MemberLogin";
import AttrationList from "../views/attraction/AttrationList";
import PlanList from "../views/plan/PlanList";
import PostList from "../views/post/PostList";
import HotplaceList from "../views/hotplace/HotplaceList";

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
    // redirect 의 역할을 모르게땅!
    // redirect: "/member/list",
    
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
        path: ":memberId",
        name: "MemberMypage",
        component: MemberMypage,
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
    ],
  },
  {
    path: "/hotplace",
    name: "hotplace",
    component: HotplaceView,
    redirect: "/hotplace/list",
    children: [
      {
        path: "list",
        name: "Hotplace",
        component: HotplaceList,
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
