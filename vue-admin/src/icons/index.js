import Vue from "vue";
import SvgIcon from "./SvgIcon.vue";
// 自定义全局组件
Vue.component("svg-icon", SvgIcon);

//解析svg文件
//require.comtext, 读取指定目录下所有文件
//第一个: 目录
//第二个: 是否遍历子及目录
//第三个: 定义遍历文件规则

const req = require.context("./svg", false, /\.svg$/); //表示以svg结尾的文件
const requireAll = (requireContext) => {
  return requireContext.keys().map(requireContext);
};
requireAll(req);
