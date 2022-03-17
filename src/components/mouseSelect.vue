<template>
    <div ref="selectParentDom">
        <slot :valueList="value"></slot>
    </div>
</template>
<script>
export default {
    name: 'mouseSelect',
    props: {
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
    },
    model: {
        prop: 'value',
        // 随便命名事件，对应下面$emit即可
        event: 'valueChange'
    },
    data() {
        return {
            mouseObj: {
                isPress: false, //鼠标是否按下
                selDiv: null, //显示的盒子
                startX: null,
                startY: null,
                childrens: []
            },
            activeArr: [], //选中的索引列表
            cancelArr: [] //取消的索引列表
        };
    },
    mounted() {
        document.addEventListener('mousedown', this.boxMousedown, false);
        document.addEventListener('mousemove', this.boxMousemove, false);
        document.addEventListener('mouseup', this.boxMouseup, false);
        this.$once('hook:beforeDestroy', () => {
            document.removeEventListener('mousedown', this.boxMousedown, false);
            document.removeEventListener('mousemove', this.boxMousemove, false);
            document.removeEventListener('mouseup', this.boxMouseup, false);
        });
    },
    methods: {
        //获取元素位置
        getElementInfo(element, variable) {
            let actual = element[variable]; //这是获取元素距父元素的距离
            let current = element.offsetParent; //这是获取父元素
            while (current !== null) {
                //当它上面有元素时就继续执行
                actual += current[variable]; //这是获取父元素距它的父元素的距离累加起来
                current = current.offsetParent; //继续找父元素
            }
            return actual;
        },
        //获取滚动条距离 scrollX 横向滚动条距离最左边的距离  scrollY 纵向滚动条距离最上边的距离
        getScrollOffset() {
            if (0 && window.pageXOffset) {
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
        },
        //鼠标按下
        boxMousedown(event) {
            let element = this.$refs['selectParentDom'];
            let elementOffsetLeft = this.getElementInfo(element, 'offsetLeft'),
                elementOffsetTop = this.getElementInfo(element, 'offsetTop');
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
                this.clearEventBubble(event);
                //点击在盒子里面
                this.mouseObj.isPress = true;
                this.mouseObj.startX = clientX;
                this.mouseObj.startY = clientY;
                this.mouseObj.selDiv = document.createElement('div');
                this.mouseObj.selDiv.style.cssText =
                    'position:absolute;width:0px;height:0px;font-size:0px;margin:0px;padding:0px;border:1px dashed #0099FF;background-color:#C3D5ED;z-index:1000;filter:alpha(opacity:60);opacity:0.6;display:none;';
                this.mouseObj.selDiv.id = 'selectDiv';
                document.body.appendChild(this.mouseObj.selDiv);

                let { scrollX, scrollY } = this.getScrollOffset();
                this.mouseObj.selDiv.style.left =
                    this.mouseObj.startX + Number(scrollX.toFixed(2)) + 'px';
                this.mouseObj.selDiv.style.top =
                    this.mouseObj.startY + Number(scrollY.toFixed(2)) + 'px';

                let childrens = element.childNodes;
                // console.log('childrens', childrens)
                this.mouseObj.childrens = childrens;
            } else {
                this.mouseObj.isPress = false;
            }
        },
        //鼠标移动
        boxMousemove(event) {
            if (!this.mouseObj.isPress) return;
            this.clearEventBubble(event);
            if (this.mouseObj.selDiv.style.display == 'none') {
                this.mouseObj.selDiv.style.display = '';
            }
            this.activeArr = [];
            this.cancelArr = [];
            // console.log('移动中...')
            let x = event.clientX;
            let y = event.clientY;
            let { scrollX, scrollY } = this.getScrollOffset();
            this.mouseObj.selDiv.style.left =
                Math.min(x, this.mouseObj.startX) + Number(scrollX.toFixed(2)) + 'px';
            this.mouseObj.selDiv.style.top =
                Math.min(y, this.mouseObj.startY) + Number(scrollY.toFixed(2)) + 'px';
            this.mouseObj.selDiv.style.width = Math.abs(x - this.mouseObj.startX) + 'px';
            this.mouseObj.selDiv.style.height = Math.abs(y - this.mouseObj.startY) + 'px';

            // ---------------- 关键算法 ---------------------
            let _l = this.mouseObj.selDiv.offsetLeft,
                _t = this.mouseObj.selDiv.offsetTop;
            let _w = this.mouseObj.selDiv.offsetWidth,
                _h = this.mouseObj.selDiv.offsetHeight;
            let selList = this.mouseObj.childrens;
            for (let i = 0; i < selList.length; i++) {
                let selListOffsetLeft = this.getElementInfo(selList[i], 'offsetLeft');
                let selListOffsetTop = this.getElementInfo(selList[i], 'offsetTop');
                let sl = selList[i].offsetWidth + selListOffsetLeft;
                let st = selList[i].offsetHeight + selListOffsetTop;
                if (
                    sl > _l &&
                    st > _t &&
                    selListOffsetLeft < _l + _w &&
                    selListOffsetTop < _t + _h
                ) {
                    //选中了
                    this.activeArr.push(i);
                    if (this.isHot) {
                        if (!this.value[i].isAct) {
                            this.value[i].isAct = true;
                        }
                        this.$emit('valueChange', this.value);
                    }
                } else {
                    //取消选中
                    this.cancelArr.push(i);
                    if (this.isHot) {
                        if (this.value[i].isAct) {
                            this.value[i].isAct = false;
                        }
                        this.$emit('valueChange', this.value);
                    }
                }
            }
        },
        //鼠标抬起
        boxMouseup() {
            // console.log('抬起！')
            this.mouseObj.isPress = false;
            this.mouseObj.startX = null;
            this.mouseObj.startY = null;
            this.mouseObj.childrens = [];
            if (this.mouseObj.selDiv) {
                document.body.removeChild(this.mouseObj.selDiv);
                this.mouseObj.selDiv = null;
                // this.selectSuccess()
                this.$emit('sueecss', this.activeArr, this.cancelArr);
            }
            // console.log(this.mouseObj)
        },
        //阻止默认事件
        clearEventBubble(evt) {
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
    }
};
</script>
