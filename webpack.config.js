var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
	devtool: 'source-map',
	entry: __dirname + '/demo6/src/index.js',
	output:{
		path:__dirname + '/demo6/dist',
		filename: 'bundle-[hash].js'
	},
	devServer: {
		contentBase: "/demo6/dist",
		port:"8090",
		inline:true
	},
	module :{
		rules:[
			{
				test: /\.css$/,
				loader: "style-loader!css-loader"
			}
		]
	},
	plugins: [
		new webpack.BannerPlugin('This is webpack demo'),
		new HtmlWebpackPlugin({
			title: 'Harry demo',
			template: __dirname + "/index.temp.html"
		}),
		new webpack.optimize.UglifyJsPlugin()
	]
}