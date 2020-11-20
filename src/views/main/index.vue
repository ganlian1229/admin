<template>
  <div class="main-index">
    <p class="test">
      数字：<el-input
        type="number"
        size="small"
        placeholder="请输入金额"
        v-model="number"
      ></el-input>
    </p>
    <p>使用全局过滤器转化的大写金额：{{ number | smallToBig }}</p>
    <p>使用vuex储存的登录userId：{{ userInfo.userId }}</p>
    <el-button @click="filtersFun()">点我手动调用全局过滤器</el-button>
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
    };
  },
  mounted() {},
  methods: {
    filtersFun() {
      let text = this.$options.filters["smallToBig"]("150");
      console.log(text);
    },
  },
};
</script>
<style lang="less">
.main-index {
  .test {
    display: flex;
    .el-input {
      width: 150px;
      margin-left: 10px;
    }
  }
}
</style>
