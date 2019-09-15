<template>
  <el-container id="main">
    <el-aside width="200px">
      <Sidebar></Sidebar>
    </el-aside>
    <el-container>
      <el-header>
        <Navbar></Navbar>
      </el-header>
      <el-main>
        <Maincontent></Maincontent>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Sidebar from "@/layout/sidebar/index.vue";
import Maincontent from "@/layout/maincontent/index.vue";
import Navbar from "@/layout/navbar/index.vue";
export default {
  name: "layout",
  components: {
    Sidebar,
    Maincontent,
    Navbar
  }
};
</script>

<style lang="less" scoped>
#main {
  height: 100%;
  width: 100%;
  position: relative;
  z-index: 1;
  .el-header {
    position: relative;
    z-index: 1;
    padding: 0;
  }
  .el-main {
    position: relative;
    z-index: 1;
    overflow: hidden;
    padding: 0;
    margin: 20px;
  }
}
</style>