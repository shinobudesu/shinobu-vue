<template>
  <div id="mainconent">
    <transition name="fade-transform">
      <router-view :key="key"></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: "maincontent",
  computed: {
    key() {
      return this.$route.path;
    }
  }
};
</script>

<style lang="less" scoped>
#mainconent {
  position: relative;
  height: 100%;
}
</style>