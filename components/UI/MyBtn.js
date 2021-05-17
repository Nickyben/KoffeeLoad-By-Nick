import React from 'react';
import {
	StyleSheet,
	View,
	Button,
	Text,
	TouchableOpacity,
	TouchableNativeFeedback,
	Dimensions,
	Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Colors from '../../constants/Colors';
import Touch from './Touch';

const MyBtn = ({
	type,
	title,
	onPress,
	disabled,
	style,
	children,
	bgColor,
	textColor,
  horizPadding,
  padding,
	borderColor,
	icon,
  fontFamily,
	innerStyle,
	fontSize,
}) => {
	return (
		<Touch
			style={{
				backgroundColor: bgColor ? bgColor : 'white',
				padding:padding?padding: 10,
				borderRadius: 5,
				paddingHorizontal: horizPadding ? horizPadding : 20,
			}}>
			<Text
				style={{
					fontFamily:fontFamily?fontFamily :'OpenSansBold',
					fontSize: fontSize ? fontSize : 14,
					color: textColor ? textColor : '#222',
				}}>
				{title}
			</Text>
		</Touch>
	);
};

const styles = StyleSheet.create({});

export default MyBtn;
