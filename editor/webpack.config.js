const path = require("path");
const webpack = require("webpack");
const dev = process.env.NODE_ENV !== "production";
const LiveReloadPlugin = require('webpack-livereload-plugin');

let plugins = [
	new webpack.optimize.OccurenceOrderPlugin()
];


if(dev){
	plugins.push( new LiveReloadPlugin({
		appendScriptTag: true
	}));
}


module.exports = {
	entry: [
		// "babel-polyfill",
		"./src/scripts/app.js"
	],
	output: {
		path: path.join(__dirname, "dist"),
		filename: "bundle.js",
		publicPath: path.join(__dirname, "assets")
	},
	plugins,
	module: {
		loaders: [
			// {
			// 	test: /\.js$/,
			// 	include: path.join(__dirname, 'src/scripts'),
			// 	loader: 'babel-loader',
			// 	query: {
			// 		presets: ['es2015']
			// 	}
			// },
			// {
			// 	test: /\.css$/,
			// 	loader: "style-loader!css-loader"
			// },
			{
				include: [
					path.resolve(__dirname, "src/styles")
				],
				test: /\.scss$/,
				loaders: ["style", "css", "sass"]
			},
			{
				include: [
					path.resolve(__dirname, "src")
				],
				test: /\.json$/,
				loader: "json"
			},
			{
				exclude: [
					path.resolve(__dirname, "node_modules")
				],
				test: /\.woff$/,
				loader: "url"
			}
		]
	},
	devtool: "source-map",
	watch: dev
};