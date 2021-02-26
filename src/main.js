import Vue from 'vue'
import App from './App.vue'

//路由
import router from './router'

//vuex
import store from './store'

//添加element-ui
import elementUI from "element-ui";
Vue.use(elementUI);

//请求封装
import { get, post, multiPost } from '@/request/request';
Vue.prototype.$http = { get, post, multiPost };

//公用方法
import commentFun from './commentFun';
Vue.prototype.$comment = commentFun;

//全局过滤器
import filters from "./filters";
for (let key in filters) {
  Vue.filter(key, filters[key])
}

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
