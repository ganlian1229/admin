<template>
  <div class="test-com">
    <el-input v-test v-model="testValue"></el-input>
  </div>
</template>
<script>
export default {
  data() {
    return {
      testValue: "",
    };
  },
};
</script>
<style lang="less" scoped></style>
