(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-09ab2f7a"],{"30f6":function(e,t,n){"use strict";var r=n("671f"),i=n.n(r);i.a},"50f9":function(e,t,n){"use strict";n.r(t);var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"main-index"},[n("p",{staticClass:"test"},[e._v(" 数字："),n("el-input",{directives:[{name:"numbers",rawName:"v-numbers",value:3,expression:"3"}],attrs:{size:"small",placeholder:"只能输入数字"},model:{value:e.number,callback:function(t){e.number=t},expression:"number"}})],1),n("p",[e._v("使用全局过滤器转化的大写金额："+e._s(e._f("smallToBig")(e.number)))]),n("p",[e._v("使用保留两位小数（四舍五入）："+e._s(e._f("retainTow")(e.number)))]),n("p",[e._v("使用vuex储存的登录userId："+e._s(e.userInfo.userId))]),n("el-button",{attrs:{size:"small",type:"primary"},on:{click:function(t){return e.filtersFun()}}},[e._v(" 点我手动调用全局过滤器 ")]),n("div",{directives:[{name:"loadmore",rawName:"v-loadmore",value:e.moreFun,expression:"moreFun"}],staticClass:"load-more-box"},e._l(e.dataList,(function(t,r){return n("p",{key:r},[e._v(e._s(r))])})),0)],1)},i=[],a=n("5530"),o=n("2f62"),s={computed:Object(a["a"])({},Object(o["c"])(["userInfo"])),data:function(){return{number:"",dataList:[]}},mounted:function(){this.getDataList()},methods:{moreFun:function(){this.getDataList()},getDataList:function(){for(var e=0;e<20;e++)this.dataList.push({index:e})},filtersFun:function(){this.$options.filters["smallToBig"]("150")}}},c=s,u=(n("30f6"),n("2877")),f=Object(u["a"])(c,r,i,!1,null,null,null);t["default"]=f.exports},5530:function(e,t,n){"use strict";n.d(t,"a",(function(){return a}));n("a4d3"),n("4de4"),n("4160"),n("e439"),n("dbb4"),n("b64b"),n("159b");function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}},"671f":function(e,t,n){},b64b:function(e,t,n){var r=n("23e7"),i=n("7b0b"),a=n("df75"),o=n("d039"),s=o((function(){a(1)}));r({target:"Object",stat:!0,forced:s},{keys:function(e){return a(i(e))}})},dbb4:function(e,t,n){var r=n("23e7"),i=n("83ab"),a=n("56ef"),o=n("fc6a"),s=n("06cf"),c=n("8418");r({target:"Object",stat:!0,sham:!i},{getOwnPropertyDescriptors:function(e){var t,n,r=o(e),i=s.f,u=a(r),f={},l=0;while(u.length>l)n=i(r,t=u[l++]),void 0!==n&&c(f,t,n);return f}})},e439:function(e,t,n){var r=n("23e7"),i=n("d039"),a=n("fc6a"),o=n("06cf").f,s=n("83ab"),c=i((function(){o(1)})),u=!s||c;r({target:"Object",stat:!0,forced:u,sham:!s},{getOwnPropertyDescriptor:function(e,t){return o(a(e),t)}})}}]);