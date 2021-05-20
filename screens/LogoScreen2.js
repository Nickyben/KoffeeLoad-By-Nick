import React, { useEffect } from 'react';
import { View, ActivityIndicator, AsyncStorage, StyleSheet, Image, Dimensions } from 'react-native';

import { useDispatch } from 'react-redux';
import * as authActions from '../store/actions/authAction';

import Colors from '../constants/Colors';

const LogoScreen2 = (props) => {
	const { width } = Dimensions.get('window');
	return (
		<View style={styles.screen}>
			<View
				style={{
					width: width,
					height: width,
					maxWidth: 500,
					maxHeight: 500,
					alignSelf: 'center',
					alignItems: 'center',
					justifyContent: 'center',
				}}>
				<Image
					source={require('../assets/logo11.png')}
					style={{ width: width, height: width, maxWidth: 500, maxHeight: 500 }}
				/>
			</View>
		</View>
	);
};

export const screenOptions = (navData) => {};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		padding: 50,
		backgroundColor: Colors.primary,
		justifyContent: 'center'
	},
});

export default LogoScreen2;
