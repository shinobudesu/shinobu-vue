<template>
  <div id="contain"></div>
</template>

<script>
export default {
  data() {
    return {};
  },
  created() {
    let _this = this;
  },
  mounted() {},
  computed: {},
  methods: {
    getTableData() {
      let _this = this;
      _this.$api.article
        .articleList({
          pagepre: (_this.currentpage - 1) * _this.page + 1,
          pagenext: (_this.currentpage - 1) * _this.page + _this.page,
          page: _this.page
        })
        .then(res => {
          _this.total = res.data[0][0].num;
          _this.tableData = res.data[1];
          _this.loading = false;
        })
        .catch(err => {
          _this.loading = false;
        });
    }
  }
};
</script>

<style lang="less" scoped>
#contain {
  position: relative;
  height: 100%;
}
</style>