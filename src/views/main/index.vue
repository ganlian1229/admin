<template>
  <div class="main-index">
    <p class="test">
      数字：<el-input
        v-numbers="3"
        size="small"
        placeholder="只能输入数字"
        v-model="number"
      ></el-input>
    </p>
    <p>使用全局过滤器转化的大写金额：{{ number | smallToBig }}</p>
    <p>使用保留两位小数（四舍五入）：{{ number | retainTow }}</p>
    <p>使用vuex储存的登录userId：{{ userInfo.userId }}</p>
    <el-button size="small" type="primary" @click="filtersFun()">
      点我手动调用全局过滤器
    </el-button>
    <div class="load-more-box" v-loadmore="moreFun">
      <p v-for="(item, index) in dataList" :key="index">{{ index }}</p>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["userInfo"]),
  },
  data() {
    return {
      number: "",
      dataList: [],
    };
  },
  mounted() {
    this.getDataList();
    console.log(this.isMixinData);
  },
  methods: {
    moreFun() {
      this.getDataList();
    },
    getDataList() {
      for (let i = 0; i < 20; i++) {
        this.dataList.push({
          index: i,
        });
      }
    },
    filtersFun() {
      let text = this.$options.filters["smallToBig"]("150");
      console.log(text);
    },
  },
};
</script>
<style lang="less">
.main-index {
  background-color: transparent !important;
  .load-more-box {
    width: 200px;
    height: 300px;
    overflow-y: auto;
  }
  .test {
    display: flex;
    align-items: center;
    .el-input {
      width: 150px;
      margin-left: 10px;
    }
  }
}
</style>
