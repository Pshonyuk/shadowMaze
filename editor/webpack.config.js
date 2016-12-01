const path = require("path");
const webpack = require("webpack");
const dev = process.env.NODE_ENV !== "production";
const LiveReloadPlugin = require("webpack-livereload-plugin");

let plugins = [
	new webpack.optimize.OccurenceOrderPlugin()
];


if(dev){
	plugins.push(new LiveReloadPlugin({
		appendScriptTag: true
	}));
}


module.exports = {
	entry: [
		// "babel-polyfill",
		"./app/src/scripts/app.js"
	],
	output: {
		path: path.join(__dirname, "./app/dist/"),
		filename: "bundle.js",
		publicPath: path.join(__dirname, "assets")
	},
	plugins,
	module: {
		loaders: [
			// {
			// 	test: /\.js$/,
			// 	include: path.join(__dirname, "src/scripts"),
			// 	loader: "babel-loader",
			// 	query: {
			// 		presets: ["es2015"]
			// 	}
			// },
			// {
			// 	test: /\.css$/,
			// 	loader: "style-loader!css-loader"
			// },
			{
				include: [
					path.resolve(__dirname, "./app/src/styles")
				],
				test: /\.scss$/,
				loaders: ["style", "css", "sass"]
			},
			{
				include: [
					path.resolve(__dirname, "./app/src")
				],
				test: /\.json$/,
				loader: "json"
			},
			{
				include: [
					path.resolve(__dirname, "./app/assets")
				],
				test: /\.woff$/,
				loader: "url"
			}
		]
	},
	devtool: "source-map",
	watch: dev
};