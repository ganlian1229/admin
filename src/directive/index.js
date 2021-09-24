import numbers from "./numbers";//输入框只能输入数字 v-numbers="3"  接收参数为保留小数点后几位 默认99
import loadmore from './loadmore';//绑定的当前元素滚动到底部事件   通用于加载更多数据
import drag from "./drag";//拖拽元素  绑定的当前元素可拖拽（兼容pc、移动） 接收参数function   回调显示按下(start)/抬起(end)
import copy from "./copy";//复制文本   接收需要复制的文本
import longpress from "./longpress";//长按事件默认2秒   接收function  长按2秒后执行的事件
import resize from "./resize";//被绑定的元素 windth、height 改变  接收function 改变时触发  原理是setInterval监听  尽量少用



import test from "./test";


export default {
    numbers,
    loadmore,
    drag,
    copy,
    longpress,
    resize,
    test
}