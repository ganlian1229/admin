<template>
    <div class="main-index">
        <div class="left">
            <p class="test">
                数字：<el-input
                    v-numbers="3"
                    placeholder="只能输入数字"
                    v-model="number"
                ></el-input>
            </p>
            <p v-copy="'使用全局过滤器转化的大写金额：' + $options.filters['smallToBig'](number)">
                使用全局过滤器转化的大写金额：
                <span>
                    {{ number | smallToBig }}
                </span>
            </p>
            <p>使用保留两位小数（四舍五入）：{{ number | retainTow }}</p>
            <p>使用vuex储存的登录userId：{{ userInfo.userId }}</p>
            <div class="load-more-box" v-loadmore="moreFun">
                <p v-for="(item, index) in dataList" :key="index">{{ index }}</p>
            </div>
            <div class="box">
                <h1 v-drag.parent="dragFun">1111</h1>
            </div>
            <div class="box-resize" v-resize="boxResizeFun"></div>
            <el-button v-longpress.3="longPressFun">长按2秒</el-button>
            <testCom></testCom>
        </div>
        <div class="right">
            <p></p>
            <globalCom></globalCom>
            <testGlobalCom></testGlobalCom>
        </div>
    </div>
</template>
<script setup>
import testCom from '@/views/main/components/testCom';
import store from '@/store';
let number = ref('');
let dataList = ref([]);

onMounted(() => {
    getDataList();
});
let longPressFun = () => {
    console.log('长按事件触发！');
};
let boxResizeFun = () => {
    console.log('box-resize大小改变了！');
};
let moreFun = () => {
    getDataList();
};
let dragFun = (event) => {
    console.log(event);
};
let getDataList = () => {
    for (let i = 0; i < 20; i++) {
        dataList.value.push({
            index: i
        });
    }
};
let userInfo = computed(() => store.state.userInfo);
</script>
<style lang="scss">
.main-index {
    background-color: transparent !important;
    display: flex;
    .right {
        margin-left: 50px;
    }
    .box {
        left: 330px;
        top: 100px;
        width: 50px;
        height: 50px;
        background-color: red;
    }
    .load-more-box {
        width: 200px;
        height: 300px;
        overflow-y: auto;
    }
    .test {
        display: flex;
        align-items: center;
    }
    .el-input {
        width: 150px;
        margin-left: 10px;
    }
}
</style>
