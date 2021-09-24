let resize = {
  bind: function (el, { value }) {
    let width = "", height = "";
    function isResize () {
      let style = document.defaultView.getComputedStyle(el);
      if (width !== style.width || height !== style.height) {
        //变化了执行方法
        value();
      }
      width = style.width;
      height = style.height;
    }
    el.vueSetInterval = setInterval(isResize, 300);
  },
  unbind (el) {
    clearInterval(el.vueSetInterval);
  }
}
export default resize;