//公用方法
import router from '@/router';
import { resetRouter } from '@/router/index';
/**
 * @Description: 对象、数组深拷贝
 * @param {*} source
 * @return {*}
 */
export function deepCopy(source) {
    if (!source) return;
    let target;
    if (typeof source === 'object') {
        // 根据source类型判断是新建一个数组还是对象
        target = Array.isArray(source) ? [] : {};
        // 遍历source，并且判断是source的属性才拷贝
        for (let key in source) {
            // eslint-disable-next-line no-prototype-builtins
            if (source.hasOwnProperty(key)) {
                if (typeof source[key] !== 'object') {
                    target[key] = source[key];
                } else {
                    // 如果内部属性存在复杂数据类型，使用递归实现深拷贝
                    target[key] = deepCopy(source[key]);
                }
            }
        }
    } else {
        target = source;
    }
    return target;
}
/**
 * @Description: 数组去重方法
 * @param {*} arr
 * @return {*}
 */
export function delArr(arr) {
    var newArr = [];
    for (var i = 0; i < arr.length; i++) {
        let item = arr[i];
        if (newArr.indexOf(arr[i]) == -1) {
            newArr.push(arr[i]);
            if (item.children && item.children.length) {
                item.children = delArr(item.children);
            }
        }
    }
    return newArr;
}
/**
 * @description 判断数据类型
 * @param {Any} val 需要判断类型的数据
 * @return string
 */
export function isType(val) {
    if (val === null) return 'null';
    if (typeof val !== 'object') return typeof val;
    else return Object.prototype.toString.call(val).slice(8, -1).toLocaleLowerCase();
}

/**
 * @Description: 添加动态路由
 * @param {*} routerArr
 */
export function addRouter(routerArr) {
    //添加之前先重置路由
    resetRouter();
    routerArr.forEach((item) => {
        router.addRoute(item.name, item);
    });
}
