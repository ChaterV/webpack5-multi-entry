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
        test: /\.less$/,
        use:[ 'style-loader','css-loader','postcss-loader','less-loader'],
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
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-react', '@babel/preset-env'],
                plugins: ['@babel/plugin-proposal-class-properties']
            }
        }
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
        loader: "img-loader",
        options: {
            plugins: [
                require("imagemin-pngquant")({
                    //压缩 png 的插件
                    speed: 4, // 取值范围 1-11  值越大压缩率越小 ，值越小压缩生成的文件越小 默认为4
                }),
                require("imagemin-gifsicle")({
                    // 压缩 gif 插件
                    optimizationLevel: 1, // 取值范围 1、2、3 默认1   3极限压缩,压缩和图片效果不好，使用默认1就行
                }),
                require("imagemin-mozjpeg")({
                    // 压缩 jpg 插件
                    quality: 50, // 1-100   值越大压缩率越小 ，值越小压缩生成的文件越小
                }),
            ],
        }
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
                outputPath: "static/ico"
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
            }
        }
    }
]
module.exports = rules
