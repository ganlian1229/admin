//
export default {
    inserted: (el, bind) => {
        // 这里参考管方https://cn.vuejs.org/v2/guide/custom-directive.html#%E5%8A%A8%E6%80%81%E6%8C%87%E4%BB%A4%E5%8F%82%E6%95%B0
        // el当前绑定的元素
        // console.log(el, bind,)
        // 给元素添加滚动事件监听
        el.addEventListener('scroll', function () {
            // console.log('绑定元素的高度：', el.clientHeight)
            // console.log('绑定元素的滚动条的高度', el.scrollHeight)
            // console.log('滚动条距离顶部的距离', el.scrollTop)
            // console.log('滚动条的高度 - 元素的高度 - 滚动条距离顶部的距离 = 0', (el.scrollHeight - el.clientHeight) - el.scrollTop)
            // 这里的判断和上面watch监听是一样的
            if (el.scrollHeight - el.clientHeight - el.scrollTop <= 100) {
                // bind.value来调用指令上的方法获取数据
                bind.value();
            }
        });
    }
};
