<template>
  <div id="layout" :class="[menuStatus ? 'close' : 'open']">
    <layout-header />
    <layout-main />
    <layout-nav />
  </div>
</template>

<script>
import LayoutHeader from "./components/Header";
import LayoutMain from "./components/Main";
import LayoutNav from "./components/Nav";
import { computed } from "@vue/composition-api";
export default {
  name: "Layout",
  components: {
    LayoutHeader,
    LayoutMain,
    LayoutNav,
  },
  setup(props, { root }) {
    const menuStatus = computed(() => root.$store.state.app.isCollapse);

    return {
      menuStatus,
    };
  },
};
</script>

<style lang="scss" scoped></style>
