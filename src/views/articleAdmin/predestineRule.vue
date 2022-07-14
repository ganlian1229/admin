<template>
    <div class="article-admin" id="articleAdmin">
        <h1 class="other">球场预定规则</h1>
        <div class="other">其他东西</div>
        <div class="scrollBox" id="scrollBox">
            <p class="box-item" v-for="(item, index) in dataList" :key="index">
                {{ index + 1 }}
            </p>
        </div>
        <div class="other">其他东西</div>
        <div class="other">其他东西</div>
        <div class="other">其他东西</div>
        <div class="other">其他东西</div>
        <div class="other">其他东西</div>
    </div>
</template>
<script setup>
import { onBeforeUnmount, onMounted } from 'vue';
//数据
let dataList = ref([]);
//scroll高度
let scrollBoxHeight = ref(0);
//scroll距离顶部的高度
let scrollBoxOffsetTop = ref(0);
//是否加载中
let isLoading = ref(false);
onMounted(() => {
    addData();
    window.addEventListener('scroll', scrollFun, false);
});
onBeforeUnmount(() => {
    window.removeEventListener('scroll', null, false);
});
/**
 * @Description: 添加数据
 * @return {*}
 */
function addData() {
    for (let i = 0; i < 10; i++) {
        dataList.value.push({});
    }
    isLoading.value = false;
    nextTick(() => {
        let scroolObj = document.getElementById('scrollBox');
        // console.log(scroolObj.offsetHeight);
        scrollBoxHeight.value = scroolObj.offsetHeight;
        scrollBoxOffsetTop.value = scroolObj.offsetTop;
        console.log(scrollBoxHeight);
        console.log(scrollBoxOffsetTop);
    });
}
/**
 * @Description: 滚动事件
 * @return {*}
 */
function scrollFun() {
    let scrollTop = 0;
    if (document.documentElement && document.documentElement.scrollTop) {
        scrollTop = document.documentElement.scrollTop;
    } else if (document.body) {
        scrollTop = document.body.scrollTop;
    }
    // console.log(this.scrollBoxHeight + this.scrollBoxOffsetTop - 50);
    // console.log(scrollTop);
    let elementClientHeight = document.documentElement.clientHeight;
    // console.log(elementClientHeight);
    // console.log(scrollTop + bodyClientHeight);
    if (
        !isLoading.value &&
        scrollBoxHeight.value + scrollBoxOffsetTop.value - 50 <= scrollTop + elementClientHeight
    ) {
        isLoading.value = true;
        //需要加载数据了
        console.log('11111');
        setTimeout(() => {
            addData();
        }, 1000);
    }
}
</script>
<style lang="scss">
.article-admin {
    background-color: transparent !important;
    .other {
        font-size: 20px;
        padding-bottom: 150px;
    }
    .scrollBox {
        .box-item {
            font-size: 24px;
            padding-bottom: 50px;
        }
    }
}
</style>
