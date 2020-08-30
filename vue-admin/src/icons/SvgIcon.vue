<template>
  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script>
import { reactive, ref, computed } from "@vue/composition-api";

export default {
  name: "svgIcon",
  props: {
    iconClass: {
      type: String,
      // default: "",
      // required: true,
      // validator: (value) => {
      //   // 校验规则
      //   return value >= 0;
      // },
    },
    className: {
      type: String,
      // default: "",
    },
  },
  setup(props, context) {
    const msg = ref("这是icon组件");

    // 计算属性在每次结果变化的时候得出结果并返回
    const iconName = computed(() => `#icon-${props.iconClass}`);
    const svgClass = computed(() => {
      if (props.className) {
        return `svg-icon ${props.className}`;
      } else {
        return `svg-icon`;
      }
    });

    return {
      msg,
      iconName,
      svgClass,
    };
  },
};
</script>

<style lang="scss" scoped>
.svg-icon {
  margin-right: 5px;
  width: 2em;
  height: 2em;
  // fill: currentColor;
  // color: #fff;
  &.font12 {
    font-size: 12px;
  }
  &.font50 {
    font-size: 50px;
  }
}
</style>
