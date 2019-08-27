<template>
  <div id="contain">
    <div class="table-tools">
      <el-button type="primary" icon="el-icon-plus" class="tools-bt" id="add">新增</el-button>
      <el-button
        type="primary"
        icon="el-icon-search"
        class="tools-bt"
        id="search"
        @click="searchArticle"
      >搜索</el-button>
      <el-input v-model="search" placeholder="请输入内容" class="search-input"></el-input>
    </div>
    <div class="table-body">
      <el-table
        :data="tableData"
        :height="tableHeight"
        border
        style="width: 100%"
        ref="table"
        v-loading="loading"
        @row-click="rowClick"
      >
        <el-table-column label="创建时间">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.a_createdate }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="a_title" label="文章标题">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top-start">
              <el-form :inline="true">
                <el-form-item label="文章标题">
                  <el-input v-model="articletitle" placeholder="文章标题"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="handleEditBytitle(scope.row,scope.$index)">确认修改</el-button>
                </el-form-item>
              </el-form>

              <div slot="reference">
                <span title="title">{{scope.row.a_title}}</span>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          label="文章类型"
          prop="a_type"
          :filter-method="filterTag"
          filter-placement="bottom-end"
          :filters="tags"
        >
          >
          <template slot-scope="scope">
            <el-tag>{{scope.row.a_type}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="a_createusername" label="创建人"></el-table-column>

        <el-table-column prop label="操作">
          <template>
            <el-button size="mini" title="edt">编辑</el-button>
            <el-button size="mini" title="del" type="danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        v-show="total>0"
        @current-change="handleCurrentChange"
        layout="total,prev, pager, next"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { timeFormat } from "@/utils/tools.js";
export default {
  data() {
    return {
      search: "",
      tableData: [],
      tableHeight: 540,
      page: 10, //当前页总数
      currentpage: 1,
      total: 0,
      loading: true,
      tags: [{ text: "html", value: "html" }, { text: "css", value: "css" }],
      articletitle: ""
    };
  },
  created() {
    let _this = this;
    this.getTableData();
  },
  mounted() {
    setTimeout(() => {
      this.tableHeight =
        window.innerHeight - this.$refs.table.$el.offsetTop - 160;
    }, 100); //此处需要通过延迟方法来设置值，不然会出现值已更新，但页面没更新的问题
    //this.$refs.table.$el.offsetTop：表格距离浏览器的高度
  },
  computed: {},
  methods: {
    //处理标签
    filterTag(value, row) {
      return row.a_type === value;
    },
    //处理过滤
    filterHandler(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    },
    //页数变化监听
    handleCurrentChange(val) {
      this.currentpage = val;
      this.loading = true;
      this.search ? this.searchArticle() : this.getTableData();
    },
    //按照标题查询文章列表
    searchArticle() {
      let _this = this;
      _this.loading = true;
      _this.$api.article
        .articleListBytitle({
          pagepre: (_this.currentpage - 1) * _this.page + 1,
          pagenext: (_this.currentpage - 1) * _this.page + _this.page,
          page: _this.page,
          title: "%" + _this.search.trim() + "%"
        })
        .then(res => {
          _this.total = res.data[0][0].num;
          _this.tableData = res.data[1];
          _this.loading = false;
        })
        .catch(err => {
          _this.loading = false;
          _this.$message({
            type: "info",
            message: "数据异常!"
          });
        });
    },
    //查询文章列表
    getTableData() {
      let _this = this;
      _this.loading = true;
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
          _this.$message({
            type: "info",
            message: "数据异常!"
          });
        });
    },
    //删除指定文章
    delArticle(a_id, index) {
      let _this = this;
      _this.loading = true;
      _this.$api.article
        .articleDel({
          a_id: a_id
        })
        .then(res => {
          _this.loading = false;
          if (res.data[0].status == "OK") {
            _this.tableData.splice(index, 1);
            _this.total--;
            _this.$message({
              type: "success",
              message: "删除成功!"
            });
          } else {
            _this.$message({
              type: "info",
              message: "删除失败!"
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
    edtArticle(a_id, index, params) {
      let _this = this;
      _this.loading = true;
      _this.$api.article
        .articleEdt(params)
        .then(res => {
          _this.loading = false;
          if (res.data[0].status == "OK") {
            _this.getTableData();
            _this.$message({
              type: "success",
              message: "修改成功!"
            });
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
    },
    //处理编辑内容
    handleEdit(row, index) {},
    //处理编辑标题
    handleEditBytitle(row, index) {
      this.edtArticle(row.a_id, index, {
        a_title: this.articletitle,
        a_id: row.a_id
      });
      this.articletitle = "";
    },
    //处理删除
    handleDelete(row, index) {
      console.log(row, index);
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.delArticle(row.a_id, index);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    rowClick(row, index, event) {
      if (event.target.title == "edt" || event.target.innerText == "编辑") {
        this.handleEdit(row, index);
      } else if (
        event.target.title == "del" ||
        event.target.innerText == "删除"
      ) {
        this.handleDelete(row, index);
      }
    }
  }
};
</script>

<style lang="less" scoped>
#contain {
  position: relative;
  height: 100%;
  .table-tools {
    display: flex;
    flex-flow: row-reverse;
    margin-bottom: 30px;
    .search-input {
      width: 200px;
      margin-right: 20px;
    }
    .tools-bt {
      margin: 0 10px;
    }
  }
  .table-body {
  }
}
</style>