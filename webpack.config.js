const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require("path");

const config = {
	entry: {
		app:   ["./src/javascripts/App.js"],
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loaders: ["babel"],
			},
			{
				test: /\.json$/,
				loaders: ["json"]
			},
			{
				test: /\.css$/,
				loader: ExtractTextPlugin.extract("style", "css")
			},
			{
				test: /\.scss$/,
				loader: ExtractTextPlugin.extract("style", "css!sass")
			},
			{
				test: /\.(jpg)|(png)|(woff)|(eot)|(ttf)|(svg)$/,
				loader: "file"
			},
			{
				test: /\.(html)$/,
				loader: "file?name=[name].[ext]"
			}
		]
	},
	node: {
		console: true,
		fs: "empty",
		net: "empty",
		tls: "empty"
	},
	output: {
		filename: "[name].js",
		path: path.join(__dirname, "./build"),
		publicPath: "",
	},
	plugins: [
		new ExtractTextPlugin("[name].css"),
	],
	resolve: {
		extensions: ["", ".js", ".scss"],
		modulesDirectories: ["src", "node_modules"],
	},
};

module.exports = config;
