<template>
    <div class="test-com">
        <el-input v-test v-model="testValue"></el-input>
        <!-- testValue -->
        <el-button @click="changeUserInfo">changeUserInfo</el-button>
    </div>
</template>
<script setup>
import storeObj from '@/store/index.js';
const mainStore = storeObj.mainStore;
let testValue = ref('123');
let changeUserInfo = () => {
    let obj = {
        userId: 2
    };
    mainStore.setUserInfo(obj);
};
</script>

<style lang="scss" scoped></style>
