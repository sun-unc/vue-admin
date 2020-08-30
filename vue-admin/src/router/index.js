import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

import Layout from "../views/layout/Layout.vue";
const routes = [
  {
    path: "/",
    // 重定向
    redirect: "/login",
    hidden: true,
    meta: {
      name: "首页",
    },
  },

  {
    path: "/login",
    name: "Login",
    component: () => import("../views/login/index.vue"),
    hidden: true,
    meta: {
      name: "登录",
    },
  },
  {
    path: "/console",
    name: "Console",
    component: Layout,
    hidden: false,
    meta: {
      name: "控制台",
      icon: "console",
    },
    children: [
      {
        path: "/console",
        name: "Console",
        meta: {
          name: "首页",
        },
        component: () => import("../views/console/console.vue"),
      },
    ],
  },

  {
    path: "/console",
    name: "Console",
    redirect: "index",
    component: Layout,
    hidden: false,
    meta: {
      name: "信息管理",
      icon: "info",
    },
    children: [
      {
        path: "/info",
        name: "Info",
        meta: {
          name: "信息列表",
        },
        component: () => import("../views/Info/index.vue"),
      },
      {
        path: "/infoIndex",
        name: "InfoIndex",
        meta: {
          name: "信息分类",
        },
        component: () => import("../views/Info/Category.vue"),
      },
    ],
  },

  {
    path: "/user",
    name: "User",
    component: Layout,
    hidden: false,
    meta: {
      name: "用户管理",
      icon: "user",
    },
    children: [
      {
        path: "/userIndex",
        name: "UserIndex",
        meta: {
          name: "用户列表",
        },
        component: () => import("../views/user/User.vue"),
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;
