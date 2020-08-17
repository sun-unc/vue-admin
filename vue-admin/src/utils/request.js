import axios from "axios";
import { Message } from "element-ui";
//创建axios,赋值给service
const service = axios.create({
  baseURL: "/getApi",
  timeout: 5000,
});

//添加请求拦截器
service.interceptors.request.use(
  (config) => {
    //在发送请求之前做什么
    //在这里添加相应的请求参数
    //Token, userId, sui...
    config.headers["Token"] = "11111111";
    //config.headers.Token = '11111111';
    config.headers["userId"] = "22222222";
    return config;
  },
  (err) => {
    // 对请求错误做什么
    return Promise.reject(err);
  }
);
//添加响应拦截器
service.interceptors.response.use(
  (res) => {
    //对响应数据操作
    if (res.data.resCode !== 0) {
      Message.error(res.data.message); //用elementui的弹窗进行错误提示
      return Promise.reject(res.data);
    } else {
      return res;
      // return Promise.resolve;
    }
  },
  (err) => {
    //对响应错误操作
    return Promise.reject(err);
  }
);

export default service;
