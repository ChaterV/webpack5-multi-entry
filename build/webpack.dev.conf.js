const path = require('path')
const {merge} = require("webpack-merge")
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')
const webpackConfigBase = require('./webpack.base.conf')
const webpack = require("webpack")
const os = require('os')


const EC = require("./entry-config")
const devOpenPage = EC.DEV_OPEN_PAGE  // 配置 run dev 默认打开哪个页面


function getIPAddress() {
    const interfaces = os.networkInterfaces()
    for (let devName in interfaces) {
        const iface = interfaces[devName]
        for (let i = 0; i < iface.length; i++) {
            let alias = iface[i]
            if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                return alias.address
            }
        }
    }
}

const webpackConfigDev = merge(webpackConfigBase, {
    mode: 'development',
    target: 'web',
    stats: 'errors-only',
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
        clientLogLevel: "warning",
        host: getIPAddress(),
        // inline: true, //实时刷新
        overlay: true, // 浏览器页面上显示错误
        open: true, // 开启浏览器
        quiet: true,
        hot: true
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
})

module.exports = new Promise((resolve, reject) => {
    portfinder.basePort = 8787
    portfinder.getPort((err, port) => {
        if (err) {
            reject(err)
        } else {
            webpackConfigDev.devServer.port = port
            webpackConfigDev.plugins.push(new FriendlyErrorsWebpackPlugin({
                compilationSuccessInfo: {
                    messages: [
                        `server running at:   \n - Local:   http://localhost:${port}  \n - Network: http://${webpackConfigDev.devServer.host}:${port}
                        `
                    ],
                },
            }))

            resolve(webpackConfigDev)
        }
    })
})