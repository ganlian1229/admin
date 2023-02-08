<template>
    <div class="sidebar-container" :class="value ? 'hideSidebar' : ''">
        <div class="logo-box">logo</div>
        <el-scrollbar wrap-class="scrollbar-wrapper">
            <el-menu
                :default-active="$route.path"
                :collapse="value"
                :collapse-transition="false"
                :default-openeds="openedsArr"
                mode="vertical"
                background-color="#212740"
                text-color="#555e86"
                active-text-color="#555e86"
            >
                <template v-for="(item, index) in menuList" :index="index">
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
                        <router-link :to="item.path + '/' + item.children[0].path" :key="item.name">
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
<script setup>
import dynamicRouter from '@/router/dynamicRouter';
import { deepCopy } from '@/common/common.js';
let props = defineProps({
    //是否收起菜单 true 收起
    value: {
        type: Boolean,
        default: () => false
    }
});
let emit = defineEmits(['value:update']);
//左侧导航列表
let menuList = ref([]);
//需要展开的path
let openedsArr = ref([]);
onMounted(() => {
    showMenu(deepCopy(dynamicRouter));
});
//显示左侧导航
function showMenu(arr) {
    let menus = [];
    arr.forEach((val) => {
        if (val.meta) {
            if (val.meta.show) {
                if (val.children.length) {
                    var child = [];
                    val.children.forEach((cval) => {
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
    menuList.value = menus;
    console.log('menuList', menuList.value);
}
</script>
<style lang="scss" scoped>
.sidebar-container {
    width: 210px;
    background-color: #212740;
    height: 100vh;
    position: fixed;
    font-size: 0;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 1005;
    overflow: hidden;
    transition: width 0.28s;
    // padding-top: 85px;
    &.hideSidebar {
        width: 54px !important;
    }
    .logo-box {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 60px;
        width: 100%;
    }

    :deep(.el-scrollbar) {
        height: 100%;
        .scrollbar-wrapper {
            overflow-x: hidden;
        }
    }
    :deep(.el-menu) {
        border: none;
        height: 100%;
        width: 100% !important;
        &.el-menu--collapse {
            .el-menu-item {
                & > div {
                    padding: 0 15px !important;
                }
            }
            .el-submenu__title {
                padding: 0 15px !important;
            }
        }
    }
    :deep(.el-submenu .el-menu-item),
    .nest-menu .el-submenu > .el-submenu__title {
        min-width: 210px !important;
        background-color: #212740 !important;
        // padding-left: 56px !important;
    }
    :deep(.el-submenu__title) {
        font-size: 16px;
    }
    :deep(.el-menu-item) {
        font-size: 16px;
    }
    :deep(.el-menu .el-submenu .el-menu-item-group__title) {
        display: none;
    }
    .nav-icon {
        font-size: 24px;
        color: #555e86;
        margin-right: 5px;
    }
    .router-link-exact-active .el-menu-item {
        color: #fff !important;
        background-color: #7184f7 !important;
        .nav-icon {
            color: #fff !important;
        }
    }

    .router-link-exact-active,
    .is-active {
        .el-submenu__title {
            color: #fff !important;
            // font-weight: bold;
        }
    }
}
</style>
