import Vue from 'vue';
import App from './App.vue';
//路由
import router from './router';

//添加element-ui
import elementUI from "element-ui";
Vue.use(elementUI, { size: 'small' });
//请求封装
import { get, post, multiPost } from '@/request/request';
Vue.prototype.$http = { get, post, multiPost };
//全局指令
import directive from "./directive/index";
for (let key in directive) {
  Vue.directive(key, directive[key])
}
// 添加pinia
import { createPinia, PiniaVuePlugin } from 'pinia'
//pinia插件
import piniaPluginPersist from 'pinia-plugin-persist';
Vue.use(PiniaVuePlugin)
const pinia = createPinia()//需要挂载在实例上
pinia.use(piniaPluginPersist);

Vue.config.productionTip = false
new Vue({
  router,
  pinia,
  render: h => h(App)
}).$mount('#app')
