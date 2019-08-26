<template>
  <div id="contain">
    <!-- 数据汇总模块 -->
    <el-row :gutter="40">
      <el-col :span="6" v-for="item in dataArry" :key="item.num">
        <div class="grid-content static-item">
          <i class="el-icon-user-solid"></i>
          <span>{{item.num}}</span>
          <p>{{item.title}}</p>
        </div>
      </el-col>
    </el-row>
    <!-- echart图 -->
    <div class="echart-wrapper">
      <div id="echart"></div>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  data() {
    return {
      dataArry: [
        {
          num: 1,
          title: "WOSHIDIYI"
        },
        {
          num: 2,
          title: "WOSHIDIYI"
        },
        {
          num: 3,
          title: "WOSHIDIYI"
        },
        {
          num: 4,
          title: "WOSHIDIYI"
        }
      ],
      echart: null,
      screenWidth: document.documentElement.clientWidth // 这里是给到了一个默认值 （这个很重要）
    };
  },
  created() {},
  mounted() {
    let _this = this;

    _this.initEchart();
    window.onresize = () => {
      // 定义窗口大小变更通知事件
      _this.screenWidth = document.documentElement.clientWidth; //窗口宽度
    };
  },
  methods: {
    initEchart() {
      this.echart = echarts.init(document.getElementById("echart"));
      this.echart.setOption({
        title: {
          text: "折线图堆叠"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["邮件营销", "联盟广告", "视频广告", "直接访问", "搜索引擎"]
        },
        grid: {
          left: "5%",
          right: "5%",
          bottom: "5%",
          top: "10%",
          containLabel: true
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "邮件营销",
            type: "line",
            stack: "总量",
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: "联盟广告",
            type: "line",
            stack: "总量",
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: "视频广告",
            type: "line",
            stack: "总量",
            data: [150, 232, 201, 154, 190, 330, 410]
          },
          {
            name: "直接访问",
            type: "line",
            stack: "总量",
            data: [320, 332, 301, 334, 390, 330, 320]
          },
          {
            name: "搜索引擎",
            type: "line",
            stack: "总量",
            data: [820, 932, 901, 934, 1290, 1330, 1320]
          }
        ]
      });
    }
  },
  watch: {
    screenWidth(val) {
      this.echart.dispose();
      this.initEchart();
    }
  },
  destroyed() {}
};
</script>

<style lang="less" scoped>
#contain {
  position: relative;
  height: 100%;
  .static-item {
    background: #fff;
    box-shadow: 0 0 5px #ccc;
    height: 150px;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    i {
      font-size: 30px;
    }
  }
  .echart-wrapper {
    margin-top: 50px;
    width: 100%;
    height: calc(100% - 200px);
    border-radius: 5px;
    box-shadow: 0 0 5px #ccc;
    padding: 20px;
    box-sizing: border-box;
    #echart {
      position: relative;
      width: 100%;
      height: 100%;
    }
  }
}
</style>