const path = require("path");
const webpack = require("webpack");
const dev = process.NODE_ENV !== "production";

module.exports = {
	entry: [
		// "babel-polyfill",
		"./src/scripts/app.js"
	],
	output: {
		path: path.join(__dirname, "build"),
		filename: "bundle.js"
	},
	plugins: [
		new webpack.optimize.OccurenceOrderPlugin()
	],
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
			}
		]
	},
	devtool: "source-map",
	watch: dev
};