const path = require('path');
const rules = require('require.all')('../../webpack/rules');
const plugins = require('require.all')('../../webpack/plugins');

module.exports = (env, options) => {
	const modes = {
		development: 'development',
		production: 'production',
	};

	const environment = modes[options.mode] || modes.development;

	rules((name, rule) => rule(environment));
	plugins((name, plugin) => plugin(environment));

	return {
		mode: environment,
		entry: {
			app: path.resolve(__dirname, 'src/index.tsx'),
		},
		output: {
			path: path.join(__dirname, 'dist'),
			filename: '[name].js',
			clean: true,
			assetModuleFilename: '[name].[contenthash:8][ext]',
		},
		module: {
			rules: [rules.scripts, rules.styles],
		},
		plugins: [plugins.html, plugins.extract],
		devServer: {
			open: true,
			port: 4000,
			https: false,
			hot: true,
			historyApiFallback: true,
			proxy: {
				'/socket.io': {
					target: 'http://0.0.0.0:3000',
				},
			},
		},
		watchOptions: {
			poll: 1000,
		},
		resolve: {
			extensions: ['.tsx', '.ts', '.js', '.jsx'],
		},
	};
};
