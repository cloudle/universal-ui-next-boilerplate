import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
import { AppRegistry } from 'react-native';

export default class MyDocument extends Document {
	static getInitialProps({ renderPage }) {
		AppRegistry.registerComponent('Main', () => Main);
		const { stylesheets } = AppRegistry.getApplication('Main');
		const { html, head, errorHtml, chunks } = renderPage();

		return { html, styles: stylesheets, head, errorHtml, chunks };
	}

	componentDidMount() {

	}

	render() {
		return <html>
			<Head>
				<meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
				<meta name="format-detection" content="telephone=no"/>
				<meta name="msapplication-tap-highlight" content="no"/>
			</Head>

			<body>
				<Main/>
				<NextScript/>
			</body>
		</html>;
	}
}