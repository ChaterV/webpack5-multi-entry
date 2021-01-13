const path = require('path')
const {merge} = require("webpack-merge")
const webpackConfigBase = require('./webpack.base.conf')
const webpack = require("webpack")
const os = require('os')


const EC = require("./entry-config")
const devOpenPage = EC.DEV_OPEN_PAGE  // 配置 run dev 默认打开哪个页面


function getNetworkIp() {
    let needHost = ''
    try {
        // 获得网络接口列表
        let network = os.networkInterfaces()
        for (let dev in network) {
            let iface = network[dev]
            for (let i = 0; i < iface.length; i++) {
                let alias = iface[i]
                if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                    needHost = alias.address
                }
            }
        }
    } catch (e) {
        needHost = 'localhost'
    }
    return needHost
}

const webpackConfigDev = {
    mode: 'development',
    target: 'web',
    output: {
        path: path.resolve(__dirname, '../dist'),
        // 打包多出口文件
        filename: 'js/[name].bundle.js'
    },
    devtool: 'eval-cheap-module-source-map',
    devServer: {
        contentBase: path.join(__dirname, "../src/pages/index"),
        openPage: devOpenPage || 'index.html', // 配置 run dev 默认打开哪个页面
        publicPath: '/',
        // host: getNetworkIp(),
        port: "8787",
        // inline: true, //实时刷新
        overlay: true, // 浏览器页面上显示错误
        open: true, // 开启浏览器
        stats: 'none',
        hot: true
        // stats: "errors-only", 只打印错误
        // proxy: {
        //     '/': {
        //         target: 'www.baidu.com',
        //         secure: true,
        //         changeOrigin: true,
        // 		pathRewrite: {
        // 			'^/': ''
        // 		}
        //     }
        // }
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
}
module.exports = merge(webpackConfigBase, webpackConfigDev)
