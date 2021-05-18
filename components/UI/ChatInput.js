import React, { useState, useCallback, useEffect, useReducer } from 'react';
import { TextInput, Text, View, StyleSheet, Platform, SafeAreaView } from 'react-native';
import { useDispatch } from 'react-redux';

import Colors from '../../constants/Colors';
import Input from './Input';
import TouchIcon from './TouchIcon';
import ItemIcon from './ItemIcon';

const ChatInput = ({
	inputIcon,
	hideIcon,
	placeholder,
	email,
	phoneNumber,
	required,
	min,
	max,
	minLength,
	maxLength,
	password,
	onSubmit,
	onInputChange,
	defaultPosition,
	expandHeight,
	elevated,
	style,
	inputStyle,
	iconLeftName,
	onLeftIconPress,
	iconRightName,
	hideRightIcon,
	leftIconBgColor,
	leftIconBgBorderRadius,
	...others
}) => {
	const [chatInputState, setChatInputState] = useState({ value: '', validity: false });

	const textChangeHandler = (text) => {
		//console.log(text);
		const emailRegex =
			/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		const emailText = text.toLowerCase();

		const phoneNumberRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
		let isValid = true;

		//for requirements
		if (required && text.trim().length === 0) {
			isValid = false;
		}

		//for email
		if (email && !emailRegex.test(emailText)) {
			isValid = false;
		}

		//for passwords
		if (password && (text.length < 7 || (minLength != null && text.length < minLength))) {
			isValid = false;
		}

		if (phoneNumber && !phoneNumberRegex.test(text)) {
			isValid = false;
		}

		//for numerical data
		if (min != null && +text < min) {
			isValid = false;
		}
		if (max != null && +text > max) {
			isValid = false;
		}

		//for strings
		if (minLength != null && text.length < minLength) {
			isValid = false;
		}
		if (maxLength != null && text.length > maxLength) {
			isValid = false;
		}

		onInputChange && onInputChange(text);
		setChatInputState((p) => ({ value: text, validity: isValid }));
	};

	const lostFocusHandler = () => {};

	const gainedFocusHandler = () => {};

	const msgPushHandler = () => {
		onSubmit(chatInputState.value, () => setChatInputState((p) => ({ value: '', validity: false })));
	};

	const elevateStyle = elevated
		? {
				shadowColor: 'black',
				shadowRadius: 8,
				shadowOffset: { width: 0, height: 2 },
				shadowOpacity: 0.26,
				elevation: 10,
		  }
		: {};

	const icon = inputIcon
		? inputIcon
		: {
				iconName: iconLeftName || 'images',
				touchable: true,
				onTouch: (onLeftIconPress && onLeftIconPress.bind(this, chatInputState.value)) || (() => {}),
				bgColor: leftIconBgColor,
				bgBorderRadius: leftIconBgBorderRadius,
		  };

		
	return (
		<SafeAreaView
			style={
				({
					position: defaultPosition ? 'relative' : 'absolute',
					bottom: defaultPosition ? 'auto' : 0,
				},
				[styles.typingContainer, elevateStyle, style])
			}>
			{}
			<View style={styles.formControl}>
				<View style={{ paddingBottom: 0 }, [styles.inputContainer,styles.inputContainerStyle]}>
					{!hideIcon && (
						<View style={{ marginLeft: 10,  }}>
							<ItemIcon
								onTouch={icon && icon.touchable && icon.onTouch}
								bgColor={icon.bgColor || Colors.primary + '22'}
								name={icon ? icon.iconName : 'clipboard'}
								borderRadius={icon && icon.bgBorderRadius}
								size={23}
								color={icon && icon.iconColor ? icon.iconColor : Colors.primary}
							/>
						</View>
					)}

					<TextInput
						{...others}
						keyboardType={email ? 'email-address' : phoneNumber ? 'phone-pad' : 'default'}
						secureTextEntry={!!password}
						placeholder={placeholder ? placeholder : 'Start typing message'}
						style={
							(
							{
								maxHeight: !others.multiline ? 70 : expandHeight ? expandHeight : 200,
								minHeight: 70,
							},[styles.input, inputStyle])
						}
						value={chatInputState.value}
						maxLength={maxLength}
						onChangeText={textChangeHandler}
						onBlur={lostFocusHandler}
						onFocus={gainedFocusHandler}
						onEndEditing={
							(onLeftIconPress && onLeftIconPress.bind(this, chatInputState.value)) || (() => {})
						}
					/>
				</View>
			</View>

			{!hideRightIcon && (
				<View style={styles.submitMsgAction}>
					<TouchIcon
						onTouch={msgPushHandler}
						bgColor={Colors.primary + '22'}
						borderColor={Colors.primary}
						bigBg
						name={iconRightName || 'send'}
						size={22}
						color={Colors.primary}
					/>
				</View>
			)}
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	typingContainer: {
		alignSelf: 'flex-end',
		//backgroundColor: 'white',
		//height: 60,
		width: '100%',
		//	position: 'absolute',
		//	bottom: 0,
		justifyContent: 'space-between',
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: 7,
		padding: 10,
		//	backgroundColor: 'blue',

		//borderTopWidth: 1,
		borderTopColor: '#ddd', //Colors.primary + '77',
	},

	formControl: {
		//	backgroundColor: 'yellow',
		flex: 1,
		//width: '89%',

		width: '100%',
		//height: '100%',
	},
	inputContainer: {
		backgroundColor: '#fff',
		//backgroundColor: 'red',
		flexDirection: 'row',
		alignItems: 'center',
		borderBottomColor: '#bbb',
		borderRadius: 10,
		overflow: 'hidden',
		borderBottomWidth: 0,
		//	height: '100%',
	},
	inputContainerStyle: {},
	input: {
		flex: 1,
		width: '100%',
		height: '100%',
		paddingHorizontal: 10,
		fontFamily: 'OpenSansRegular',
		fontSize: 12,
		lineHeight: 20,
		color:Colors.primary
	},
	submitMsgAction: {
		width: '10%',
		height: '100%',
		borderRadius: 1000,
		// backgroundColor: Colors.primary,
		justifyContent: 'center',
		alignItems: 'center',
	},
});

export default ChatInput;
