<template>
  <div class="top-navbar" :class="value ? 'act' : ''">
    <div class="navbar-left">
      <div class="hamburger-box" @click="switchActFun">
        <span
          class="icon"
          :class="value ? 'el-icon-s-unfold' : 'el-icon-s-fold'"
        ></span>
      </div>
    </div>
    <div class="navbar-right">
      <el-button type="text" @click="logout()">退出登录</el-button>
    </div>
  </div>
</template>
<script>
import { resetRouter } from "@/router/index.js";
export default {
  props: {
    //是否收起菜单 true 收起
    value: {
      type: Boolean,
      default: () => false,
    },
  },
  model: {
    value: "",
    event: "valueCahnge",
  },
  data() {
    return {};
  },
  methods: {
    //切换左侧收起/展开
    switchActFun() {
      // console.log(this.value);
      this.$emit("valueCahnge", !this.value);
    },
    logout() {
      this.$confirm("是否确认退出登录?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true,
      })
        .then(() => {
          this.$router.push({ name: "login" });
          sessionStorage.clear();
          resetRouter();
        })
        .catch(() => {
          console.log("取消退出！");
        });
    },
  },
};
</script>
<style lang="less" scoped>
.top-navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  background: #fff;
  // box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  border-bottom: 1px solid #eeeeee;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 80px;
  padding-left: 210px;
  z-index: 1002;
  transition: all 0.28s;
  &.act {
    padding-left: 54px;
  }
  .navbar-left {
    height: 100%;
    line-height: 60px;
    // width: 370px;
    .hamburger-box {
      height: 100%;
      padding: 0 10px;
      cursor: pointer;
      .icon {
        font-size: 24px;
      }
    }
  }
  .navbar-right {
    display: flex;
    cursor: pointer;
    padding-right: 40px;
    position: relative;
  }
}
</style>
