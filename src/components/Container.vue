<template>
  <el-container class="container-content">
    <div class="top-navbar">
      <span></span>
      <el-button type="text" @click="logout">退出登录</el-button>
    </div>
    <div class="sidebar-container">
      <el-scrollbar wrap-class="scrollbar-wrapper">
        <el-menu
          :default-active="$route.path"
          :collapse="isActive"
          :collapse-transition="false"
          :default-openeds="openedsArr"
          mode="vertical"
          background-color="#fff"
          text-color="#bbbbbb"
          active-text-color="#333333"
        >
          <template v-for="(item, index) in menus" :index="index">
            <!-- 多个子集 -->
            <template v-if="item.meta.show && !item.meta.isOne">
              <el-submenu :index="item.name" :key="item.path" :select="index">
                <template slot="title">
                  <i class="nav-icon" :class="item.meta.icon"></i>
                  <span>{{ item.meta.title }}</span>
                </template>
                <el-menu-item-group>
                  <router-link
                    :to="item.path + '/' + list.path"
                    v-for="(list, index) in item.children"
                    :key="index"
                  >
                    <el-menu-item :index="item.path + '/' + list.path">
                      {{ list.meta.title }}
                    </el-menu-item>
                  </router-link>
                </el-menu-item-group>
              </el-submenu>
            </template>
            <!-- 一个子集 -->
            <template v-else>
              <router-link
                :to="item.path + '/' + item.meta.onePath"
                :key="item.name"
              >
                <el-menu-item :index="item.path">
                  <i class="nav-icon" :class="item.meta.icon"></i>
                  <span slot="title">{{ item.meta.title }}</span>
                </el-menu-item>
              </router-link>
            </template>
          </template>
        </el-menu>
      </el-scrollbar>
    </div>
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
import routerArr from "@/router/routes";
import { resetRouter } from "@/router/index.js";
export default {
  data() {
    return {
      menus: [], //左侧导航列表
      openedsArr: [], //需要展开的path
      isActive: false, //是否收起菜单 true 收起
      keepAliveArr: ["advertisingCon"], //需要缓存的路由  值是组件的name
    };
  },
  created() {
    this.showMenu(this.$comment.deepCopy(routerArr));
  },
  mounted() {},
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
    //显示左侧导航
    showMenu(arr) {
      var menus = [];
      arr.map((val) => {
        if (val.meta) {
          if (val.meta.show) {
            if (val.children.length) {
              var child = [];
              val.children.map((cval) => {
                if (cval.meta.show) {
                  child.push(cval);
                }
              });
              val.children = child;
              menus.push(val);
            } else {
              menus.push(val);
            }
          }
        }
      });
      this.menus = menus;
      // console.log(this.menus);
    },
  },
};
</script>

<style lang="less">
.container-content {
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
  .sidebar-container {
    width: 210px;
    background-color: #fff;
    height: 100vh;
    position: fixed;
    font-size: 0;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 1001;
    overflow: hidden;
    transition: width 0.28s;
    padding-top: 85px;
    &.hideSidebar {
      width: 54px !important;
    }
    .el-scrollbar {
      height: 100%;
      .scrollbar-wrapper {
        overflow-x: hidden;
      }
    }
    .el-menu {
      border: none;
      height: 100%;
      width: 100% !important;
    }
    .el-submenu .el-menu-item,
    .nest-menu .el-submenu > .el-submenu__title {
      min-width: 210px !important;
      background-color: #fff !important;
      padding-left: 56px !important;
    }
    .el-submenu__title {
      font-size: 18px;
    }
    .el-menu-item {
      font-size: 18px;
    }
    .router-link-exact-active .el-menu-item {
      color: rgb(51, 51, 51) !important;
    }
    .el-menu .el-submenu .el-menu-item-group__title {
      display: none;
    }
    .router-link-exact-active,
    .is-active {
      .el-submenu__title {
        color: #333333 !important;
        // font-weight: bold;
      }
    }
  }

  .main-container {
    margin-left: 210px;
    position: relative;
    min-height: 100%;
    transition: margin-left 0.28s;
    padding-top: 85px;
    width: calc(100vw - 210px);
    min-width: 1200px;
    &.hideSidebar {
      margin-left: 54px;
      width: calc(100vw - 54px);
    }

    .breadcrumb-box {
      border-left: 1px solid #eeeeee;
      width: 100%;
      padding: 15px 30px;
      .el-breadcrumb__item {
        .el-breadcrumb__inner {
          color: #8e8e8e;
          &.is-link {
            font-weight: unset;
          }
        }
      }
    }
    .body-content {
      padding: 20px;
      position: relative;
      min-height: calc(100vh - 105px);
      background: #f2f4f7;

      & > div {
        background-color: #ffffff;
        border-radius: 10px;
        padding-bottom: 20px;
        min-height: 100%;
      }
    }
  }
}
</style>
