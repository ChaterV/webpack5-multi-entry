const MiniCssExtractPlugin  =  require('mini-css-extract-plugin')
const _dev = ["style-loader", "css-loader", 'postcss-loader', "sass-loader"]
const _pro = [
  // https://github.com/webpack-contrib/mini-css-extract-plugin/issues/275
  // mini-css-extract-plugin 插件打包分离 css ，生成环境会丢掉 .vue 文件里面的 <style>里面的 css 问题：
  // 解决：删除 package.json 里面的 sideEffects 配置就可以了
    {
        loader: MiniCssExtractPlugin.loader,
        options: {
            // https://github.com/webpack-contrib/mini-css-extract-plugin/issues/403
            // 这里的 publicPath 和 url-loader / file-loader 的 publicPath 有冲突
            // ....., when I remove file-loader's publicPath everything works fine
            publicPath: '../../',
            // hmr: process.env.NODE_ENV !== 'production',
        }
    },
    'css-loader',
    'postcss-loader',
    'sass-loader'
]
const rules = [
    {
        test: /\.(css|scss|sass)$/,
        // 区别开发环境和生成环境
        use: process.env.NODE_ENV === "development" ? _dev : _pro
    },
    {
        test: /\.js$/,
        exclude: "/node_modules/",
        use: [{
            loader: "babel-loader"
        }],
        // 不检查node_modules下的js文件
        // exclude: "/node_modules/"
    },
    {
        test: /\.vue$/,
        exclude: /^node_modules$/,
        loader: 'vue-loader'
    },
    {
        test: /\.json$/,
        exclude: /^node_modules$/,
        loader: "json-loader"
    },
    {
        test: /\.(png|jpg|gif)$/,
        use: [{
            // 需要下载url-loader
            loader: "url-loader",
            options: {
                limit: 10, //小于这个时将会已base64位图片打包处理
                name: '[name].[hash:5].[ext]',
                // 图片文件输出的文件夹
                // publicPath: "./static/img",
                outputPath: "static/img"
            }
        }]
    },
    {
        test: /\.(eot|woff2?|ttf|svg)$/,
        use: [{
            loader: "url-loader",
            options: {
                name: "[name].[hash:5].[ext]",
                limit: 5000, // fonts file size <= 5KB, use 'base64'; else, output svg file
                // publicPath: "./static/fonts",
                outputPath: "static/fonts"
            }
        }]
    },
    {
        test: /\.(mp3|mp4)$/,
        use: [{
            // 需要下载url-loader
            loader: "url-loader",
            options: {
                limit: 5000,
                name: '[name].[hash:5].[ext]',
                // 文件输出的文件夹
                // publicPath: "./static/media",
                outputPath: "static/media"
            }
        }]
    },
    {
        test: /\.(ico)$/,
        use: [{
            loader: 'url-loader',
            options: {
                limit: 10,
                name: '[name].[ext]',
                // publicPath: "./",
                outputPath: "static/icon"
            }
        }],
    },
    {
        test: /\.html$/,
        // html中的img标签
        use: {
            loader: 'html-loader',
            options: {
                // attributes: false,
                    attributes: {
                        list: [
                            '...',
                            {
                                tag: 'link',
                                attribute: 'href',
                                type: 'src',
                            }
                        ]
                    },
                minimize: true,
            },
            // options: {
            //     attributes: {
            //         list: [
            //             '...',
            //             {
            //                 tag: 'img',
            //                 attribute: 'data-src',
            //                 type: 'src',
            //             },
            //             {
            //                 tag: 'img',
            //                 attribute: 'data-src',
            //                 type: 'src',
            //             }
            //         ]
            //     },
            //
            // }
        }
    }
]
module.exports = rules
