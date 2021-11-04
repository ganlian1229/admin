<template>
  <div class="about">
    <h1>This is an about page</h1>
    <div class="fileBox" ref="fileBox">
      <div
        class="fileDiv"
        :class="item.isAct ? 'seled' : ''"
        v-for="(item, index) in fileList"
        :key="index"
      >
        {{ item.text }}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      fileList: [
        {
          isAct: false,
          text: 'file1',
        },
        {
          isAct: false,
          text: 'file2',
        },
        {
          isAct: false,
          text: 'file3',
        },
        {
          isAct: false,
          text: 'file4',
        },
        {
          isAct: false,
          text: 'file5',
        },
        {
          isAct: false,
          text: 'file6',
        },
        {
          isAct: false,
          text: 'file7',
        },
        {
          isAct: false,
          text: 'file8',
        },
        {
          isAct: false,
          text: 'file9',
        },
      ],
      mouseObj: {
        isPress: false, //鼠标是否按下
        selDiv: null, //显示的盒子
        startX: null,
        startY: null,
        childrens: [],
      },
    }
  },
  mounted() {
    // let element = document.getElementById('fileBox')
    document.addEventListener('mousedown', this.boxMousedown, false)
    document.addEventListener('mousemove', this.boxMousemove, false)
    document.addEventListener('mouseup', this.boxMouseup, false)
    this.$once('hook:beforeDestroy', () => {
      document.removeEventListener('mousedown', this.boxMousedown, false)
      document.removeEventListener('mousemove', this.boxMousemove, false)
      document.removeEventListener('mouseup', this.boxMouseup, false)
    })
  },
  methods: {
    //鼠标按下
    boxMousedown(event) {
      this.clearEventBubble(event)
      let element = this.$refs['fileBox']
      let elementOffsetLeft = element.offsetLeft,
        elementOffsetTop = element.offsetTop
      let elementOffsetWidth = element.offsetWidth,
        elementOffsetHeight = element.offsetHeight
      // console.log('elementOffsetLeft', elementOffsetLeft)
      // console.log('elementOffsetTop', elementOffsetTop)
      // console.log('elementOffsetWidth', elementOffsetWidth)
      // console.log('elementOffsetHeight', elementOffsetHeight)
      // console.log('clientX', event.clientX)
      // console.log('clientY', event.clientY)
      console.log('按下！')
      let clientX = event.clientX
      let clientY = event.clientY
      if (
        clientX > elementOffsetLeft &&
        clientX < elementOffsetLeft + elementOffsetWidth &&
        clientY > elementOffsetTop &&
        clientY < elementOffsetTop + elementOffsetHeight
      ) {
        //点击在盒子里面
        this.mouseObj.isPress = true
        this.mouseObj.startX = clientX
        this.mouseObj.startY = clientY
        this.mouseObj.selDiv = document.createElement('div')
        this.mouseObj.selDiv.style.cssText =
          'position:absolute;width:0px;height:0px;font-size:0px;margin:0px;padding:0px;border:1px dashed #0099FF;background-color:#C3D5ED;z-index:1000;filter:alpha(opacity:60);opacity:0.6;display:none;'
        this.mouseObj.selDiv.id = 'selectDiv'
        document.body.appendChild(this.mouseObj.selDiv)
        this.mouseObj.selDiv.style.left = this.mouseObj.startX + 'px'
        this.mouseObj.selDiv.style.top = this.mouseObj.startY + 'px'

        let childrens = element.getElementsByTagName('div')
        this.mouseObj.childrens = childrens
      } else {
        this.mouseObj.isPress = false
      }
    },
    //鼠标移动
    boxMousemove(event) {
      if (!this.mouseObj.isPress) return
      this.clearEventBubble(event)
      if (this.mouseObj.selDiv.style.display == 'none') {
        this.mouseObj.selDiv.style.display = ''
      }
      console.log('移动中...')
      let x = event.clientX
      let y = event.clientY
      this.mouseObj.selDiv.style.left = Math.min(x, this.mouseObj.startX) + 'px'
      this.mouseObj.selDiv.style.top = Math.min(y, this.mouseObj.startY) + 'px'
      this.mouseObj.selDiv.style.width =
        Math.abs(x - this.mouseObj.startX) + 'px'
      this.mouseObj.selDiv.style.height =
        Math.abs(y - this.mouseObj.startY) + 'px'

      // ---------------- 关键算法 ---------------------
      let _l = this.mouseObj.selDiv.offsetLeft,
        _t = this.mouseObj.selDiv.offsetTop
      let _w = this.mouseObj.selDiv.offsetWidth,
        _h = this.mouseObj.selDiv.offsetHeight
      let selList = this.mouseObj.childrens
      for (let i = 0; i < selList.length; i++) {
        let sl = selList[i].offsetWidth + selList[i].offsetLeft
        let st = selList[i].offsetHeight + selList[i].offsetTop
        if (
          sl > _l &&
          st > _t &&
          selList[i].offsetLeft < _l + _w &&
          selList[i].offsetTop < _t + _h
        ) {
          if (!this.fileList[i].isAct) {
            this.fileList[i].isAct = true
          }
        } else {
          if (this.fileList[i].isAct) {
            this.fileList[i].isAct = false
          }
        }
      }
    },
    //鼠标抬起
    boxMouseup() {
      console.log('抬起！')
      this.mouseObj.isPress = false
      this.mouseObj.startX = null
      this.mouseObj.startY = null
      this.mouseObj.childrens = []
      if (this.mouseObj.selDiv) {
        document.body.removeChild(this.mouseObj.selDiv)
        this.mouseObj.selDiv = null
        this.selectSuccess()
      }
      // console.log(this.mouseObj)
    },
    //选着成功！
    selectSuccess() {
      let selectArr = []
      this.fileList.forEach((item) => {
        if (item.isAct) {
          selectArr.push(item)
        }
      })
      console.log('当前选择为', selectArr)
    },
    clearEventBubble(evt) {
      if (evt.stopPropagation) {
        evt.stopPropagation()
      } else {
        evt.cancelBubble = true
      }
      if (evt.preventDefault) {
        evt.preventDefault()
      } else {
        evt.returnValue = false
      }
    },
  },
}
</script>
<style scoped>
.fileBox {
  display: flex;
  flex-wrap: wrap;
  border: 1px solid red;
}
.fileDiv {
  width: 100px;
  height: 100px;
  text-align: center;
  line-height: 100px;
  font-size: 12px;
  border: 1px solid #ccc;
  margin-right: 10px;
  margin-bottom: 10px;
}

.seled {
  border: 1px solid red;
  background-color: #d6dff7;
}
</style>
