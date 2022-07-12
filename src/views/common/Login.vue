<template>
    <div class="logingCom">
        <div class="login-bg"></div>
        <div class="login_form">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px">
                <el-form-item prop="username">
                    <el-input
                        v-model="ruleForm.username"
                        prefix-icon="el-icon-user"
                        placeholder="输入手机号"
                    ></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input
                        type="password"
                        placeholder="输入密码"
                        v-model="ruleForm.password"
                        autocomplete="off"
                        prefix-icon="el-icon-lock"
                        @keyup.enter.native="submitForm('ruleForm')"
                    ></el-input>
                </el-form-item>
                <el-form-item style="text-align: left; margin-bottom: 0">
                    <el-button type="primary" @click="submitForm('ruleForm')" style="width: 100%">
                        登录
                    </el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import { resetRouter } from '@/router/index';
import { mapActions, mapState } from 'pinia';
import mainStore from '@/pinia/mainStore';
export default {
    name: 'login',
    data() {
        return {
            ruleForm: {
                username: 'admin',
                password: '123456'
            },
            rules: {
                username: [
                    {
                        required: true,
                        message: '请输入手机号',
                        trigger: 'blur'
                    }
                ],
                password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
            },
            roles: 'zjl'
        };
    },
    mounted() {},
    methods: {
        ...mapActions(mainStore, ['setUserInfo']),
        //登录
        submitForm() {
            this.$refs['ruleForm'].validate((valid) => {
                if (valid) {
                    this.$router.replace({
                        path: '/main/index'
                    });
                    let userInfo = {
                        userId: 1
                    };
                    this.setUserInfo(userInfo);
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        //登录成功后添加动态路由
        addDynamicRoutes() {
            //重置路由
            resetRouter();
            //添加需要的路由
            this.$router.addRoutes();
        }
    }
};
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
