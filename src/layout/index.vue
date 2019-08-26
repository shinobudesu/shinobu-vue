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
        <Maincontent class="maincontent">
          <transition name="fade-transform">
            <router-view></router-view>
          </transition>
        </Maincontent>
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
  z-index: 3;
  .el-header {
    padding: 0;
  }
}
</style>