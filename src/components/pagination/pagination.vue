<template>
  <div>
    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageNum"
      :page-sizes="pageSizeList"
      :page-size="pageSize"
      layout="total,sizes, prev, pager, next, jumper"
      :total="totalCount"
    ></el-pagination>
  </div>
</template>
<script>
export default {
  props: {
    getDataList: {
      type: Function,
      default: () => {},
    },
    //当前页
    pageNum: {
      type: Number || String,
      default: () => 1,
    },
    //每页数据条数
    pageSize: {
      type: Number || String,
      default: () => 20,
    },
    //数据总数
    totalCount: {
      type: Number || String,
      default: () => 25,
    },
    pageSizeList: {
      type: Array,
      default: () => [20, 100, 500, 1000],
    },
  },
  methods: {
    //每页大小发生变化
    handleSizeChange(val) {
      this.$emit("update:pageNum", 1);
      this.$emit("update:pageSize", val);
      this.getDataList();
    },
    //页数切换
    handleCurrentChange(val) {
      this.$emit("update:pageNum", val);
      this.getDataList();
    },
  },
};
</script>
<style lang="less" scoped></style>
