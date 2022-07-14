<template>
    <div class="article-admin">
        <p class="list-item">
            <span class="text">姓名：</span>
            <el-input v-model="formData.userName"></el-input>
        </p>
        <p class="list-item">
            <span class="text">密码：</span>
            <el-input v-model="formData.password" show-password></el-input>
        </p>
        <p class="list-item">
            <span class="text">手机号：</span>
            <el-input v-model="formData.phoneNumber"></el-input>
        </p>
        <p class="list-item">
            <span class="text">数字：</span>
            <el-input v-numbers v-model="formData.number"></el-input>
        </p>
        <el-button v-longpress="submitFun">长按2秒提交</el-button>
    </div>
</template>
<script setup>
let formData = reactive({
    userName: '',
    password: '',
    phoneNumber: '',
    number: ''
});
function submitFun() {
    console.log(11111);
}
</script>
<style lang="scss">
.article-admin {
    background-color: transparent !important;
}
</style>
