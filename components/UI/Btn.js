import React from 'react';
import {
  StyleSheet,
  View,
  Button,
  Text,
  TouchableOpacity,
  TouchableNativeFeedback,
  Dimensions,
  Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Colors from '../../constants/Colors';


const Btn = ({
	type,
	onPress,
	disabled,
	style,
	children,
	bgColor,
	textColor,
	borderColor,
	icon,
	innerStyle,
	fontSize,
}) => {
	let BtnComponent = TouchableOpacity;

	if (Platform.Version >= 21) {
		BtnComponent = TouchableNativeFeedback;
	}

	let btnColor = !disabled ? Colors.primary : Colors.primary + '77';
	switch (type) {
		case 'accent':
			btnColor = !disabled ? Colors.accent : Colors.accent + '77';
			break;
		case 'accent2':
			btnColor = !disabled ? Colors.accent2 : Colors.accent2 + '77';
			break;
	}

	return (
		<View
			style={{
				...styles.touchable,
				backgroundColor: bgColor ? (!disabled ? bgColor : bgColor + '77') : btnColor,
				borderColor: bgColor === 'white' ? Colors.primary : borderColor ? borderColor : 'transparent',
				borderWidth: borderColor || bgColor === 'white' || bgColor == '#fff' || bgColor === '#ffffff' ? 1 : 0,
				width: 'auto',
				...style,
			}}>
			<BtnComponent onPress={onPress} activeOpacity={0.7} disabled={disabled}>
				<View
					style={{
						...styles.button,
						...innerStyle,
						borderRadius: style && style.borderRadius ? style.borderRadius : styles.button.borderRadius,
					}}>
					<Text
						style={{
							...styles.btnText,
							fontSize: fontSize ? fontSize : 13,
							color: textColor
								? textColor
								: bgColor === 'white' || bgColor === '#fff' || bgColor === '#ffffff'
								? Colors.primary
								: styles.btnText.color,
						}}>
						{children}
					</Text>
					{icon && (
						<View style={{ marginLeft: 10 }}>
							<Ionicons
								name={Platform.OS === 'android' ? `md-${icon.iconName}` : `ios-${icon.iconName}`}
								size={23}
								color={
									textColor
										? textColor
										: bgColor === 'white' || bgColor === '#fff' || bgColor === '#ffffff'
										? Colors.primary
										: styles.btnText.color
								}
							/>
						</View>
					)}
				</View>
			</BtnComponent>
		</View>
	);
};

const styles = StyleSheet.create({
  touchable: {
    borderRadius: 25,
		overflow: 'hidden',
    // justifyContent: 'center',
		// alignItems: 'center',
		//margin: 'auto'
		
  },

  button: {
		// maxWidth: 150,
   // width: '100%',//i changed this 09-12-2020
    minWidth: 80,
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 25,
    justifyContent: 'space-evenly',
    alignItems: 'center',
		flexDirection: 'row',
  },

  btnText: {
    color: 'white',
    fontFamily: 'OpenSansBold',
    textAlign: 'center'
  }

});

export default Btn;
