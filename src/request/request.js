import Axios from 'axios';
import QS from "qs";
import router from '@/router/index';
import { Loading, Message } from "element-ui";
// import store from "@/store/index.js"
// 请求头
// Axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded; charset=UTF-8";//FROM
Axios.defaults.headers.post["Content-Type"] = "application/json;charset=UTF-8";//JSON

if (process.env.VUE_APP_CURRENTMODE == 'production') {
    //运行 npm run build时候
    Axios.defaults.baseURL = "https://ty.fengyugo.com/golf1231232/";
} else if (process.env.VUE_APP_CURRENTMODE == 'test') {
    //运行 npm run build:test时候
    Axios.defaults.baseURL = "https://ty.fengyugo.com/golf/";
} else {
    //本地运行的时候（需要跨域）
    Axios.defaults.baseURL = "/request";
}

//get请求方法
export function get (url, params) {
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
export function post (url, params) {
    let loadingInstance = Loading.service({
        lock: true,
        customClass: "loading-box",
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(225, 225, 225, 0.5)'
    })
    if (params.isSign) {
        delete params.isSign;
        params.managerId = 0;
        params.token = "";
    } else {
        params.managerId = sessionStorage.getItem("managerId");
        params.token = sessionStorage.getItem("token");
    }
    return new Promise((resolve, reject) => {
        Axios
            .post(url, QS.stringify(params))
            .then(res => {
                loadingInstance.close();
                if (res.data.code == 1) {
                    resolve(res.data);
                } else if (res.data.code == 0) {
                    //code等于0的公共操作（这里是跳转到登录）
                    Message.error(res.data.msg);
                    router.replace({
                        name: "login"
                    })
                    sessionStorage.clear();
                } else {
                    reject(res.data);
                    Message.error(res.data.msg);
                }
            })
            .catch(err => {
                loadingInstance.close();
                Message.error("出现错误，请联系管理员!");
                reject(err.data);
            });
    });
}
//文件上传方法
export function multiPost (url, FormData) {
    let loadingInstance = Loading.service({
        lock: true,
        customClass: "loading-box",
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(225, 225, 225, 0.5)'
    })
    FormData.append("managerId", sessionStorage.getItem("managerId"));
    FormData.append("token", sessionStorage.getItem("token"));
    return new Promise((resolve, reject) => {
        Axios
            .post(url, FormData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then(res => {
                loadingInstance.close();
                if (res.data.code == 1) {
                    resolve(res.data);
                } else if (res.data.code == 0) {
                    //code等于0的公共操作（这里是跳转到登录）
                    Message.error(res.data.msg);
                    router.replace({
                        name: "login"
                    })
                    sessionStorage.clear();
                } else {
                    reject(res.data);
                    Message.error(res.data.msg);
                }
            })
            .catch(err => {
                loadingInstance.close();
                Message.error("出现错误，请联系管理员!");
                reject(err.data);
            });
    });
}