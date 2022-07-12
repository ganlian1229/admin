import Axios from 'axios';
import QS from "qs";
import router from '@/router/index';
import { Loading, Message } from "element-ui";

// 请求头
// Axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded; charset=UTF-8";//FROM
Axios.defaults.headers.post["Content-Type"] = "application/json;charset=UTF-8";//JSON
switch (process.env.VUE_APP_CURRENTMODE) {
    case "production":
        //运行 npm run build时候
        Axios.defaults.baseURL = "https://ty.fengyugo.com/golf1231232/";
        break;
    case "test":
        //运行 npm run build:test时候
        Axios.defaults.baseURL = "https://ty.fengyugo.com/golf/";
        break;
    default:
        //本地运行的时候（需要跨域）
        Axios.defaults.baseURL = "/request";
        break;
}

let LoadingInstance = {
    target: null,
    count: 0,
}
//创建loading
function addLoading () {
    LoadingInstance.count++;
    if (LoadingInstance.count == 1) {
        LoadingInstance.target = Loading.service({
            lock: true,
            customClass: "loading-box",
            text: 'Loading',
            spinner: 'el-icon-loading',
            background: 'rgba(225, 225, 225, 0.5)'
        });
    }
}
//关闭loading
function closeLoading () {
    if (LoadingInstance.count > 0) LoadingInstance.count--;
    if (LoadingInstance.count == 0 && LoadingInstance.target) {
        LoadingInstance.target.close();
        LoadingInstance.target = null;
    }
}
// // Axios请求前
// Axios.interceptors.request.use(
//     config => {
//         let token = sessionStorage.getItem("token");
//         token && (config.headers.Authorization = `Bearer ${token}`);
//         return config;
//     },
//     err => {
//         Message.error("参数错误");
//         return Promise.reject(err);
//     }
// );
// //Axios请求返回
// Axios.interceptors.response.use(
//     response => {
//         return Promise.resolve(response);
//     },
//     err => {
//         return Promise.reject(err);
//     }
// )


//get请求方法
export function get (url, params = {}) {
    //是否隐藏loading
    params.hideLoading ? delete params.hideLoading : addLoading();
    return new Promise((resolve, reject) => {
        Axios
            .get(url, {
                params: params
            })
            .then(res => {
                closeLoading()
                resolve(res);
                // if (res.data.code == 200) {
                //     resolve(res.data);
                // } else if (res.data.code == 0) {
                //     //code等于0的公共操作（这里是跳转到登录）
                //     Message.error(res.data.msg);
                //     router.replace({
                //         name: "login"
                //     })
                //     sessionStorage.clear();
                // } else {
                //     reject(res.data);
                //     Message.error(res.data.msg);
                // }
            })
            .catch(err => {
                closeLoading()
                reject(err.data);
            });
    });
}
//post请求方法
export function post (url, params = {}) {
    //是否隐藏loading
    params.hideLoading ? delete params.hideLoading : addLoading();

    return new Promise((resolve, reject) => {
        Axios
            // .post(url, QS.stringify(params))//FROM 需要序列化params
            .post(url, params)
            .then(res => {
                closeLoading()
                if (res.data.code == 200) {
                    resolve(res.data);
                } else if (res.data.code == 40001) {
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
                closeLoading()
                Message.error("出现错误，请联系管理员!");
                reject(err.data);
            });
    });
}
//文件上传方法
export function multiPost (url, FormData) {
    addLoading()
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
                closeLoading()
                if (res.data.code == 200) {
                    resolve(res.data);
                } else if (res.data.code == 40001) {
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
                closeLoading()
                Message.error("出现错误，请联系管理员!");
                reject(err.data);
            });
    });
}