<template>
    <div class="logingCom">
        <div class="login-bg"></div>
        <div class="login_form">
            <el-form :model="ruleFormData" :rules="rules" ref="ruleFormDom">
                <el-form-item prop="username">
                    <el-input
                        v-model="ruleFormData.username"
                        prefix-icon="el-icon-user"
                        placeholder="输入手机号"
                    ></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input
                        type="password"
                        placeholder="输入密码"
                        v-model="ruleFormData.password"
                        autocomplete="off"
                        prefix-icon="el-icon-lock"
                        @keyup.enter.native="submitForm()"
                    ></el-input>
                </el-form-item>
                <el-form-item style="text-align: left; margin-bottom: 0">
                    <el-button type="primary" @click="submitForm()" style="width: 100%">
                        登录
                    </el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script setup>
import { resetRouter } from '@/router/index';
import storeObj from '@/pinia/index.js';
import router from '@/router/index.js';

console.log(router);

let ruleFormData = reactive({
    username: 'admin',
    password: '123456'
});
let rules = reactive({
    username: [
        {
            required: true,
            message: '请输入手机号',
            trigger: 'blur'
        }
    ],
    password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
});

const ruleFormDom = ref(null);
const mainStore = storeObj.mainStore;
/**
 * @Description: 登录
 * @return {*}
 */
function submitForm() {
    ruleFormDom.value.validate((valid) => {
        if (valid) {
            router.replace({
                path: '/main/index'
            });
            let userInfo = {
                userId: 1
            };
            mainStore.setUserInfo(userInfo);
        } else {
            console.log('error submit!!');
            return false;
        }
    });
}
/**
 * @Description: 登录成功后添加动态路由
 * @return {*}
 */
function addDynamicRoutes() {
    //重置路由
    resetRouter();
    //添加需要的路由
    router.addRoutes();
}
</script>

<style lang="scss" scoped>
.logingCom {
    .login-bg {
        width: 100%;
        height: 100vh;
        background: #232323;
    }
    .login_form {
        width: 300px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        padding: 20px;
        z-index: 9999;
        background: #f0f2f5;
        :deep(.el-form-item__content) {
            margin-left: 0 !important;
        }
    }
}
</style>
