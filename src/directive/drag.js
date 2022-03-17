function isEquipment () {
  if (
    navigator.userAgent.match(
      /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
    )
  ) {
    /*移动*/
    return "move";
  } else {
    /*PC*/
    return "pc";
  }
}
function defaultEvent (e) {
  e.preventDefault();
}
let drag = {
  inserted: function (el, { rawName, value }) {
    let dragDom = null;
    let rawNameArr = rawName.split(".");
    if (rawNameArr.length > 1) {
      for (let i = 1; i < rawNameArr.length; i++) {
        if (i == 1) {
          dragDom = el.parentElement;
        } else {
          dragDom = dragDom.parentElement;
        }
      }
    } else {
      dragDom = el;
    }
    dragDom.style.position = "absolute";

    if (isEquipment() == "pc") {
      el.onmousedown = function (ev) {
        let x = ev.clientX - dragDom.offsetLeft;
        let y = ev.clientY - dragDom.offsetTop;
        let endX, endY;
        if (value) {
          value({
            type: "start",
            location: {
              x: x,
              y: y,
            },
          });
        }
        el.onmousemove = function (ev) {
          endX = ev.clientX - x;
          endY = ev.clientY - y;
          dragDom.style.left = endX + "px";
          dragDom.style.top = endY + "px";
        };
        el.onmouseup = function () {
          if (value) {
            value({
              type: "end",
              location: {
                x: endX,
                y: endY,
              },
            });
          }
          el.onmousemove = el.onmouseup = null;
        };
        return false;
      };
    } else {
      let lenX; //定义x轴相对手指点击位置距离盒子元素左边框距离
      let lenY; //定义y轴相对手指点击位置距离盒子元素上边框距离
      let maxW; //定义盒子在x轴上可移动的最大值
      let maxH; //定义盒子在y轴上可移动的最大值
      let endX, endY;
      dragDom.addEventListener("touchstart", function (e) {
        //按下去时
        maxW = e.srcElement.offsetParent.clientWidth - dragDom.offsetWidth;
        maxH = e.srcElement.offsetParent.clientHeight - dragDom.offsetHeight;
        var ev = e || window.event;
        var touch = (ev.targetTouches && ev.targetTouches[0]) || e;
        lenX = touch.clientX - dragDom.offsetLeft;
        lenY = touch.clientY - dragDom.offsetTop;
        if (value) {
          value({
            type: "start",
            location: {
              x: lenX,
              y: lenY,
            },
          });
        }
        dragDom.addEventListener("touchmove", defaultEvent, false); //注释后 靠边弹性返回
      });
      dragDom.addEventListener("touchmove", function (e) {
        //拖动时
        var ev = e || window.event;
        var touch = ev.targetTouches[0] || e;
        endX = touch.clientX - lenX;
        endY = touch.clientY - lenY;
        if (endX < 0) {
          endX = 0;
        } else if (endX >= maxW) {
          endX = maxW;
        }
        if (endY < 0) {
          endY = 0;
        } else if (endY >= maxH) {
          endY = maxH;
        }
        dragDom.style.left = endX + "px";
        dragDom.style.top = endY + "px";
      });
      dragDom.addEventListener("touchend", function () {
        //松开时
        if (value) {
          value({
            type: "end",
            location: {
              x: endX,
              y: endY,
            },
          });
        }
        document.removeEventListener("touchmove", defaultEvent);
      });
    }
  },
};
export default drag;
