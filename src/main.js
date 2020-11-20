import Vue from 'vue'
import App from './App.vue'
//路由
import router from './router'
//vuex
import store from './store'
//添加element-ui
import elementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
//添加element-ui到vue
Vue.use(elementUI);
//请求封装
import { get, post, multiPost } from './request';
//封装的请求添加到vue实例上
Vue.prototype.$http = { get, post, multiPost };
//公用方法
import commentFun from './commentFun';
//把公用方法添加到Vue实例上
Vue.prototype.$comment = commentFun;
//全局过滤器
import filters from "./filters";
//全局过滤器添加到vue实例上
for (let key in filters) {
  Vue.filter(key, filters[key])
}

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
