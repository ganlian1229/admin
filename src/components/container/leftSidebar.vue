<template>
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
</template>
<script>
import routerArr from "@/router/routes";
export default {
  data() {
    return {
      menus: [], //左侧导航列表
      openedsArr: [], //需要展开的path
      isActive: false, //是否收起菜单 true 收起
    };
  },
  created() {
    this.showMenu(this.$common.deepCopy(routerArr));
  },
  methods: {
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
<style lang="less" scoped>
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
  /deep/ .el-scrollbar {
    height: 100%;
    .scrollbar-wrapper {
      overflow-x: hidden;
    }
  }
  /deep/ .el-menu {
    border: none;
    height: 100%;
    width: 100% !important;
  }
  /deep/.el-submenu .el-menu-item,
  .nest-menu .el-submenu > .el-submenu__title {
    min-width: 210px !important;
    background-color: #fff !important;
    padding-left: 56px !important;
  }
  /deep/ .el-submenu__title {
    font-size: 18px;
  }
  /deep/ .el-menu-item {
    font-size: 18px;
  }
  .router-link-exact-active .el-menu-item {
    color: rgb(51, 51, 51) !important;
  }
  /deep/ .el-menu .el-submenu .el-menu-item-group__title {
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
</style>