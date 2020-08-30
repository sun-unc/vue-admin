<template>
  <div id="nav-wrap">
    <div class="nav-top-icon">
      <svg-icon iconClass="vue" class="vue vue-icon" />
    </div>
    <el-menu
      default-active="1-4-1"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
      background-color="transparent"
      text-color="#fff"
      active-text-color="#409EFF"
      :router="true"
    >
      <template v-for="(item, index) in routers">
        <el-submenu :key="item.id" :index="index + ''" v-if="!item.hidden">
          <!-- 1级菜单 -->
          <template slot="title">
            <svg-icon :iconClass="item.meta.icon" :className="item.meta.icon" />
            <span slot="title">{{ item.meta.name }}</span>
          </template>
          <!-- 子级菜单 -->
          <el-menu-item
            v-for="subItem in item.children"
            :key="subItem.id"
            :index="subItem.path"
            >{{ subItem.meta.name }}</el-menu-item
          >
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>

<script>
import {
  reactive,
  ref,
  isRef,
  toRefs,
  onMounted,
  computed,
} from "@vue/composition-api";

export default {
  name: "Nav",
  setup(props, { root }) {
    console.log(root.$router);
    //变量
    // const isCollapse = ref(true);
    const routers = reactive(root.$router.options.routes);
    //监听值的变化
    const isCollapse = computed(() => root.$store.state.app.isCollapse);
    //方法
    const handleOpen = (key, keyPath) => {
      // console.log(key, keyPath);
    };
    const handleClose = (key, keyPath) => {
      // console.log(key, keyPath);
    };

    return {
      isCollapse,
      handleOpen,
      handleClose,
      routers,
    };
  },
};
</script>

<style lang="scss">
@import "../../../styles/main.scss";
#nav-wrap {
  position: fixed;
  top: 0;
  left: 0;
  width: $naveManue;
  height: 100vh;
  background-color: #344a5f;
  transition: all 0.3s ease 0s;
  -webkit-transition: all 0.3s ease 0s;
}
.nav-top-icon {
  height: 150px;
  text-align: center;
  .vue-icon {
    transition: all 0.3s ease 0s;
    -webkit-transition: all 0.3s ease 0s;
    font-size: 70px;
  }
}
.open {
  #nav-wrap {
    width: $naveManue;
  }
}
.close {
  #nav-wrap {
    width: 64px;
  }
  .vue-icon {
    font-size: 30px;
  }
}
</style>
