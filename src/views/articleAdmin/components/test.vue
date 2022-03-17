<template>
  <div class="test">test</div>
</template>
<script>
export default {
  data() {
    return {};
  },
  beforeCreate() {
    console.log("test beforeCreate");
  },
  created() {
    console.log("test created");
  },
  beforeMount() {
    console.log("test beforeMount");
  },
  mounted() {
    console.log("test mounted");
  },
};
</script>
<style lang="scss" scoped>
</style>