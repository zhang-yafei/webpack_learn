module.exports = {
	devtool: 'source-map',
	entry: __dirname + '/demo6/src/index.js',
	output:{
		path:__dirname + '/demo6/public',
		filename: 'bundle.js'
	},
	devServer: {
		contentBase: "./demo6/public",
		port:"8090",
		inline:true,
		historyApiFallback:true
	},
	module :{
		rules:[
			{
				test: /\.css$/,
				use: [
					{
                       loader: "style-loader",
					},
					{
						loader: "css-loader",
					}
				]
			}
		]
	}
}