const path = require('path')
const {merge} = require("webpack-merge")
const FriendlyErrorsWebpackPlugin = require('@soda/friendly-errors-webpack-plugin')
const portfinder = require('portfinder')
const webpackConfigBase = require('./webpack.base.conf')
const webpack = require("webpack")
const os = require('os')


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
        host: '0.0.0.0',
        open: false, // 开启浏览器
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
})

module.exports = new Promise((resolve, reject) => {
    portfinder.basePort = 8081
    portfinder.getPort((err, port) => {
        if (err) {
            reject(err)
        } else {
            webpackConfigDev.devServer.port = port
            webpackConfigDev.plugins.push(new FriendlyErrorsWebpackPlugin({
                compilationSuccessInfo: {
                    messages: [
                        `server running at:   \n - Local:   http://localhost:${port}  \n - Network: http://${getIPAddress()}:${port}
                        `
                    ],
                },
            }))

            resolve(webpackConfigDev)
        }
    })
})