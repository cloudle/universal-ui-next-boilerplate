import React, { Component } from 'react';
import withRedux from 'next-redux-wrapper';
import { TouchableOpacity, View, Image, Text, StyleSheet, } from 'react-native';
import { Button, Input } from 'react-universal-ui';
import Link from 'next/link';

import store from '../store';
import * as appActions from '../store/action/app';

type Props = {
	dispatch?: Function,
	counter?: number,
};

@withRedux(store, ({ app }) => {
	return {
		counter: app.counter,
	};
})

export default class IndexPage extends Component {
	props: Props;

	render() {
		return <View style={styles.container}>
			<Text>Hello world! {this.props.counter}</Text>
			<Button
				wrapperStyle={{ marginTop: 5, marginBottom: 10, }}
				title="Increase"
				onPress={() => this.props.dispatch(appActions.increaseCounter())}/>

			<Link href="counter"><a>Goto Counter Page</a></Link>
		</View>;
	}
}

const styles = StyleSheet.create({
	container: {
		position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
		justifyContent: 'center', alignItems: 'center',
	},
});