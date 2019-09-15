<template>
  <div id="contain">
    <div class="markdown-tools">
      <i class="el-icon-back" @click="backPrePage()"></i>
      <el-button
        type="primary"
        icon="el-icon-finished"
        class="tools-bt"
        @click="saveArticle"
        id="save"
      >保存</el-button>
      <el-button
        type="primary"
        icon="el-icon-refresh-left"
        class="tools-bt"
        id="reset"
        @click="resetArticle"
      >重置</el-button>
      <el-select class="tools-bt" v-model="type" placeholder="请选择文章类型">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-input class="tools-bt tools-title" v-model="title" placeholder="请输入文章标题">
        <template slot="prepend">文章标题:</template>
      </el-input>
    </div>
    <mavon-editor id="markDown" v-model="markValue" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      markValue: "", //文章内容
      markValueOld: "", //重置备用,
      id: "", //文章ID
      title: "", //文章标题
      type: "", //文章类型
      author: "", //文章创建人
      options: [
        {
          value: "css",
          label: "css"
        },
        {
          value: "js",
          label: "js"
        },
        {
          value: "html",
          label: "html"
        },
        {
          value: "vue",
          label: "vue"
        },
        {
          value: "react",
          label: "react"
        }
      ] //暂定(之后数据库加入类型编码)
    };
  },
  created() {
    if (this.$route.params.id != "ins") {
      this.id = this.$route.params.id;
    }
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
            _this.markValueOld = _this.markValue;
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
    },
    //刷新markdown编辑器中的内容
    resetArticle() {
      this.markValue = this.markValueOld;
    },
    //返回上一页
    backPrePage() {
      this.$router.push("/backstage/article");
    },
    //根据路由ID判断是修改还是新增
    //保存markdown编辑器中的内容
    saveArticle() {
      let _this = this;
      let params = {};
      if (_this.id) {
        params = {
          a_content: _this.markValue,
          a_id: _this.id,
          a_title: _this.title,
          a_type: _this.type
        };
        _this.edtArticle(params);
      } else {
        params = {
          a_content: _this.markValue,
          a_title: _this.title,
          a_type: _this.type,
          a_createuid: _this.$cookie.get("u_id"),
          a_createusername: _this.$cookie.get("u_username")
        };
        _this.insArticle(params);
      }
    },
    //新增文章
    insArticle(params) {
      let _this = this;
      _this.$api.article
        .articleIns(params)
        .then(res => {
          _this.loading = false;
          if (res.data[0].status == "OK") {
            _this.$message({
              type: "success",
              message: "新增成功!"
            });
            _this.backPrePage();
          } else {
            _this.$message({
              type: "info",
              message: "新增失败!"
            });
          }
        })
        .catch(err => {
          _this.loading = false;
          _this.$message({
            type: "info",
            message: "数据异常!"
          });
        });
    },
    //编辑指定文章
    edtArticle(params) {
      let _this = this;
      _this.$api.article
        .articleEdt(params)
        .then(res => {
          _this.loading = false;
          if (res.data[0].status == "OK") {
            _this.$message({
              type: "success",
              message: "修改成功!"
            });
            _this.backPrePage();
          } else {
            _this.$message({
              type: "info",
              message: "修改失败!"
            });
          }
        })
        .catch(err => {
          _this.loading = false;
          _this.$message({
            type: "info",
            message: "数据异常!"
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
  .markdown-tools {
    position: relative;
    display: flex;
    flex-flow: row-reverse;
    margin-bottom: 30px;
    .el-icon-back {
      position: absolute;
      left: 0px;
      font-size: 30px;
      line-height: 40px;
      cursor: pointer;
      color: 333;
      &:hover {
        color: #409eff;
      }
    }
  }
  .tools-bt {
    margin: 0 10px;
    max-width: 150px;
  }
  .tools-title {
    max-width: 400px;
  }
  #markDown {
    position: relative;
    height: calc(100% - 70px);
  }
}
</style>