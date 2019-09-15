<template>
  <div id="contain">
    <mavon-editor v-model="markValue" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      markValue: "", //文章内容
      id: "", //文章ID
      title: "", //文章标题
      type: "", //文章类型
      author: "" //文章创建人
    };
  },
  created() {
    this.id = this.$route.params.id;
    if (this.id) {
      this.initData();
    }
  },
  mounted() {},
  computed: {},
  methods: {
    //如果存在ID 则初始化数据
    initData() {
      let _this = this;
      _this.loading = true;
      _this.$api.article
        .articleListByid({
          a_id: _this.id
        })
        .then(res => {
          if (res.data[1].length > 0) {
            _this.title = res.data[1][0].a_title;
            _this.type = res.data[1][0].a_type;
            _this.author = res.data[1][0].a_createusername;
            _this.markValue = res.data[1][0].a_content;
          } else {
            _this.$message({
              type: "info",
              message: "查询数据为空!"
            });
          }
          _this.loading = false;
        })
        .catch(err => {
          _this.loading = false;
          _this.$message({
            type: "info",
            message: "查询数据异常!"
          });
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