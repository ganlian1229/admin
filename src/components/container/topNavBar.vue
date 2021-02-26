<template>
  <div class="top-navbar">
    <span></span>
    <el-button type="text" @click="logout()">退出登录</el-button>
  </div>
</template>
<script>
import { resetRouter } from "@/router/index.js";
export default {
  data() {
    return {};
  },
  methods: {
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
  height: 85px;
  // overflow: hidden;
  background: #fff;
  // box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  border-bottom: 1px solid #eeeeee;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 80px;
  padding-left: 50px;
  z-index: 1002;

  .navbar-left {
    width: 370px;
    height: 53px;
  }
  .navbar-right {
    display: flex;
    cursor: pointer;
    padding-right: 40px;
    position: relative;
    &::after {
      content: "";
      position: absolute;
      width: 0;
      height: 0;
      border-right: 10px solid transparent;
      border-left: 10px solid transparent;
      border-top: 10px solid #8e8e8e;
      top: 50%;
      right: 0;
      transform: translateY(-50%);
    }
    .user-tx {
      width: 35px;
      height: 35px;
      border-radius: 50%;
      overflow: hidden;
      margin-right: 20px;
      img {
        display: block;
        width: 100%;
      }
    }
    .user-name {
      font-size: 22px;
      color: #8e8e8e;
    }
    .user-fun {
      position: absolute;
      top: 100%;
      width: 100%;
      left: 0;
      top: 120%;
      max-height: 0;
      overflow: hidden;
      transition: all 0.5s;
      background: #fff;
      border-radius: 10px;

      .fun-item {
        padding: 3px 0;
        font-size: 22px;
        color: #8e8e8e;
        text-align: center;
        margin-top: 10px;
        &:nth-child(1) {
          margin-top: 0;
        }
        &:hover {
          background: #f8f9fb;
        }
      }
    }
    &.act {
      .user-fun {
        padding: 15px 0;
        max-height: 300px;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
      }
    }
  }
}
</style>