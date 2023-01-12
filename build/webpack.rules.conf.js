const MiniCssExtractPlugin  =  require('mini-css-extract-plugin')
const dev_loader = (loader) => {
    return [
        "style-loader",
        "css-loader",
        'postcss-loader',
        loader
    ]
}
const pro_loader = (loader) => {
    return [
        {
            loader: MiniCssExtractPlugin.loader,
            options: {
                publicPath: '../../',
            }
        },
        'css-loader',
        'postcss-loader',
        loader
    ]
}
const rules = [
    {
        test: /\.(css|scss|sass)$/,
        // 区别开发环境和生成环境
        use: process.env.NODE_ENV === "development" ? dev_loader('sass-loader') : pro_loader('sass-loader')
    },
    {
        test: /\.less$/,
        use: process.env.NODE_ENV === "development" ? dev_loader({
            loader: "less-loader",
            options: {
                lessOptions: {
                    javascriptEnabled: true
                }
            }
        },) : pro_loader({
            loader: "less-loader",
            options: {
                lessOptions: {
                    javascriptEnabled: true
                }
            }
        },)
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
        }],
        type: 'javascript/auto'
    },
    {
        test: /\.(woff2?|eot|ttf|otf|ttc|svg)$/,
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
                    sources: {
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
