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
            <p>使用pinia储存的登录userId：{{ userInfo.userId }}</p>
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
import storeObj from '@/pinia/index.js';
let number = ref('');
let { userInfo } = storeToRefs(storeObj.mainStore);
/**
 * @Description: 生命周期（dom加载完成）
 * @return {*}
 */
onMounted(() => {
    getDataList();
});
/**
 * @Description: 长按事件触发
 * @return {*}
 */
let longPressFun = () => {
    console.log('长按事件触发！');
};
/**
 * @Description: 盒子大小改变回调
 * @return {*}
 */
let boxResizeFun = () => {
    console.log('box-resize大小改变了！');
};

/**
 * @Description: 拖动回调
 * @param {*} event
 * @return {*}
 */
let dragFun = (event) => {
    console.log(event);
};
let dataList = ref([]);
/**
 * @Description: 获取数据
 * @return {*}
 */
let getDataList = () => {
    for (let i = 0; i < 20; i++) {
        dataList.value.push({
            index: i
        });
    }
};
/**
 * @Description: 更多数据
 * @return {*}
 */
let moreFun = () => {
    getDataList();
};
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
