<template>
  <el-container class="container-content">
    <topNavBar></topNavBar>
    <leftSidebar></leftSidebar>
    <el-container class="main-container">
      <div style="width: 100%">
        <div class="body-content">
          <keep-alive :include="keepAliveArr">
            <router-view></router-view>
          </keep-alive>
        </div>
      </div>
    </el-container>
  </el-container>
</template>
<script>
import topNavBar from "@/components/container/topNavBar";
import leftSidebar from "@/components/container/leftSidebar";
export default {
  components: {
    topNavBar,
    leftSidebar,
  },
  data() {
    return {
      keepAliveArr: ["advertisingCon"], //需要缓存的路由  值是组件的name
    };
  },
  created() {},
  mounted() {},
  methods: {},
};
</script>

<style lang="less">
@bgimg: "~@/assets/image/";
.container-content {
  .main-container {
    margin-left: 210px;
    position: relative;
    min-height: 100%;
    transition: margin-left 0.28s;
    padding-top: 85px;
    min-width: 1200px;
    .body-content {
      padding: 20px;
      position: relative;
      min-height: calc(100vh - 85px);
      background: #f2f4f7;
    }
  }
}
</style>
