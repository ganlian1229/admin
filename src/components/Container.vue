<template>
  <el-container>
    <div class="sidebar-container">
      <el-scrollbar wrap-class="scrollbar-wrapper">
        <el-menu
          :default-active="$route.path"
          :collapse="isActive"
          :collapse-transition="false"
          :default-openeds="openedsArr"
          mode="vertical"
          background-color="#304156"
          text-color="rgb(191, 203, 217)"
          active-text-color="#1890ff"
        >
          <template v-for="(item, index) in menus" :index="index">
            <template v-if="item.meta.show && !item.meta.isOne">
              <el-submenu :index="item.name" :key="item.path" :select="index">
                <template slot="title">
                  <!-- <i class="el-icon-location"></i> -->
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
            <template v-else>
              <router-link
                :to="item.path + '/' + item.meta.onePath"
                :key="item.name"
              >
                <el-menu-item :index="item.path">
                  <!-- <i :class="item.meta.icon"></i> -->
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
        <div class="top-navbar">
          <el-button type="text" @click="logout">退出登录</el-button>
        </div>
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
    this.showMenu(routerArr);
  },
  mounted() {},
  methods: {
    logout() {
      this.$router.push({ path: "/login" });
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
.sidebar-container {
  width: 210px;
  background-color: #304156;
  height: 100%;
  position: fixed;
  font-size: 0;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 1001;
  overflow: hidden;
  transition: width 0.28s;
}
.hideSidebar .sidebar-container {
  width: 54px !important;
}
.main-container {
  margin-left: 210px;
  position: relative;
  min-height: 100%;
  transition: margin-left 0.28s;
}
.hideSidebar .main-container {
  margin-left: 54px;
}
.el-scrollbar {
  height: 100%;
}
.sidebar-container .scrollbar-wrapper {
  overflow-x: hidden;
}

.sidebar-container .el-menu {
  border: none;
  height: 100%;
  width: 100% !important;
}
.sidebar-container .el-submenu .el-menu-item,
.sidebar-container .nest-menu .el-submenu > .el-submenu__title {
  min-width: 210px !important;
  background-color: #1f2d3d !important;
}
.sidebar-container .el-menu .router-link-active .el-menu-item {
  color: #409eff !important;
  background-color: rgba(38, 52, 69) !important;
}
.sidebar-container .el-menu .el-submenu .el-menu-item-group__title {
  display: none;
}
.sidebar-container i {
  margin-right: 10px;
}
.top-navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 20px;
}
.body-content {
  padding: 20px;
  position: relative;
}
</style>
