const debounce = {
    //被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。
    inserted: function(el, { name, value }) {
        // console.log('debounce inserted执行', el, name, value);
        // console.log('parentNode', el.parentNode);
        let fn, event, time;
        if (typeof value === 'function') {
            fn = value;
            event = 'click';
            time = 500;
        } else if (Array.isArray(value)) {
            fn = value[0];
            event = value[1];
            time = value[2];
        } else {
            console.error('v-debounce用法错误');
        }
        let timer;
        el.addEventListener(event ? event : 'click', () => {
            if (timer) clearTimeout(timer);
            timer = setTimeout(
                () => {
                    fn();
                },
                time ? time : 500
            );
        });
    }
};
export default debounce;
