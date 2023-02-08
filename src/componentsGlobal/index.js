import Vue from 'vue';
const path = require('path');
console.log('path', path);

const filName = require.context('../componentsGlobal', true, /\.vue$/);
filName.keys().forEach((item) => {
    const name = path.basename(item, '.vue');
    Vue.component(name, filName(item).default);
});
