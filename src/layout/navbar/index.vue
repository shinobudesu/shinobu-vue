<template>
  <div id="navbar">
    <div class="blank"></div>
    <el-dropdown class="info">
      <span class="el-dropdown-link">Shinobu</span>
      <el-avatar class="avatar" :src="avatar" @error="errorHandler"></el-avatar>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>个人信息</el-dropdown-item>
        <el-dropdown-item>退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  name: "navbar",
  data() {
    return {
      avatar:
        "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
    };
  },
  methods: {
    errorHandler() {
      return true;
    }
  }
};
</script>

<style lang="less" scoped>
#navbar {
  height: 60px;
  padding: 0 20px;
  display: flex;
  box-shadow: 0 0 5px #ccc;
  .blank {
    flex: 1;
  }
  .info {
    line-height: 60px;
    cursor: pointer;
    .avatar {
      vertical-align: top;
      margin-top: 10px;
      margin-left: 10px;
    }
  }
}
</style>