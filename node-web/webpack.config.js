'use strict';

const webpack = require('webpack');
const path = require('path');

let externals = _externals();

module.exports = {
	entry: {
		// config: path.resolve(__dirname, './config'),
		app: path.resolve(__dirname, './src/app.js')
	},
	target: 'node',
	output: {
		// publicPath: "/config/", //配合devServer本地Server
		filename: '[name].bundle.js?v=[hash]', //出口文件名
		path: path.resolve(__dirname, './dist/'), //打包路径
	},
	resolve: {
		extensions: ['.js']
	},
	externals: externals,
	node: {
		console: true,
		global: true,
		process: true,
		Buffer: true,
		__filename: true,
		__dirname: true,
		setImmediate: true
	},
	module: {
		loaders: [{
			test: /\.js$/,
			loader: 'babel-loader',
			query: {
				presets: ['es2015', 'stage-0']
			},
			exclude: /node_modules/
		}]
	},
	plugins: [
		new webpack.optimize.UglifyJsPlugin()
	]
};

function _externals() {
	let manifest = require('./package.json');
	let dependencies = manifest.dependencies;
	let externals = {};
	for (let p in dependencies) {
		externals[p] = 'commonjs ' + p;
	}
	return externals;
}