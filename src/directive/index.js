const requireComponent = require.context(
    // 其组件目录的相对路径
    './group/',
    // 是否查询其子目录
    true,
    // 匹配基础组件文件名的正则表达式
    /\.js$/
);
export default {
    install(Vue) {
        requireComponent.keys().forEach((fileName) => {
            const mod = requireComponent(fileName);
            // console.log('fileName', fileName);
            // console.log('mod', mod);
            const moduleName = fileName
                ?.split('/')
                ?.pop()
                ?.replace(/\.\w+$/, '');
            // console.log('moduleName', moduleName);
            Vue.directive(moduleName, mod.default);
        });
    }
};
