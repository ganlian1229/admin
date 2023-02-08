import Vue from 'vue';
import { createPinia, PiniaVuePlugin } from 'pinia';
//pinia插件
import piniaPluginPersist from 'pinia-plugin-persist';
Vue.use(PiniaVuePlugin);
const pinia = createPinia(); //需要挂载在实例上
pinia.use(piniaPluginPersist);
export default pinia;
