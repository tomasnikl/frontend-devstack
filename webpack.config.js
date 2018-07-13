const path = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin')
const config = require('config');
const devMode = process.env.NODE_ENV !== 'production';

/*-------------------------------------------------*/

module.exports = {
	// webpack optimization mode
	mode: ( process.env.NODE_ENV ? process.env.NODE_ENV : 'development' ),

	// entry file(s)
	entry: './src/index.js',

	// output file(s) and chunks
	output: {
		library: 'UserList',
		libraryTarget: 'umd',
		libraryExport: 'default',
		path: path.resolve(__dirname, 'dist'),
		filename: 'index.js',
		publicPath: config.get('publicPath')
	},

	// module/loaders configuration
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: ['babel-loader']
			},
			{
				test: /\.scss$/,
				use: [
					devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
					'css-loader', 'postcss-loader', 'sass-loader']
			}
		]
	},

	plugins: [
		new CleanWebpackPlugin(path.resolve(__dirname, 'dist')),
		new HTMLWebpackPlugin({
			template: path.resolve(__dirname, 'index.html')
		}),
		new MiniCssExtractPlugin({
			// Options similar to the same options in webpackOptions.output
			// both options are optional
			filename: "css/[name].[hash].css",
			chunkFilename: "[id].css"
		})
	],

	// development server configuration
	devServer: {

		// must be `true` for SPAs
		historyApiFallback: true,

		// open browser on server start
		open: config.get('open')
	},

	// generate source map
	devtool: ( 'production' === process.env.NODE_ENV ? 'source-map' : 'cheap-module-eval-source-map' ),
};
