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
    redirect: "/member/list",
    children: [
      {
        path: "list",
        name: "list",
        component: MemberList,
        children: [],
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
        name: "list",
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
        name: "list",
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
        name: "list",
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
        name: "list",
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
