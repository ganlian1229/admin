import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';
import dynamicRouter from './dynamicRouter';
import { addRouter } from '@/common/common';
import pinia from '@/store/store';
import mainStore from '@/store/mainStore';

Vue.use(VueRouter);

const createRouter = () =>
    new VueRouter({
        mode: 'hash',
        base: process.env.BASE_URL,
        routes
    });

const router = createRouter();
//使用pinia（vue2、vue3使用稍微有点区别）
let mainStoreObj = mainStore(pinia);
console.log('mainStoreObj', mainStoreObj);

let isRefresh = sessionStorage.isLogin ? true : false; //是否是刷新
// 判断路由是否需要登录
router.beforeEach((to, from, next) => {
    // console.log(to);
    if (to.name == 'login') {
        //当前页面跳转到登录页
        next();
        sessionStorage.clear();
    } else {
        if (to.matched.length == 0 && !isRefresh) {
            next('/login');
        } else {
            if (isRefresh) {
                //页面刷新走这里重新添加动态路由
                addRouter(dynamicRouter);
                isRefresh = false;
                next({ ...to, replace: true });
            } else {
                next();
            }
        }
    }
});
// 保存原来的push函数
const routerPush = VueRouter.prototype.push;
// 重写push函数
VueRouter.prototype.push = function push(location) {
    // 这个if语句在跳转相同路径的时候，在路径末尾添加新参数（一些随机数字）
    // 用来触发watch
    if (typeof location == 'string') {
        var Separator = '&';
        if (location.indexOf('?') == -1) {
            Separator = '?';
        }
        location = location + Separator + 'random=' + Math.random();
    }
    // 这个语句用来解决报错
    // 调用原来的push函数，并捕获异常
    return routerPush.call(this, location).catch((error) => error);
};

//重置路由
export function resetRouter() {
    const newRouter = createRouter();
    router.matcher = newRouter.matcher;
}

export default router;
