<template>
    <div ref="selectParentDom">
        <slot :valueList="value"></slot>
    </div>
</template>
<script setup>
let props = defineProps({
    //是否热更新
    isHot: {
        type: Boolean,
        default: () => false
    },
    //热更新一定要把列表传过来
    value: {
        type: Array,
        default: () => []
    }
});
let emit = defineEmits(['value:update', 'sueecss']);
let mouseObj = reactive({
    isPress: false, //鼠标是否按下
    selDiv: null, //显示的盒子
    startX: null,
    startY: null,
    childrens: []
});
let activeArr = ref([]); //选中的索引列表
let cancelArr = ref([]); //取消的索引列表
onMounted(() => {
    document.addEventListener('mousedown', boxMousedown, false);
    document.addEventListener('mousemove', boxMousemove, false);
    document.addEventListener('mouseup', boxMouseup, false);
});
onBeforeUnmount(() => {
    document.removeEventListener('mousedown', boxMousedown, false);
    document.removeEventListener('mousemove', boxMousemove, false);
    document.removeEventListener('mouseup', boxMouseup, false);
});
let selectParentDom = ref(null);
//鼠标按下
function boxMousedown(event) {
    let element = selectParentDom.value;
    let elementOffsetLeft = getElementInfo(element, 'offsetLeft'),
        elementOffsetTop = getElementInfo(element, 'offsetTop');
    let elementOffsetWidth = element.offsetWidth,
        elementOffsetHeight = element.offsetHeight;
    // console.log('elementOffsetLeft', elementOffsetLeft)
    // console.log('elementOffsetTop', elementOffsetTop)
    // console.log('elementOffsetWidth', elementOffsetWidth)
    // console.log('elementOffsetHeight', elementOffsetHeight)
    // console.log('clientX', event.clientX)
    // console.log('clientY', event.clientY)
    let clientX = event.clientX;
    let clientY = event.clientY;
    if (
        clientX > elementOffsetLeft &&
        clientX < elementOffsetLeft + elementOffsetWidth &&
        clientY > elementOffsetTop &&
        clientY < elementOffsetTop + elementOffsetHeight
    ) {
        // console.log('按下！')
        clearEventBubble(event);
        //点击在盒子里面
        mouseObj.isPress = true;
        mouseObj.startX = clientX;
        mouseObj.startY = clientY;
        mouseObj.selDiv = document.createElement('div');
        mouseObj.selDiv.style.cssText =
            'position:absolute;width:0px;height:0px;font-size:0px;margin:0px;padding:0px;border:1px dashed #0099FF;background-color:#C3D5ED;z-index:1000;filter:alpha(opacity:60);opacity:0.6;display:none;';
        mouseObj.selDiv.id = 'selectDiv';
        document.body.appendChild(mouseObj.selDiv);

        let { scrollX, scrollY } = getScrollOffset();
        mouseObj.selDiv.style.left = mouseObj.startX + Number(scrollX.toFixed(2)) + 'px';
        mouseObj.selDiv.style.top = mouseObj.startY + Number(scrollY.toFixed(2)) + 'px';

        let childrens = element.childNodes;
        // console.log('childrens', childrens)
        mouseObj.childrens = childrens;
    } else {
        mouseObj.isPress = false;
    }
}
//鼠标移动
function boxMousemove(event) {
    if (!mouseObj.isPress) return;
    clearEventBubble(event);
    if (mouseObj.selDiv.style.display == 'none') {
        mouseObj.selDiv.style.display = '';
    }
    activeArr.value = [];
    cancelArr.value = [];
    // console.log('移动中...')
    let x = event.clientX;
    let y = event.clientY;
    let { scrollX, scrollY } = getScrollOffset();
    mouseObj.selDiv.style.left = Math.min(x, mouseObj.startX) + Number(scrollX.toFixed(2)) + 'px';
    mouseObj.selDiv.style.top = Math.min(y, mouseObj.startY) + Number(scrollY.toFixed(2)) + 'px';
    mouseObj.selDiv.style.width = Math.abs(x - mouseObj.startX) + 'px';
    mouseObj.selDiv.style.height = Math.abs(y - mouseObj.startY) + 'px';

    // ---------------- 关键算法 ---------------------
    let _l = mouseObj.selDiv.offsetLeft,
        _t = mouseObj.selDiv.offsetTop;
    let _w = mouseObj.selDiv.offsetWidth,
        _h = mouseObj.selDiv.offsetHeight;
    let selList = mouseObj.childrens;
    for (let i = 0; i < selList.length; i++) {
        let selListOffsetLeft = getElementInfo(selList[i], 'offsetLeft');
        let selListOffsetTop = getElementInfo(selList[i], 'offsetTop');
        let sl = selList[i].offsetWidth + selListOffsetLeft;
        let st = selList[i].offsetHeight + selListOffsetTop;
        if (sl > _l && st > _t && selListOffsetLeft < _l + _w && selListOffsetTop < _t + _h) {
            //选中了
            activeArr.value.push(i);
            if (props.isHot) {
                if (!props.value[i].isAct) {
                    // eslint-disable-next-line vue/no-mutating-props
                    props.value[i].isAct = true;
                }
                emit('value:update', props.value);
            }
        } else {
            //取消选中
            cancelArr.value.push(i);
            if (props.isHot) {
                if (props.value[i].isAct) {
                    // eslint-disable-next-line vue/no-mutating-props
                    props.value[i].isAct = false;
                }
                emit('value:update', props.value);
            }
        }
    }
}
//鼠标抬起
function boxMouseup() {
    // console.log('抬起！')
    mouseObj.isPress = false;
    mouseObj.startX = null;
    mouseObj.startY = null;
    mouseObj.childrens = [];
    if (mouseObj.selDiv) {
        document.body.removeChild(mouseObj.selDiv);
        mouseObj.selDiv = null;
        // this.selectSuccess()
        emit('sueecss', activeArr, cancelArr);
    }
    // console.log(this.mouseObj)
}
//阻止默认事件
function clearEventBubble(evt) {
    if (evt.stopPropagation) {
        evt.stopPropagation();
    } else {
        evt.cancelBubble = true;
    }
    if (evt.preventDefault) {
        evt.preventDefault();
    } else {
        evt.returnValue = false;
    }
}
//获取元素位置
function getElementInfo(element, variable) {
    let actual = element[variable]; //这是获取元素距父元素的距离
    let current = element.offsetParent; //这是获取父元素
    while (current !== null) {
        //当它上面有元素时就继续执行
        actual += current[variable]; //这是获取父元素距它的父元素的距离累加起来
        current = current.offsetParent; //继续找父元素
    }
    return actual;
}
//获取滚动条距离 scrollX 横向滚动条距离最左边的距离  scrollY 纵向滚动条距离最上边的距离
function getScrollOffset() {
    if (window.pageXOffset) {
        return {
            scrollX: window.pageXOffset,
            scrollY: window.pageYOffset
        };
    } else {
        return {
            scrollX: document.body.scrollLeft + document.documentElement.scrollLeft,
            scrollY: document.body.scrollTop + document.documentElement.scrollTop
        };
    }
}
</script>
<script>
export default {
    name: 'mouseSelect'
};
</script>
