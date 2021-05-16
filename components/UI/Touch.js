import React from 'react';
import { StyleSheet, View, TouchableOpacity, Platform, TouchableNativeFeedback } from 'react-native';

const Touch = ({ disabled, onTouch, onLongTouch, children, style, useIos, activeOpacity, ...otherProps }) => {
	let TouchableCmp = TouchableOpacity;

	if (Platform.OS === 'android' && Platform.Version >= 21 && !!useIos !== true) {
		TouchableCmp = TouchableNativeFeedback;
	}
	return (
		<View {...otherProps} style={styles.container}>
			<TouchableCmp
				disabled={disabled}
				activeOpacity={activeOpacity ? activeOpacity : 0.4}
				style={{ ...styles.touchable }}
				onLongPress={onLongTouch}
				onPress={onTouch}>
				<View style={{ ...styles.children, ...style }}>{children}</View>
			</TouchableCmp>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {},
	touchable: {
		flex: 1,
		width: '100%',
		height: '100%',
	},
	children: {
		alignItems: 'center',
		justifyContent: 'center',
		//width: 'auto',
	},
});

export default Touch;
