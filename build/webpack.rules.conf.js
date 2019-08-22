const MiniCssExtractPlugin  =  require('mini-css-extract-plugin')
const _dev = ["style-loader", "css-loader", "sass-loader", "postcss-loader"]
const _pro = [
    {
        loader: MiniCssExtractPlugin.loader,
        options: {
            publicPath: '../',
            hmr: process.env.NODE_ENV !== 'production',
        }
    },
    'css-loader',
    'postcss-loader',
    'sass-loader',
]
const rules = [
    {
        test: /\.(css|scss|sass)$/,
        // 区别开发环境和生成环境
        use: process.env.NODE_ENV === "development" ? _dev : _pro
    },
    {
        test: /\.js$/,
        use: [{
            loader: "babel-loader"
        }],
        // 不检查node_modules下的js文件
        // exclude: "/node_modules/"
    },
    {
        test: /\.(png|jpg|gif)$/,
        use: [{
            // 需要下载url-loader
            loader: "url-loader",
            options: {
                limit: 10, //小于这个时将会已base64位图片打包处理
                // 图片文件输出的文件夹
                publicPath: "../images",
                outputPath: "images"
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
                publicPath: "../static",
                outputPath: "static"
            }
        }],
    },
    {
        test: /\.html$/,
        // html中的img标签
        use: {
            loader: 'html-loader',
            options: {
                attrs: ['img:src', 'img:data-src', 'audio:src', 'link:href'],
                minimize: true
            }
        }
    }
]
module.exports = rules
