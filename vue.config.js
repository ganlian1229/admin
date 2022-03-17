const ScriptSetup = require('unplugin-vue2-script-setup/webpack').default

module.exports = {
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
    //关闭eslint
    lintOnSave: true,
    assetsDir: './',
    publicPath: './',
    //打包后输出文件夹名称
    outputDir: process.env.outputDir,
    //为了兼容ie  在打包的时候编译  
    transpileDependencies: [],
    runtimeCompiler: undefined,
    productionSourceMap: false,
    css: undefined,
    parallel: false,
    configureWebpack: {
        plugins: [
            ScriptSetup({ /* options */ }),
        ],
    },
    // chainWebpack: config => {
    //     // 其他配置
    //     const imagesRule = config.module.rule('images')
    //     imagesRule.uses.clear()
    //     imagesRule.use('url-loader')
    //         .loader('url-loader')
    //         .options({
    //             limit: 1,
    //             fallback: {
    //                 loader: 'file-loader',
    //                 options: {
    //                     name: 'img/[name].[ext]',
    //                     // publicPath: process.env.NODE_ENV === 'production' ? '//game.gtimg.cn/images/slg/ingame/all201905/' : './'
    //                 }
    //             }
    //         });
    // }
}