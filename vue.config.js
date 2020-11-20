module.exports = {
    devServer: {
        disableHostCheck: true,
        port: 8085,
        open: true,
        hot: true,
    },
    assetsDir: './',
    publicPath: './',
    outputDir: 'admindist',
    transpileDependencies: ["iview"],
    runtimeCompiler: undefined,
    productionSourceMap: false,
    parallel: undefined,
    css: undefined,
    chainWebpack: config => {
        // 其他配置
        const imagesRule = config.module.rule('images')
        imagesRule.uses.clear()
        imagesRule.use('url-loader')
            .loader('url-loader')
            .options({
                limit: 1,
                fallback: {
                    loader: 'file-loader',
                    options: {
                        name: 'img/[name].[ext]',
                        // publicPath: process.env.NODE_ENV === 'production' ? '//game.gtimg.cn/images/slg/ingame/all201905/' : './'
                    }
                }
            });
    }
}