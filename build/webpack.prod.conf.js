const path = require('path')
const merge = require("webpack-merge")
const cleanWebpackPlugin = require("clean-webpack-plugin")
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const MiniCssExtractPlugin  =  require('mini-css-extract-plugin')
const webpackConfigBase = require('./webpack.base.conf')
const TerserPlugin = require('terser-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
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

	devtool: 'cheap-module-eval-source-map',

	plugins: [
		new cleanWebpackPlugin(['dist'], {
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
	],
	optimization: {
		minimizer: [
			new TerserPlugin({
				terserOptions: {
					test: /\.m?js(\?.*)?$/i,
					chunkFilter: () => true,
					warningsFilter: () => true,
					extractComments: false,
					sourceMap: false,
					cache: true,
					cacheKeys: defaultCacheKeys => defaultCacheKeys,
					parallel: true,
					include: undefined,
					exclude: undefined,
					minify: undefined,
					terserOptions: {
						output: {
							comments: /^\**!|@preserve|@license|@cc_on/i
						},
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
						mangle: {
							safari10: true
						}
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