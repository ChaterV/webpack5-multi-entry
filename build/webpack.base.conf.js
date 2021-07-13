const path = require('path')
const glob = require("glob")
const webpack = require("webpack")
const WebpackBar = require('webpackbar')
const {VueLoaderPlugin} = require('vue-loader')

const EC = require("./entry-config")
const entryConfig = EC.ENTRY_CONF       // 多页面指定入口 js 配置
const templateConfig = EC.TEMPLATE_CONF   // 多页面指定 html 模板配置

require("./env-config")
// console.log('------- ', process.env.BASE_URL, ' ----------')
// html模板
const htmlWebpackPlugin = require("html-webpack-plugin")
//静态资源输出
const copyWebpackPlugin = require("copy-webpack-plugin")
const rules = require("./webpack.rules.conf.js")
// 获取html-webpack-plugin参数的方法
const getHtmlConfig = function (name, chunks) {
    const templateName = templateConfig[name] ?
        templateConfig[name].html :
        'index.html'
    return {
        template: `./src/entrance/${name}/${templateName}`,
        filename: `${name}.html`,
        inject: true,
        hash: false, //开启hash  ?[hash]
        chunks: chunks,
        minify: process.env.NODE_ENV === "development" ? false : {
            removeComments: true, //移除HTML中的注释
            collapseWhitespace: true, //折叠空白区域 也就是压缩代码
            removeAttributeQuotes: true, //去除属性引用
        },
        // favicon: './src/static/favicon.ico', // 网站图标
    }
}

function globs(entry) {
    // 读取src目录所有page入口
    glob.sync('./src/entrance/**/index.js')
        .forEach(function (name) {
            let start = name.indexOf('src/') + 4,
                end = name.length - 3
            let eArr = ["babel-polyfill"]
            let n = name.slice(start, end)
            n = n.slice(0, n.lastIndexOf('/')) //保存各个组件的入口
            n = n.split('entrance/')[1]
            eArr.push(name)
            entry[n] = eArr
        })
    return entry
}
function getEntry() {
    let entry = {}
    if(Object.keys(entryConfig).length !== 0) {
        globs(entry)
        Object.keys(entryConfig).forEach(chunkName => {
            const entryJsName = entryConfig[chunkName].js ? entryConfig[chunkName].js : 'index.js'
            const path = `./src/entrance/${chunkName}/${entryJsName}`
            entry[chunkName] = [path]
        })
    } else {
        globs(entry)
    }
    return entry
}

module.exports = {
    entry: getEntry(),
    module: {
        rules: [...rules]
    },
    resolve: {
        extensions: ['.js', '.vue', '.json', '.jsx'],
        alias: {
            '@': path.resolve(__dirname, '../src'),
            vue: "vue/dist/vue.esm-bundler.js"
            // 'vue$': 'vue/dist/vue.esm.js'
        }
    },
    externals: {
        // 'vue': 'Vue',  // key 项目中别名设置，value CDN 的全局导出变量
        // 'element-ui': 'ELEMENT',
    },
    // 提取公共代码
    optimization: {
        splitChunks: {
            cacheGroups: {
                default: false,
                vendor: {
                    // 抽离第三方插件
                    test: /node_modules/, // 指定是node_modules下的第三方包
                    chunks: 'initial',
                    name: 'vendor', // 打包后的文件名，任意命名
                    // 设置优先级，防止和自定义的公共代码提取时被覆盖，不进行打包
                    priority: 10,
                },
                utils: {
                    // 抽离自己写的公共代码，common这个名字可以随意起
                    chunks: 'initial',
                    name: 'common', // 任意命名
                    minSize: 30, // 只要超出0字节就生成一个新包
                    minChunks: 2
                }
            }
        }
    },
    plugins: [
        //静态资源输出
        // new copyWebpackPlugin([{
        //     from: path.resolve(__dirname, "../src/static"),
        //     to: './static',
        //     ignore: ['.*']
        // }]),
        new webpack.DefinePlugin({
            'process.env': process.env.ENV_LIST,
            // 'process.env.BASE_URL': '\"' + process.env.BASE_URL + '\"',
            "__VUE_OPTIONS_API__": true,
            "__VUE_PROD_DEVTOOLS__": false,
        }),
        new VueLoaderPlugin(),
        new WebpackBar()
    ]
}

//配置页面
const entryObj = getEntry()
const htmlArray = []
Object.keys(entryObj).forEach(element => {
    htmlArray.push({
        _html: element,
        title: '',
        chunks: ['vendor', 'common', element]
    })
})

//自动生成html模板
htmlArray.forEach((element) => {
    module.exports.plugins.push(new htmlWebpackPlugin(getHtmlConfig(element._html, element.chunks)))
})