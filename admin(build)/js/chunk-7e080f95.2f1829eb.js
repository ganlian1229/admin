(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7e080f95"],{"185a":function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t._self._c;return e("div",{staticClass:"sidebar-container",class:t.value?"hideSidebar":""},[e("div",{staticClass:"logo-box"},[t._v("logo")]),e("el-scrollbar",{attrs:{"wrap-class":"scrollbar-wrapper"}},[e("el-menu",{attrs:{"default-active":t.$route.path,collapse:t.value,"collapse-transition":!1,"default-openeds":t.openedsArr,mode:"vertical","background-color":"#212740","text-color":"#555e86","active-text-color":"#555e86"}},[t._l(t.menus,(function(a,s){return[a.meta.show&&!a.meta.isOne?[e("el-submenu",{key:a.path,attrs:{index:a.name,select:s}},[e("template",{slot:"title"},[e("i",{staticClass:"nav-icon",class:a.meta.icon}),e("span",[t._v(t._s(a.meta.title))])]),e("el-menu-item-group",t._l(a.children,(function(s,n){return e("router-link",{key:n,attrs:{to:a.path+"/"+s.path}},[e("el-menu-item",{attrs:{index:a.path+"/"+s.path}},[t._v(" "+t._s(s.meta.title)+" ")])],1)})),1)],2)]:[e("router-link",{key:a.name,attrs:{to:a.path+"/"+a.meta.onePath}},[e("el-menu-item",{attrs:{index:a.path}},[e("i",{staticClass:"nav-icon",class:a.meta.icon}),e("span",{attrs:{slot:"title"},slot:"title"},[t._v(t._s(a.meta.title))])])],1)]]}))],2)],1)],1)},n=[],i=a("d046");function l(t){if(!t)return;let e;if("object"===typeof t){e=Array.isArray(t)?[]:{};for(let a in t)t.hasOwnProperty(a)&&("object"!==typeof t[a]?e[a]=t[a]:e[a]=l(t[a]))}else e=t;return e}var c={props:{value:{type:Boolean,default:()=>!1}},model:{value:"value",event:"valueChange"},data(){return{menus:[],openedsArr:[]}},created(){this.showMenu(l(i["a"]))},mounted(){},methods:{showMenu(t){var e=[];t.forEach(t=>{if(t.meta&&t.meta.show)if(t.children.length){var a=[];t.children.forEach(t=>{t.meta.show&&a.push(t)}),t.children=a,e.push(t)}else e.push(t)}),this.menus=e}}},o=c,r=(a("ad70"),a("2877")),u=Object(r["a"])(o,s,n,!1,null,"39f78028",null),d=u.exports,v=function(){var t=this,e=t._self._c;return e("div",{staticClass:"top-navbar",class:t.value?"act":""},[e("div",{staticClass:"navbar-left"},[e("div",{staticClass:"hamburger-box",on:{click:t.switchActFun}},[e("span",{staticClass:"icon",class:t.value?"el-icon-s-unfold":"el-icon-s-fold"})])]),e("div",{staticClass:"navbar-right"},[e("el-button",{attrs:{type:"text"},on:{click:function(e){return t.logout()}}},[t._v("退出登录")])],1)])},h=[],p=a("a18c"),m={props:{value:{type:Boolean,default:()=>!1}},model:{value:"value",event:"valueChange"},data(){return{}},methods:{switchActFun(){this.$emit("valueChange",!this.value)},logout(){this.$confirm("是否确认退出登录?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning",center:!0}).then(()=>{this.$router.push({name:"login"}),sessionStorage.clear(),Object(p["b"])()}).catch(()=>{})}}},f=m,b=(a("8b43"),Object(r["a"])(f,v,h,!1,null,"9c54275c",null)),w=b.exports,A=function(){var t=this,e=t._self._c;return e("el-container",{staticClass:"container-content"},[e(w,{model:{value:t.isActive,callback:function(e){t.isActive=e},expression:"isActive"}}),e(d,{model:{value:t.isActive,callback:function(e){t.isActive=e},expression:"isActive"}}),e("el-container",{staticClass:"main-container",class:t.isActive?"active":""},[e("div",{staticStyle:{width:"100%"}},[e("div",{staticClass:"body-content"},[e("keep-alive",{attrs:{include:t.keepAliveArr}},[e("router-view")],1)],1)])])],1)},g=[],k={components:{topNavBar:w,leftSidebar:d},data(){return{keepAliveArr:["advertising"],isActive:!1}},created(){},mounted(){this.windowResize(),window.addEventListener("resize",this.windowResize,!1)},methods:{windowResize(){let t=document.body.clientWidth;this.isActive=t<=1450}}},_=k,x=(a("3c32"),Object(r["a"])(_,A,g,!1,null,"8aece98c",null));e["default"]=x.exports},"3c32":function(t,e,a){"use strict";a("514d")},"514d":function(t,e,a){},"76b1":function(t,e,a){},"8b43":function(t,e,a){"use strict";a("a419")},a419:function(t,e,a){},ad70:function(t,e,a){"use strict";a("76b1")}}]);