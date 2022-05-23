import Vue from 'vue';
import App from './App.vue';

//路由
import router from './router';

//vuex
import store from './store';

//添加element-ui
import elementUI from "element-ui";
Vue.use(elementUI, { size: 'small' });

//请求封装
import { get, post, multiPost } from '@/request/request';
Vue.prototype.$http = { get, post, multiPost };

//公用方法
import common from '@/common/common';
Vue.prototype.$common = common;

//全局混入
import Mixin from "@/mixin/mixin";
Vue.mixin(Mixin);

//全局过滤器
import filters from "@/filters/filters";
for (let key in filters) {
  Vue.filter(key, filters[key])
}
//全局指令
import directive from "./directive/index";
for (let key in directive) {
  Vue.directive(key, directive[key])
}

import test from '@/directive/test';
Vue.directive('test', test)

//可使用vue3语法（兼容vue2语法）
import compositionApi from "@vue/composition-api"
Vue.use(compositionApi)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
