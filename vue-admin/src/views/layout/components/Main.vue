<template>
  <div id="main-wrap">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "Main"
}
</script>
  
<style lang="scss" scoped>
@import "../../../styles/main.scss";
#main-wrap {
  position: fixed;
  left: $naveManue;
  top: 75px;
  right: 0;
  bottom: 0;
  border: 30px solid #f7f7f7;
  border-bottom: none;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  transition: all 0.3s ease 0s;
  -webkit-transition: all 0.3s ease 0s;
}

.open {
  #main-wrap {
    left: $naveManue;
  }
}

.close {
  #main-wrap {
    left: 64px;
  }
}
</style>