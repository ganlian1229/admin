<template>
    <div>
        <div class="login-bg"></div>
        <div class="login_form">
            <el-form
                :model="ruleForm"
                :rules="rules"
                ref="ruleForm"
                label-width="80px"
            >
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
                <el-form-item style="text-align: left; margin-bottom: 0;">
                    <el-button
                        type="primary"
                        @click="submitForm('ruleForm')"
                        style="width: 100%;"
                        >登录</el-button
                    >
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
    name: "login",
    data() {
        return {
            ruleForm: {
                username: "",
                password: "",
            },
            rules: {
                username: [
                    {
                        required: true,
                        message: "请输入手机号",
                        trigger: "blur",
                    },
                ],
                password: [
                    { required: true, message: "请输入密码", trigger: "blur" },
                ],
            },
            roles: "zjl",
        };
    },
    mounted() {},
    methods: {
        ...mapMutations(["setUserInfo"]),
        submitForm() {
            if (this.ruleForm.username == "" || this.ruleForm.password == "") {
                this.$message.error("手机号或密码不能为空！");
                return;
            }
            this.$router.replace({
                path: "/main/index",
            });
            let userInfo = {
                userId: 1,
            };
            sessionStorage.setItem("userInfo", JSON.stringify(userInfo));
            this.setUserInfo(userInfo);
        },
    },
};
</script>

<style>
.login-bg {
    width: 100%;
    height: 100vh;
    background: #232323;
}
.lizi {
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
}
.el-form-item__content {
    margin-left: 0 !important;
}
.login_form h1 {
    text-align: center;
    color: #303133;
    margin: 0 0 20px;
}
.copyright {
    position: absolute;
    left: 0;
    bottom: 22px;
    width: 100%;
    text-align: center;
    margin: 0;
}
.login_form h1 img {
    width: 111px;
    height: 99px;
}
.login_form h1 img:hover {
    transform: rotate(666turn);
    transition-delay: 1s;
    transition-property: all;
    transition-duration: 59s;
    transition-timing-function: cubic-bezier(0.34, 0, 0.84, 1);
}
</style>
