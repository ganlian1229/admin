<template>
  <div class="advertising">
    <div class="filter-box">
      <div class="filter-item">
        <el-date-picker
          size="small"
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
    </div>
    <div class="filter-box filter-box2">
      <div class="filter-item">
        <el-date-picker
          size="small"
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
    </div>
    <div class="content-scroll-box">
      <el-row v-if="dataList.length != 0">
        <el-col :span="2"> </el-col>
        <el-col title="序号" :span="1">序号</el-col>
        <el-col title="标题" :span="4">标题</el-col>
        <el-col :span="1"></el-col>
        <el-col title="公司地址" :span="3">公司地址</el-col>
        <el-col title="用户账号" :span="3">用户账号</el-col>
        <el-col title="申请时间" :span="3">申请时间</el-col>
        <el-col title="状态" :span="2">状态</el-col>
        <el-col title="操作" :span="5">操作</el-col>
      </el-row>
      <div class="content-list-box" v-if="dataList.length != 0">
        <div
          class="list-item-box"
          v-for="(item, index) in dataList"
          :key="index"
        >
          <el-row :class="item.checked ? 'act' : ''">
            <el-col :span="2" @click.native="dataListClick(item)">
              <i class="el-icon-arrow-right"></i>
            </el-col>
            <el-col title="序号" :span="1">序号</el-col>
            <el-col title="标题" :span="4">标题</el-col>
            <el-col :span="1"></el-col>
            <el-col title="公司地址" :span="3">公司地址</el-col>
            <el-col title="用户账号" :span="3">用户账号</el-col>
            <el-col title="申请时间" :span="3">申请时间</el-col>
            <el-col title="状态" :span="2">状态</el-col>
            <el-col title="操作" :span="5">操作</el-col>
          </el-row>
          <div class="item-hide-box" :class="item.checked ? 'act' : ''">
            <h6 class="hide-tit">更多信息</h6>
            <div class="hide-item">
              <span class="hide-text">联系人：</span>
              <span class="content-text"> 大大大 </span>
            </div>
            <div class="hide-item">
              <span class="hide-text">联系电话：</span>
              <span class="content-text"> 123123123 </span>
            </div>
            <div class="hide-item">
              <span class="hide-text">标题：</span>
              <span class="content-text">啊实打实多</span>
            </div>
            <div class="hide-item">
              <span class="hide-text">详细地址：</span>
              <span class="content-text">阿是大师大师的</span>
            </div>
            <div class="hide-item">
              <span class="hide-text">服务区域：</span>
              <span class="content-text">啊实打实多</span>
            </div>
            <div class="hide-item">
              <span class="hide-text">详细说明：</span>
              <span class="content-text">
                啊实打啊实打实多啊实打实多啊实打实多啊实打实多啊实打实多啊实打实多啊实打实多啊实打实多啊实打实多啊实打实多啊实打实多啊实打实多啊实打实多啊实打实多啊实打实多啊实打实多实多
              </span>
            </div>
            <div class="hide-item">
              <span class="hide-text">营业执照：</span>
              <span class="content-text"> </span>
              <span class="btn"> 查看 </span>
            </div>
            <div class="hide-item">
              <span class="hide-text">服务图片：</span>
              <span class="content-text"> </span>
              <span class="btn"> 查看 </span>
            </div>
          </div>
        </div>
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
  activated() {},
  created() {
    for (let i = 0; i < 30; i++) {
      this.dataList.push({
        checked: false,
        orderId: i,
      });
    }
    this.getDataList();
  },
  mounted() {},
  methods: {
    dataListClick(item) {
      item.checked = !item.checked;
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
}
</style>
