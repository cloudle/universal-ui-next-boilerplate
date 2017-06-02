import React, { Component } from 'react';
import withRedux from 'next-redux-wrapper';
import { View, Text, StyleSheet } from 'react-native';
import Link from 'next/link';

import store from '../store';

type Props = {
	dispatch?: Function,
	counter?: number,
};

@withRedux(store, ({ app }) => {
	return {
		counter: app.counter,
	};
})

export default class AboutPage extends Component {
	props: Props;

	render() {
		return <View style={styles.container}>
			<Text style={{ fontSize: 30, marginBottom: 10, }}>About {this.props.counter}</Text>
			<Link href="/"><a>Back</a></Link>
		</View>;
	}
}

const styles = StyleSheet.create({
	container: {
		position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
		justifyContent: 'center', alignItems: 'center',
	},
});