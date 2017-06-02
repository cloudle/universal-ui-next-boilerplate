/* eslint no-param-reassign: "off" */

module.exports = {
	webpack: (config, { dev }) => {
		config.resolve.alias = { // es-lint disable
			'react-native': 'react-native-web',
		};

		/* TODO: Working on react-native-vector-icons package for traditional WEB! */
		// config.module.rules = [...config.module.rules, {
		// 	test: /\.ttf$/,
		// 	loader: 'url-loader', // or directly file-loader
		// 	include: path.resolve(__dirname, 'node_modules/react-native-vector-icons'),
		// }];

		return config;
	}
};