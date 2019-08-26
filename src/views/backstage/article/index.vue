<template>
  <div id="contain">
    <div class="table-tools">
      <el-button type="primary" icon="el-icon-plus" class="tools-bt" id="add">新增</el-button>
      <el-button type="primary" icon="el-icon-search" class="tools-bt" id="search">搜索</el-button>
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
      >
        <el-table-column prop="a_id" label="序号" width="80" sortable></el-table-column>
        <el-table-column prop="a_title" label="文章标题"></el-table-column>
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
        <el-table-column label="创建时间">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.a_createdate }}</span>
          </template>
        </el-table-column>
        <el-table-column prop label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
export default {
  data() {
    return {
      search: "",
      tableData: [],
      tableHeight: 500,
      page: 10, //当前页总数
      currentpage: 1,
      total: 0,
      loading: true,
      tags: [{ text: "html", value: "html" }, { text: "css", value: "css" }]
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
    filterTag(value, row) {
      return row.a_type === value;
    },
    filterHandler(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    },
    handleCurrentChange(val) {
      this.currentpage = val;
      this.loading = true;
      this.getTableData();
    },
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
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
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