<template>
    <el-container class="container-content">
        <topNavBar v-model="isActive"></topNavBar>
        <leftSidebar v-model="isActive"></leftSidebar>
        <el-container class="main-container" :class="isActive ? 'active' : ''">
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
<script setup>
import topNavBar from '@/components/container/topNavBar';
import leftSidebar from '@/components/container/leftSidebar';
//需要缓存的路由  值是组件的name
let keepAliveArr = ref(['advertising']);
//是否收起菜单 true 收起
let isActive = ref(false);
onMounted(() => {
    windowResize();
    window.addEventListener('resize', windowResize, false);
});
function windowResize() {
    let clientWidth = document.body.clientWidth;
    if (clientWidth <= 1450) {
        isActive.value = true;
    } else {
        isActive.value = false;
    }
}
</script>

<style lang="scss" scoped>
$bgimg: '~@/assets/image/';
.container-content {
    .main-container {
        margin-left: 210px;
        position: relative;
        min-height: 100%;
        transition: margin-left 0.28s;
        padding-top: 60px;
        min-width: 1200px;
        &.active {
            margin-left: 54px;
        }
        .body-content {
            padding: 20px;
            position: relative;
            min-height: calc(100vh - 60px);
            background: #f2f4f7;
        }
    }
}
</style>
