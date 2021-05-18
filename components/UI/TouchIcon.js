import React, { useReducer, useEffect, useState, useCallback } from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import Touch from './Touch';

const TouchIcon = ({
	disabled,
	useIos,
	useIosIcon,
	onTouch,
	touched,
	toggleIcons,
	size,
	bigBg,
	largeBg,
	name,
	color,
	style,
	bgColor,
	borderColor,
	elevated,
	activeOpacity,
}) => {
	//const [icon, setIcon] = useState(Platform.OS === 'android' ? `md-${toggleIcons[0]}` : `ios-${toggleIcons[0]}`);

	// const changeIconHandler = () => {
	//   setIcon(prev =>
	//     (icon === `md-${toggleIcons[0]}`) || (prev === `ios-${toggleIcons[0]}`) ?
	//       Platform.OS === 'android' ? `md-${toggleIcons[1]}` : `ios-${toggleIcons[1]}` :
	//       Platform.OS === 'android' ? `md-${toggleIcons[0]}` : `ios-${toggleIcons[0]}`

	//   );
	//   onTouch();
	// }
	const elevateStyle = elevated
		? {
				shadowColor: 'black',
				shadowRadius: 8,
				shadowOffset: { width: 0, height: 2 },
				shadowOpacity: 0.26,
				elevation: 5,
		  }
		: {};

	return (
		<View
			style={
				({
					borderRadius: size + 20,
					borderColor: borderColor,
					borderWidth: borderColor ? 1 : 0,
					backgroundColor: bgColor ? bgColor : 'transparent',
				},
				[(styles.container, style, elevateStyle)])
			}>
			<Touch
				disabled={disabled}
				onTouch={onTouch} //{changeIconHandler}
				useIos={useIos}
				activeOpacity={activeOpacity}
				style={{
					width: largeBg ? size + 30 : bigBg ? size + 20 : size + 10,
					height: largeBg ? size + 30 : bigBg ? size + 20 : size + 10,
					alignItems: 'center',
					justifyContent: 'center',
				}}>
				<Ionicons
					name={
						//icon
						toggleIcons
							? touched()
								? Platform.OS === 'android'
									? `md-${toggleIcons[1]}`
									: `ios-${toggleIcons[1]}`
								: Platform.OS === 'android'
								? `md-${toggleIcons[0]}`
								: `ios-${toggleIcons[0]}` //initial state
							: !useIosIcon && Platform.OS === 'android'
							? `md-${name}`
							: !useIosIcon && Platform.OS === 'web'
							? `md-${name}`
							: `ios-${name}`
					}
					size={size}
					color={color}
				/>
			</Touch>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		overflow: 'hidden',
		alignSelf: 'center', //remove or check this if positioning problem show up
	},
});

export default TouchIcon;
