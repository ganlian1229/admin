(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-51f5f225"],{"0458":function(e,t,s){},"50f9":function(e,t,s){"use strict";s.r(t);var n=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"globalCom"},[e._v(" 动态添加的全局组件2 ")])},a=[],r={data:function(){return{}},created:function(){},methods:{}},i=r,l=s("b709"),o=Object(l["a"])(i,n,a,!1,null,"4da96042",null),u=o.exports,c=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"globalCom"},[e._v(" 动态添加的全局组件 ")])},v=[],d={data:function(){return{}},created:function(){},methods:{}},m=d,f=Object(l["a"])(m,c,v,!1,null,"4f1febc2",null),p=f.exports,b=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"main-index"},[s("div",{staticClass:"left"},[s("p",{staticClass:"test"},[e._v(" 数字："),s("el-input",{directives:[{name:"numbers",rawName:"v-numbers",value:3,expression:"3"}],attrs:{placeholder:"只能输入数字"},model:{value:e.number,callback:function(t){e.number=t},expression:"number"}})],1),s("p",{directives:[{name:"copy",rawName:"v-copy",value:"使用全局过滤器转化的大写金额："+e.$options.filters["smallToBig"](e.number),expression:"'使用全局过滤器转化的大写金额：' + $options.filters['smallToBig'](number)"}]},[e._v(" 使用全局过滤器转化的大写金额： "),s("span",[e._v(" "+e._s(e._f("smallToBig")(e.number))+" ")])]),s("p",[e._v("使用保留两位小数（四舍五入）："+e._s(e._f("retainTow")(e.number)))]),s("p",[e._v("使用vuex储存的登录userId："+e._s(e.userInfo.userId))]),s("div",{directives:[{name:"loadmore",rawName:"v-loadmore",value:e.moreFun,expression:"moreFun"}],staticClass:"load-more-box"},e._l(e.dataList,(function(t,n){return s("p",{key:n},[e._v(e._s(n))])})),0),s("div",{staticClass:"box"},[s("h1",{directives:[{name:"drag",rawName:"v-drag.parent",value:e.dragFun,expression:"dragFun",modifiers:{parent:!0}}]},[e._v("1111")])]),s("div",{directives:[{name:"resize",rawName:"v-resize",value:e.boxResizeFun,expression:"boxResizeFun"}],staticClass:"box-resize"}),s("el-button",{directives:[{name:"longpress",rawName:"v-longpress.3",value:e.longPressFun,expression:"longPressFun",modifiers:{3:!0}}]},[e._v("长按2秒")]),s("testCom")],1),s("div",{staticClass:"right"},[s("p"),s(p),s(u)],1)])},_=[],x=s("4687"),g=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"test-com"},[s("el-input",{directives:[{name:"test",rawName:"v-test"}],model:{value:e.testValue,callback:function(t){e.testValue=t},expression:"testValue"}}),s("el-button",{on:{click:e.changeUserInfo}},[e._v("changeUserInfo")])],1)},h=[],w=s("4360"),C=(Object(x["d"])("123"),void 0),j=Object(l["a"])(C,g,h,!1,null,"4934524b",null),O=(j.exports,Object(x["d"])(""),Object(x["d"])([]));Object(x["c"])((function(){F()}));var F=function(){for(var e=0;e<20;e++)O.value.push({index:e})},k=(Object(x["a"])((function(){return w["a"].state.userInfo})),void 0),N=(s("9cc6"),Object(l["a"])(k,b,_,!1,null,null,null));t["default"]=N.exports},"9cc6":function(e,t,s){"use strict";s("0458")}}]);