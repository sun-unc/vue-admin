import cookie from "cookie_js";
import { login } from "@/api/login";
import {
  setToken,
  setUsername,
  removeToken,
  removeUsername,
} from "@/utils/app";
const state = {
  // isCollapse: JSON.parse(Cookie.get("isCollapse")) || false,
  isCollapse: window.sessionStorage.getItem("isCollapse") || false,
  to_ken: "",
  username: cookie.get("username") || "",
};

const getters = {
  isCollapse: (state) => state.isCollapse,
  username: (state) => state.username,
};

const mutations = {
  //同步,没有回调处理事情
  SET_COLLAPSE(state) {
    state.isCollapse = !state.isCollapse;

    //html5本地存储
    // Cookie.set("isCollapse", JSON.stringify(state.isCollapse));
    window.sessionStorage.setItem(
      "isCollapse",
      JSON.stringify(state.isCollapse)
    );
  },
  SET_TOKEN(state, value) {
    state.to_ken = value;
  },
  SET_USERNAME(state, value) {
    state.username = value;
  },
  REMOVE_TOKEN(state) {
    state.to_ken = "";
    state.username = "";
  },
};

const actions = {
  //可以回调处理事情
  login(content, repuestData) {
    return new Promise((resolve, reject) => {
      login(repuestData)
        .then((res) => {
          let data = res.data.data;
          content.commit("SET_TOKEN", data.token);
          content.commit("SET_USERNAME", data.username);
          setToken(data.token);
          setUsername(data.username);
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  exit({ commit }) {
    return new Promise((resolve, reject) => {
      removeToken("admin_token");
      removeUsername("username");
      commit("SET_TOKEN", "");
      commit("SET_USERNAME", "");
      resolve();
    });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
