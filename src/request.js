import Axios from 'axios';
import QS from "qs";
import router from './router/index';
import Vue from 'vue';
import store from "@/store/index.js"
// 请求头
Axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded; charset=UTF-8";
Axios.defaults.baseURL = "https://ty.fengyugo.com/golf/";
//get请求方法
export function get(url, params) {
    return new Promise((resolve, reject) => {
        Axios
            .get(url, {
                params: params
            })
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err.data);
            });
    });
}
//post请求方法
export function post(url, params) {
    store.commit("setLoadingObj", Vue.prototype.$loading({
        lock: true,
        customClass: "loading-box",
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(225, 225, 225, 0.5)'
    }))
    return new Promise((resolve, reject) => {
        Axios
            .post(url, QS.stringify(params))
            .then(res => {
                store.state.loadingObj.close();
                if (res.data.code == 1) {
                    resolve(res.data);
                } else if (res.data.code == 0) {
                    //code等于0的公共操作（这里是跳转到登录）
                    Vue.prototype.$message.error(res.data.msg);
                    router.replace({
                        name: "login"
                    })
                } else {
                    resolve(res.data);
                    Vue.prototype.$message.error(res.data.msg);
                }
            })
            .catch(err => {
                store.state.loadingObj.close();
                Vue.prototype.$message.error("出现错误，请联系管理员!");
                reject(err.data);
            });
    });
}
//文件上传方法
export function multiPost(url, FormData) {
    store.commit("setLoadingObj", Vue.prototype.$loading({
        lock: true,
        customClass: "loading-box",
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(225, 225, 225, 0.5)'
    }))
    return new Promise((resolve, reject) => {
        Axios
            .post(url, FormData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then(res => {
                store.state.loadingObj.close();

                if (res.data.code == 1) {
                    resolve(res.data);
                } else if (res.data.code == 0) {
                    //code等于0的公共操作（这里是跳转到登录）
                    Vue.prototype.$message.error(res.data.msg);
                    router.replace({
                        name: "login"
                    })
                } else {
                    resolve(res.data);
                    Vue.prototype.$message.error(res.data.msg);
                }
            })
            .catch(err => {
                store.state.loadingObj.close();
                Vue.prototype.$message.error("出现错误，请联系管理员!");
                reject(err.data);
            });
    });
}