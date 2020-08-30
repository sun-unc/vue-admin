import router from "./index";

import { getToken } from "@/utils/app";
import { removeToken, removeUsername } from "../utils/app";

//声明白名单
const whiteRouter = ["/login"]; //indexOf方法判断数组中是否有指定的对象
//路由守卫
router.beforeEach((to, from, next) => {
  if (getToken("admin_token")) {
    if (to.path == "/login") {
      removeToken("admin_token");
      removeUsername("username");
      next();
    } else {
      next();
    }
    console.log("存在");
  } else {
    console.log("不存在");

    if (whiteRouter.indexOf(to.path) !== -1) {
      //存在时
      next();
    } else {
      next("/login"); //路由指向
    }
    // 1.直接进入/console的时候,参数to被改变成了"/console".触发路由指向,进入beforeEach
    //2.判断to.path不在白名单里面,这时候执行next("/login"),to的参数再次改变成"/login"
    //3.此时白名单里存在该路由执行next(),因为没有参数,所以不会执行beforeEach
  }
});
