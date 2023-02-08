let test = {
    //只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。
    bind: function (el, { name, value }) {
        console.log('test bind执行', el, name, value);
    },
    //被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。
    inserted: function (el, { name, value }) {
        console.log('test inserted执行', el, name, value);
        console.log('parentNode', el.parentNode);
    },
    //所在组件更新了执行一次
    update: function (el, { name, value }) {
        console.log('test update执行', el, name, value);
    },
    //所在组件更新完成了执行一次
    componentUpdated: function (el, { name, value }) {
        console.log('test componentUpdated执行', el, name, value);
    },
    //只调用一次，指令与元素解绑时调用。
    unbind(el, { name, value }) {
        console.log('test unbind执行', el, name, value);
    }
};
export default test;
