<template>
  <el-menu
    default-active="1"
    class="el-menu-vertical"
    @open="handleOpen"
    @close="handleClose"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#44c7f1"
    :router="true"
  >
    <el-menu-item index="1" route="/backstage/statics">
      <i class="el-icon-edit-outline"></i>
      <span slot="title">统计管理</span>
    </el-menu-item>
    <el-menu-item index="2" route="/backstage/article">
      <i class="el-icon-edit-outline"></i>
      <span slot="title">文章管理</span>
    </el-menu-item>
    <el-menu-item index="3" route="/backstage/log">
      <i class="el-icon-date"></i>
      <span slot="title">日志管理</span>
    </el-menu-item>
    <el-menu-item index="4" route="/backstage/role">
      <i class="el-icon-setting"></i>
      <span slot="title">权限管理</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    handleOpen(key, keyPath) {},
    handleClose(key, keyPath) {}
  }
};
</script>

<style lang="less" scoped>
.el-menu-vertical {
  min-height: 100%;
  .el-menu-item {
    text-align: left;
  }
}
</style>