import Vue from 'vue';
import App from './App.vue';
//路由
import router from './router';

//添加element-ui
import elementUI from 'element-ui';
Vue.use(elementUI, { size: 'small' });
//请求封装
import { get, post, multiPost } from '@/request/request';
Vue.prototype.$http = { get, post, multiPost };
//全局指令
import directive from './directive';
Vue.use(directive);
// for (let key in directive) {
//     Vue.directive(key, directive[key]);
// }
// 添加pinia
import pinia from '@/store/store';

Vue.config.productionTip = false;
new Vue({
    router,
    pinia,
    render: (h) => h(App)
}).$mount('#app');
