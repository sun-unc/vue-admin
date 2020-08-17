import service from "@/utils/request";

//获取验证码
export function getSms(data) {
  return service.request({
    method: "post",
    url: "/getSms/",
    data, //ES6的写法
  });
}
//获取用户角色

//登录
export function login(data) {
  return service.request({
    method: "post",
    url: "/login/",
    data,
  });
}
//注册
export function regist(data) {
  return service.request({
    method: "post",
    url: "/register/",
    data,
  });
}
