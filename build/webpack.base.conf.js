const path = require('path')
const webpack = require("webpack")
const glob = require("glob")

require("./env-config")
//消除冗余的css
const purifyCssWebpack = require("purifycss-webpack")
// html模板
const htmlWebpackPlugin = require("html-webpack-plugin")
//静态资源输出
const copyWebpackPlugin = require("copy-webpack-plugin")
const rules = require("./webpack.rules.conf.js")

// 获取html-webpack-plugin参数的方法
const getHtmlConfig = function (name, chunks) {
    return {
        template: `./src/pages/${name}/index.html`,
        filename: process.env.NODE_ENV === "development"? `${name.slice(name.lastIndexOf('/') + 1)}.html`:`html/${name.slice(name.lastIndexOf('/') + 1)}.html`,
        inject: true,
        hash: false, //开启hash  ?[hash]
        chunks: chunks,
        minify: process.env.NODE_ENV === "development" ? false : {
            removeComments: true, //移除HTML中的注释
            collapseWhitespace: true, //折叠空白区域 也就是压缩代码
            removeAttributeQuotes: true, //去除属性引用
        },
    }
}

function getEntry() {
    let entry = {}
    //读取src目录所有page入口
    glob.sync('./src/pages/**/*.js')
        .forEach(function (name) {
            let start = name.indexOf('src/') + 4,
                end = name.length - 3
            let eArr = []
            let n = name.slice(start, end)
            n = n.slice(0, n.lastIndexOf('/')) //保存各个组件的入口
            n = n.split('pages/')[1]
            eArr.push(name)
            entry[n] = eArr
        })
    return entry
}

module.exports = {
    entry: getEntry(),
    module: {
        rules: [...rules]
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, '../src'),
            'vue$': 'vue/dist/vue.esm.js'
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
                vendor: {
                    // 抽离第三方插件
                    test: /node_modules/, // 指定是node_modules下的第三方包
                    chunks: 'initial',
                    name: 'vendor', // 打包后的文件名，任意命名
                    // 设置优先级，防止和自定义的公共代码提取时被覆盖，不进行打包
                    priority: 10
                },
                utils: {
                    // 抽离公共代码
                    chunks: 'initial',
                    name: 'common', // 任意命名
                    minSize: 0, // 只要超出0字节就生成一个新包
                    minChunks: 2
                }
            }
        }
    },
    plugins: [
        //静态资源输出
        new copyWebpackPlugin([{
            from: path.resolve(__dirname, "../src/static"),
            to: './static',
            ignore: ['.*']
        }]),
        // 消除冗余的css代码
        new purifyCssWebpack({
            paths: glob.sync(path.join(__dirname, "../src/pages/*/*.html"))
        })
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
