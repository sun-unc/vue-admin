import Vue from "vue";
import App from "./App.vue";
import router from "./router/index";
import store from "./store/index";
//引入element-ui
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import VueCompositionApi from "@vue/composition-api";
import "./router/premit";

//引入自定义全局组件
import "./icons";

// 全局挂载element-ui
Vue.use(ElementUI);

Vue.use(VueCompositionApi);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
