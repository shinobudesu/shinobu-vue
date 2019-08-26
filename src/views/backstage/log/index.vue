<template>
  <div id="contain">
    <div class="table-tools">
      <el-button type="primary" icon="el-icon-search" id="search">搜索</el-button>
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
        <el-table-column prop="l_creatdate" label="操作日期" width="200"></el-table-column>
        <el-table-column prop="l_optusername" label="操作人" width="180"></el-table-column>
        <el-table-column prop="l_optcontent" label="操作内容"></el-table-column>
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
      loading: true
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
    handleCurrentChange(val) {
      this.currentpage = val;
      this.loading = true;
      this.getTableData();
    },
    getTableData() {
      let _this = this;
      _this.$api.log
        .logList({
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
  .table-tools {
    display: flex;
    flex-flow: row-reverse;
    margin-bottom: 30px;
    .search-input {
      width: 200px;
      margin-right: 20px;
    }
  }
  .table-body {
  }
}
</style>