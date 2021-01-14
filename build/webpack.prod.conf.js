const path = require('path')
const {merge} = require("webpack-merge")
const {CleanWebpackPlugin} = require("clean-webpack-plugin")
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const MiniCssExtractPlugin  =  require('mini-css-extract-plugin')
const webpackConfigBase = require('./webpack.base.conf')
const TerserPlugin = require('terser-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const BundleReport = process.env.npm_config_report

const webpackConfigProd = {
	mode: 'production',

	output: {
		path: path.resolve(__dirname, '../dist'),
		// 打包多出口文件
		filename: './static/js/[name].[chunkhash].js',
		chunkFilename: './static/js/[name].[chunkhash].js',
		publicPath: './'
	},


	plugins: [
		new CleanWebpackPlugin({
			root: path.resolve(__dirname, '../'), //根目录
			verbose: true, //开启在控制台输出信息
			dry: false,
		}),
		// 分离css
		new MiniCssExtractPlugin({
			filename: './static/css/[name].[contenthash].css',
			chunkFilename: './static/css/[name].[contenthash].css'
		}),
		// 压缩css
		new OptimizeCSSPlugin({
			cssProcessorOptions: {
				safe: true
			}
		}),
		new CompressionWebpackPlugin({
			filename: '[path].gz[query]',
			test: new RegExp(
				'\\.(js|css)$' // 压缩 js 与 css
			),
			algorithm: 'gzip',
			// 只处理大于xx字节 的文件，默认：0
			threshold: 10240,
			// 示例：一个1024b大小的文件，压缩后大小为768b，minRatio : 0.75
			minRatio: 0.8, // 默认: 0.8
			// 是否删除源文件，默认: false
			deleteOriginalAssets: false
		})
	],
	optimization: {
		minimizer: [
			new TerserPlugin({
				test: /\.m?js(\?.*)?$/i,
				terserOptions: {
					compress: {
						arrows: false,
						collapse_vars: false,
						comparisons: false,
						computed_props: false,
						hoist_funs: false,
						hoist_props: false,
						hoist_vars: false,
						inline: false,
						loops: false,
						negate_iife: false,
						properties: false,
						reduce_funcs: false,
						reduce_vars: false,
						switches: false,
						toplevel: false,
						typeofs: false,
						booleans: true,
						if_return: true,
						sequences: true,
						unused: true,
						conditionals: true,
						dead_code: true,
						evaluate: true,
						warnings: false,
						drop_console: true,
						drop_debugger: true,
						pure_funcs: [
							'console.log'
						]
					},
					output: {
						comments: /^\**!|@preserve|@license|@cc_on/i
					},
					mangle: {
						safari10: true
					}
				},
			})
		],
	}
}

// 包分析
if(BundleReport) {
	webpackConfigProd.plugins.push(
		new BundleAnalyzerPlugin(
			{
				analyzerMode: 'server',
				analyzerHost: '0.0.0.0',
				analyzerPort: 7777,
				reportFilename: 'report.html',
				defaultSizes: 'parsed',
				openAnalyzer: true,
				generateStatsFile: false,
				statsFilename: 'stats.json',
				statsOptions: null,
				logLevel: 'info'
			}
		)
	)
}
module.exports = merge(webpackConfigBase, webpackConfigProd)