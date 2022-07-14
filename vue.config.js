const ScriptSetup = require('unplugin-vue2-script-setup/webpack').default
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')

module.exports = {
    chainWebpack: config => {
        config
            .plugin('html')
            .tap(args => {
                args[0].title = 'admin'
                return args
            })
    },
    devServer: {
        disableHostCheck: true,
        port: 8085,
        open: true,
        hot: true,
        proxy: {
            //配置跨域
            '/request': {
                target: "https://baby.yyooyi.com/api/mall-admin",
                // target: "http://192.168.0.125:8083",
                ws: true,
                changOrigin: true,
                pathRewrite: {
                    '^/request': ''
                }
            }
        }
    },
    lintOnSave: true,//eslint是否开启
    assetsDir: './',
    publicPath: './',
    outputDir: process.env.outputDir,//打包后输出文件夹名称
    productionSourceMap: false,//打包时候是否生成Map文件
    configureWebpack: {
        plugins: [
            ScriptSetup({ /* options */ }),
            AutoImport({
                resolvers: [],
                imports: ['vue', 'pinia', 'vue-router'],//需要自动导入
                dts: "src/auto-imports.d.ts"
            }),
            Components({
                resolvers: [],//自动导入elementui组件
                // 指定组件位置，默认是src/components
                dirs: ['src/components', 'src/componentsGlobal'],//自动导入自定义组件
                dts: "src/components.d.ts"
            })
        ],
    },
}