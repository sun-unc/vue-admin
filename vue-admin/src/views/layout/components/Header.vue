<template>
  <div id="header-wrap">
    <div class="pull-left header-icon" @click="navMenuState">
      <svg-icon iconClass="menu" class="menu" />
    </div>
    <div class="pull-right">
      <span class="user-info">{{ username }}</span>
      <div class="header-icon" @click="exit">
        <svg-icon iconClass="exit" class="exit" />
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "@vue/composition-api";
export default {
  name: "Header",
  setup(props, { root }) {
    const username = computed(() => root.$store.state.app.username);
    const navMenuState = () => {
      root.$store.commit("app/SET_COLLAPSE");
    };
    //退出登录
    const exit = () => {
      root.$store.dispatch("app/exit").then(() => {
        root.$router.push({
          path: "/login",
        });
      });
    };
    return {
      navMenuState,
      username,
      exit,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../../../styles/main.scss";
#header-wrap {
  position: fixed;
  top: 0;
  right: 0;
  left: $naveManue;
  height: 75px;
  background-color: #fff;
  -webkit-box-shadow: 0 3px 16px rgba(0, 0, 0, 0.1);
  box-shadow: 0 3px 16px rgba(0, 0, 0, 0.1);
  line-height: 75px;
  transition: all 0.3s ease 0s;
  -webkit-transition: all 0.3s ease 0s;
}
.open {
  #header-wrap {
    left: $naveManue;
  }
}

.close {
  #header-wrap {
    left: 64px;
  }
}
.header-icon {
  float: left;
  padding: 0 32px;
  svg {
    margin-bottom: -8px;
    font-size: 15px;
    cursor: pointer;
  }
}
.pull-right {
  width: 300px;
  float: right;
  .user-info {
    padding: 0 32px;
    height: 100%;
    border-left: 1px solid #ccc;
  }
}
</style>
