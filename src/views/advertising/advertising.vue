<template>
  <div class="advertising">
    <div class="tab-box">
      <div
        class="tab-list"
        :class="tabIndex == index ? 'act' : ''"
        v-for="(item, index) in tabList"
        :key="index"
        @click="tabChangeFun(index)"
      >
        {{ item.text }}
      </div>
    </div>
    <div class="filter-box">
      <el-date-picker
        v-model="filterTime"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        value-format="yyyy-MM-dd"
        @change="filterFun"
        align="center"
        :picker-options="pickerOptions"
      >
      </el-date-picker>
    </div>

    <div class="content-scroll-box">
      <el-row v-if="dataList.length != 0">
        <el-col :span="1">
          <el-checkbox
            v-model="checkedAll"
            @change="checkedAllFun"
          ></el-checkbox>
        </el-col>
        <el-col title="序号" :span="1">序号</el-col>
        <el-col title="合同编号" :span="3">合同编号</el-col>
        <el-col title="单位名称" :span="4">单位名称</el-col>
        <el-col title="项目名称" :span="3">项目名称</el-col>
        <el-col title="订单属性" :span="4">订单属性</el-col>
        <el-col title="金额" :span="2">金额</el-col>
        <el-col title="负责人" :span="2">负责人</el-col>
        <el-col title="订单状态" :span="2">订单状态</el-col>
        <el-col title="操作" :span="4">操作</el-col>
      </el-row>
      <div class="content-list-box" v-if="dataList.length != 0">
        <el-row v-for="(item, index) in dataList" :key="index">
          <el-col :span="1">
            <el-checkbox
              v-model="item.checked"
              @change="checkedFun(item)"
            ></el-checkbox>
          </el-col>
          <el-col title="序号" :span="1">序号</el-col>
          <el-col title="合同编号" :span="3">合同编号</el-col>
          <el-col title="单位名称" :span="4">单位名称</el-col>
          <el-col title="项目名称" :span="3">项目名称</el-col>
          <el-col title="订单属性" :span="4">订单属性</el-col>
          <el-col title="金额" :span="2">金额</el-col>
          <el-col title="负责人" :span="2">负责人</el-col>
          <el-col title="订单状态" :span="2">订单状态</el-col>
          <el-col title="操作" :span="4">操作</el-col>
        </el-row>
      </div>
      <div class="none-data-box" v-else>暂无数据</div>
    </div>
    <div class="pagination-box" v-if="dataList.length != 0">
      <span class="active-num" v-show="operatingArr.length != 0">
        当前选中{{ operatingArr.length }}条
      </span>
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageNum + 1"
        :page-sizes="[20, 100, 500, 1000]"
        :page-size="20"
        layout="total,sizes, prev, pager, next, jumper"
        :total="totalCount"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  name: "test",
  data() {
    return {
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      }, //时间快捷选择
      tabList: [
        {
          id: 0,
          text: "切换1",
        },
        {
          id: 1,
          text: "切换2",
        },
      ], //tab列表
      tabIndex: 0, //tab选中的索引
      filterTime: "", //时间筛选
      checkedAll: false, //全选变量
      dataList: [], //数据列表
      operatingArr: [], //需要操作的数组
      pageNum: 0, //当前页
      pageSize: 20, //每页数据条数
      totalCount: 25, //数据总数
    };
  },
  //被缓存的组件生命周期（被缓存的组件显示时执行）
  activated() {
    this.getDataList();
    for (let i = 0; i < 30; i++) {
      this.dataList.push({
        checked: false,
        orderId: i,
      });
    }
  },
  mounted() {},
  methods: {
    //tab切换
    tabChangeFun(index) {
      this.tabIndex = index;
      this.pageNum = 0;
      this.getDataList();
    },
    //筛选方法
    filterFun() {
      this.pageNum = 0;
      this.getDataList();
    },
    //获取数据列表
    getDataList() {
      console.log(this.pageNum, this.pageSize);
      // console.log(this.filterTime ? this.filterTime[0] : "");
      // console.log(this.filterTime ? this.filterTime[1] : "");
    },
    //每页大小发生变化
    handleSizeChange(val) {
      this.pageSize = val;
      this.pageNum = 0;
      // console.log(this.pageSize);
      this.getDataList();
    },
    //页数切换
    handleCurrentChange(val) {
      this.pageNum = val - 1;
      // console.log(this.pageNum);
      this.getDataList();
    },
    //全选方法
    checkedAllFun() {
      this.operatingArr = this.$comment.checkedAllFun(
        this.checkedAll,
        this.dataList,
        this.operatingArr,
        "orderId"
      );
    },
    //单选方法
    checkedFun(item) {
      this.operatingArr = this.$comment.checkedFun(
        item,
        this.operatingArr,
        "orderId"
      );
    },
  },
};
</script>
<style lang="less">
.advertising {
  .content-scroll-box {
    height: calc(100vh - 360px);
  }
}
</style>
