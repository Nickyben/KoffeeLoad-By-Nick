//import Icon from 'react-native-vector-icons/FontAwesome';
//import { Input as RNElemInput } from 'react-native-elements';
import React, { useEffect, useReducer, useState, useCallback } from 'react';
import { TextInput, Text, View, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Colors from '../../constants/Colors';
import ItemIcon from './ItemIcon';
import DropdownPicker from './DropdownPicker';
import { toTitleCase } from '../../constants/MyFunctions';

const INPUT_FOCUS = 'INPUT_FOCUS';
const INPUT_CHANGE = 'INPUT_CHANGE';
const INPUT_BLUR = 'INPUT_BLUR';
const INPUT_SUBMIT = 'INPUT_SUBMIT';

const inputReducer = (state, action) => {
	switch (action.type) {
		case INPUT_FOCUS:
			return {
				...state,
				gainedFocus: true,
				lostFocus: false,
				//alignText: 'justify'
			};

		case INPUT_CHANGE:
			return {
				...state,
				value: action.value,
				validity: action.validity,
				lostFocus: false,
				hasFocus: true, //action.hasFocus,//isTouched: action.isTouched
				// alignText: 'justify',
			};

		case INPUT_BLUR:
			return {
				...state,
				hasFocus: false,
				gainedFocus: false,
				lostFocus: true,
				//alignText: state.value.length > 0 ? 'center' : 'justify',
			};
		case INPUT_SUBMIT: {
			return {
				...state,
				value: '',
				validity: false,
			};
		}
		default:
			return state;
	}
	return state;
};

const Input = ({
	id,
	initialValue,
	initialValidity,
	onInputChange,
	required,
	email,
	password,
	phoneNumber,
	min,
	max,
	textType,
	inputType,
	minLength,
	maxLength,
	expandHeight,
	style,
	inputContainerStyle,
	inputStyle,
	label,
	hideLabel,
	errorMsg,
	successMsg,
	textInputProps,
	submitted,
	submitAction,
	secureText,
	formState,
	singleInput,
	rectInput,
	clear,
	newValue,
	onTextChanged,
	hideIcon,
	icon,
	touchableIcon,
	floatingLabel,
	hideFloatingLabel,
	placeholder,
	showErrorMsg,
	formHasError,
	...others
}) => {
	// const { id, initialValue, initialValidity, onInputChange, required, email, password, phoneNumber,
	//   min, max, textType, minLength, maxLength, style, inputContainerStyle, inputStyle, label, hideLabel,
	//    errorMsg, successMsg, textInputProps,
	//   secureText, formState, singleInput, rectInput,
	//   hideIcon, icon, touchableIcon, floatingLabel, hideFloatingLabel, placeholder, showErrorMsg,
	// } = props;

	const props = {
		id,
		initialValue,
		initialValidity,
		onInputChange,
		required,
		email,
		password,
		phoneNumber,
		min,
		max,
		textType,
		inputType,
		minLength,
		maxLength,
		expandHeight,
		style,
		inputContainerStyle,
		inputStyle,
		label,
		hideLabel,
		errorMsg,
		successMsg,
		textInputProps,
		submitted,
		submitAction,
		secureText,
		formState,
		singleInput,
		rectInput,
		clear,
		newValue,
		onTextChanged,
		hideIcon,
		icon,
		touchableIcon,
		floatingLabel,
		hideFloatingLabel,
		placeholder,
		showErrorMsg,
		formHasError,
		...others,
	};

	const [inputState, dispatchAction] = useReducer(inputReducer, {
		value: initialValue ? initialValue : '',
		validity: initialValidity ? initialValidity : false,
		hasFocus: false,
		lostFocus: false,
		gainedFocus: false,
		// alignText: 'justify'
	});

	const [showPassword, setShowPassword] = useState(false);

	const ValidityResponse = () => {
		return (
			<>
				{showErrorMsg !== false && (
					<>
						{((!inputState.validity && inputState.hasFocus && inputState.value.length > 2) ||
							(formHasError && !inputState.validity)) && (
							<View style={styles.errorMsgWrap}>
								<Text style={styles.errorMsg}>{errorMsg ? errorMsg : 'Invalid field'}</Text>
							</View>
						)}
						{inputState.validity && inputState.hasFocus && inputState.value.length > 2 && (
							<View style={styles.errorMsgWrap}>
								<Text style={styles.successMsg}>{successMsg ? successMsg : 'Valid input'}</Text>
							</View>
						)}
					</>
				)}
			</>
		);
	};

	const toggleShowPassword = () => {
		setShowPassword((p) => !p);
	};

	const textChangeHandler = (text) => {
		if (typeof text !== 'string') {
			const arr = text;
			let isValid = true;
			if (required && arr.length === 0) {
				isValid = false;
			}

			dispatchAction({ type: INPUT_CHANGE, value: text, validity: isValid, hasFocus: true });
			return;
		}

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

		dispatchAction({ type: INPUT_CHANGE, value: text, validity: isValid, hasFocus: true });
		onTextChanged && onTextChanged(text);
	};

	const lostFocusHandler = useCallback(() => {
		dispatchAction({ type: INPUT_BLUR });
	}, []);

	const gainedFocusHandler = useCallback(() => {
		dispatchAction({ type: INPUT_FOCUS });
	}, []);

	useEffect(() => {
		if (inputState.hasFocus || inputState.gainedFocus || inputState.lostFocus || initialValidity === true) {
			onInputChange &&
				onInputChange(id, inputState.value, inputState.validity, inputState.gainedFocus, inputState.lostFocus);
		}
	}, [inputState, onInputChange, id, initialValidity]);

	useEffect(() => {
		if (submitted) {
			dispatchAction({ type: INPUT_SUBMIT });
		}
	}, [submitted]);

	if (inputType === 'dropdown') {
		return (
			<>
				<DropdownPicker
					{...props}
					pickerLabel={label}
					pickerHeader={toTitleCase(label)}
					onChooseOption={textChangeHandler}
					onBlur={lostFocusHandler}
					onFocus={gainedFocusHandler}
					hasFocus={inputState.gainedFocus}
					placeholder={placeholder ? placeholder : 'placeholder'}
					style={style}
					value={newValue}
				/>
				<ValidityResponse />
			</>
		);
	}

	return (
		//REMINDER: Edit inputs are not working properly when you submit with first input Empty
		<View
			style={[
				styles.formControl,
				style,
				{ paddingTop: floatingLabel ? 5 : 0, marginBottom: singleInput ? 0 : styles.formControl.marginBottom },
			]}>
			{!hideLabel && !(inputState.value.length > 0 && inputState.hasFocus && true) && (
				<Text style={styles.label}>{label ? label : 'Input Label'}</Text>
			)}
			{inputState.value.length > 0 && inputState.hasFocus && !hideFloatingLabel && (
				<Text style={[styles.floatingLabel]}>
					{floatingLabel ? floatingLabel : placeholder ? placeholder : 'Placeholder'}
				</Text>
			)}

			<View
				style={[
					styles.inputContainer,
					{
						borderBottomColor: inputState.gainedFocus ? Colors.primary : '#bbb',
						padding: rectInput ? 5 : styles.inputContainer.padding,
						borderWidth: rectInput ? 1.5 : 0,
					},
					inputContainerStyle,
				]}>
				{!hideIcon && (
					<View style={{ marginLeft: rectInput ? 0 : 10 }}>
						<ItemIcon
							onTouch={icon && icon.touchable && icon.onTouch}
							bgColor={(icon && icon.bgColor) || Colors.primary + '22'}
							name={icon ? icon.iconName : 'clipboard'}
							borderRadius={icon && icon.bgBorderRadius}
							size={23}
							color={icon && icon.iconColor ? icon.iconColor : Colors.primary}
						/>
					</View>
				)}
				<TextInput
					{...props}
					maxLength={maxLength}
					keyboardType={email ? 'email-address' : phoneNumber ? 'phone-pad' : 'default'}
					secureTextEntry={!!password && !showPassword}
					placeholder={placeholder ? placeholder : 'placeholder'}
					style={[
						styles.input,
						inputStyle,
						{ maxHeight: !others.multiline ? 50 : expandHeight ? expandHeight : 200, minHeight: 50 },
					]}
					value={newValue}
					onChangeText={textChangeHandler}
					onBlur={lostFocusHandler}
					onFocus={gainedFocusHandler}
				/>
				{password && (
					<ItemIcon
						onTouch={toggleShowPassword}
						bgColor={'transparent'}
						name={showPassword ? 'eye-off' : 'eye'}
						size={23}
						color={icon && icon.iconColor ? icon.iconColor : Colors.primary}
					/>
				)}
			</View>
			<ValidityResponse />
		</View>
	);
};

const styles = StyleSheet.create({
	formControl: {
		width: '100%',
		marginBottom: 10,
	},
	label: {
		marginTop: 10,
		marginBottom: 7,
		// paddingHorizontal: 10,
		paddingHorizontal: 0,
		fontSize: 17,
		fontFamily: 'OpenSansBold',
		color: '#555',
	},

	floatingLabel: {
		color: '#ccc',
		paddingHorizontal: 10,
		fontFamily: 'OpenSansBold',
		fontSize: 17,
		marginTop: 10,
		marginBottom: 7,
	},
	inputContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		width: '100%',
		borderColor: '#bbb',
		borderBottomWidth: 1.5,
		borderRadius: 10,
	},
	input: {
		// alignSelf: 'center',
		//width: '100%',
		flex: 1,
		paddingHorizontal: 10,
		paddingVertical: 5,
		//backgroundColor: 'yellow',

		fontFamily: 'OpenSansRegular',
		fontSize: 18,
	},

	errorMsgWrap: {
		marginTop: 5,
	},
	errorMsg: {
		textAlign: 'center',
		color: '#ff3333',
		padding: 5,
		//paddingBottom:0,
		fontFamily: 'OpenSansRegular',
	},
	successMsg: {
		textAlign: 'center',
		color: '#11ee22',
		padding: 5,
		fontFamily: 'OpenSansRegular',
	},
});

export default Input;
