<template>
    <div class="test-com">
        <el-input v-test v-model="testValue"></el-input>
        <!-- testValue -->
        <el-button @click="changeUserInfo">changeUserInfo</el-button>
    </div>
</template>
<script setup>
import store from '@/store';
let testValue = ref('123');
let changeUserInfo = () => {
    let obj = {
        userId: 2
    };
    store.commit('setUserInfo', obj);
};
</script>

<style lang="scss" scoped></style>
