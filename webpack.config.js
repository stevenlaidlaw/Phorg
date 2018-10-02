const path = require('path');

module.exports = {
	entry: ['babel-polyfill', './src/index.js'],
	target: 'electron-main',
	output: {
		path: path.resolve('dist'),
		filename: 'bundle.js'
	},
	module: {
		rules: [{
				test: /\.js$/,
				use: 'babel-loader'
			}, {
				test: /\.css$/,
				loader: 'style-loader'
			}, {
				test: /\.css$/,
				loader: 'css-loader',
				query: {
					modules: true,
					localIdentName: '[name]__[local]___[hash:base64:5]'
				}
			}
		]
	}
};