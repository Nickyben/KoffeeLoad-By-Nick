import React, { useState, useEffect, useReducer, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import {
	View,
	Text,
	ScrollView,
	StyleSheet,
	KeyboardAvoidingView,
	ActivityIndicator,
	Button,
	Alert,
	Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import Input from '../../components/UI/Input';
import Card from '../../components/UI/Card';
import Colors from '../../constants/Colors';
import * as authActions from '../../store/actions/authAction';
import MyBtn from '../../components/UI/MyBtn';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

//you can choose to out source this to a separate file since its used in more than one screen
const formReducer = (state, action) => {
	//the state is initially the initial state passed to 2nd arg of useReducer
	if (action.type === FORM_INPUT_UPDATE) {
		const updatedInputValues = {
			...state.inputValues,
			[action.input]: action.value, //replacing the key(the input's name)  and value in inputValues Obj with the new text from action.value
		};
		const updatedInputValidities = {
			...state.inputValidities,
			[action.input]: action.isValid, //replacing the key(the input's name)  and value in inputValidities Obj with the new text from action.value
		};
		let updatedFormValidity = true;
		for (const key in updatedInputValidities) {
			//GOOD PRACTICE! : once the updatedFormValidity is false for any,
			// it remains false even if any other inputValidity is true, because the false will override in the AND logic
			updatedFormValidity = updatedFormValidity && updatedInputValidities[key];
		}
		//console.log(updatedInputValues);
		//console.log(updatedInputValidities);
		//console.log(updatedFormValidity);

		return {
			//...state, //unnecessary
			inputValues: updatedInputValues,
			inputValidities: updatedInputValidities,
			formValidity: updatedFormValidity,
		};
	}
	return state;
};
const AuthScreen = (props) => {
	const [isSignup, setIsSignup] = useState(false);
	const [error, setError] = useState();
	const [isLoading, setIsLoading] = useState(false);
	const dispatch = useDispatch();

	const [formState, dispatchFormState] = useReducer(formReducer, {
		//recommended instead of mgt of all text states and validity individually with useState() hook
		//initial State
		inputValues: {
			authEmail: '',
			authPassword: '',
		},
		//initial validity
		inputValidities: {
			authEmail: false,
			authPassword: false,
		},
		//initial general form validity
		formValidity: false,
	});

	const authHandler = async () => {
		let action;
		if (isSignup) {
			action = authActions.signup(
				formState.inputValues.signupEmail,
				formState.inputValues.signupPassword,
				formState.inputValues.signConfirmPassword
			);
		} else {
			//alert(formState.inputValues.loginEmail + ' ' + formState.inputValues.loginPassword);

			action = authActions.login(formState.inputValues.loginEmail, formState.inputValues.loginPassword);
		}
		setError(null);
		setIsLoading(true);
		try {
			await dispatch(action);
		} catch (err) {
		//	alert(err.message)
			setError(err.message);
			setIsLoading(false);
		}
	};

	const inputChangeHandler = useCallback(
		(inputName, inputValue, inputValidity) => {
			// console.log(inputName);
			// console.log(inputValue);
			// console.log(inputValidity);

			dispatchFormState(
				//almost just like dispatching in redux
				//action
				{
					type: FORM_INPUT_UPDATE,
					value: inputValue,
					isValid: inputValidity,
					input: inputName,
				}
			);
		},
		[dispatchFormState]
	);
	const loginFormItems = [
		{
			id: 'loginEmail',
			label: 'Email',
			placeholder: ' ',
			email: true,
			keyboardType: 'default',
			required: true,
			errorMsg: 'Please enter a valid email address',
		},
		{
			id: 'loginPassword',
			label: 'Password',
			placeholder: ' ',
			password: true,
			keyboardType: 'password',
			required: true,
			errorMsg: 'Password must be at least 7 characters.',
			minLength: 7,
			style: { marginTop: 15 },
		},
	];

	const signupFormItems = [
		{
			id: 'signupName',
			label: 'Name',
			placeholder: ' ',
			keyboardType: 'default',
			required: true,
			errorMsg: 'Please enter a valid Name',
		},
		{
			id: 'signupEmail',
			label: 'Email',
			placeholder: ' ',
			email: true,
			keyboardType: 'default',
			required: true,
			errorMsg: 'Please enter a valid email address',
		},
		{
			id: 'signupPassword',
			label: 'Password',
			placeholder: ' ',
			password: true,
			keyboardType: 'password',
			required: true,
			errorMsg: 'Password must be at least 7 characters.',
			minLength: 7,
		},
		{
			id: 'signConfirmPassword',
			label: 'Confirm Password',
			placeholder: ' ',
			password: true,
			keyboardType: 'password',
			required: true,
			errorMsg: 'Passwords do not match',
		},
	];
	useEffect(() => {
		if (error) {
			alert(error)
			//Alert.alert('Error Occurred', error, [{ text: 'Okay' }]);
		}
	}, [error]); //check : i added an empty array dep

	return (
		<KeyboardAvoidingView
			style={styles.screen}
			keyboardVerticalOffset={50}
			// behavior="padding"
		>
			<View style={styles.logoRow}>
				<View style={styles.logoContainer}>
					<Image source={require('../../assets/logo1.png')} style={styles.logo} />
				</View>
			</View>
			<ScrollView
				showsVerticalScrollIndicator={false}
				style={{ flex: 1, padding: 25 }}
				contentContainerStyle={{ flex: 1, justifyContent: 'space-between' }}>
				<View style={{ width: '100%', maxWidth: 500, alignSelf: 'center' }}>
					{isSignup && (
						<Text style={[styles.formText2, { paddingLeft: 0, fontSize: 20 }]}>Create an Account</Text>
					)}
					{!isSignup &&
						loginFormItems.map(
							(
								{
									id,
									label,
									placeholder,
									keyboardType,
									required,
									email,
									password,
									errorMsg,
									minLength,
									style,
								},
								index
							) => {
								return (
									<Input
										key={index}
										style={style ? style : {}}
										inputContainerStyle={{ backgroundColor: '#fff' }}
										hideIcon
										id={id}
										label={label}
										placeholder={placeholder}
										keyboardType={keyboardType}
										required={required}
										email={email}
										password={password}
										autoCapitalize="none"
										errorMsg={errorMsg}
										onInputChange={inputChangeHandler}
										initialValue=""
										secureTextEntry={password}
										minLength={minLength}
									/>
								);
							}
						)}
					{!isSignup && (
						<Text onPress={() => {}} style={styles.formText}>
							Forgot Password?
						</Text>
					)}
					{isSignup &&
						signupFormItems.map(
							(
								{
									id,
									label,
									placeholder,
									keyboardType,
									required,
									email,
									password,
									errorMsg,
									minLength,
									style,
								},
								index
							) => {
								return (
									<Input
										key={index}
										style={style ? style : {}}
										inputContainerStyle={{ backgroundColor: '#fff' }}
										hideIcon
										id={id}
										label={label}
										placeholder={placeholder}
										keyboardType={keyboardType}
										required={required}
										email={email}
										password={password}
										autoCapitalize="none"
										errorMsg={errorMsg}
										onInputChange={inputChangeHandler}
										initialValue=""
										secureTextEntry={password}
										minLength={minLength}
									/>
								);
							}
						)}

					<View style={styles.actions}>
						<View style={[styles.btn, {}]}>
							{isLoading ? (
								<ActivityIndicator color={Colors.btn} size={22} />
							) : (
								<MyBtn
									padding={15}
									title={isSignup ? 'SignUp' : 'Login'}
									textColor={'white'}
									bgColor={Colors.btn}
									onPress={authHandler}
								/>
							)}
						</View>

						{!isSignup && (
							<>
								<View
									style={{
										flex: 1,
										flexDirection: 'row',
										paddingVertical: 20,
										marginBottom: 10,
										alignItems: 'center',
									}}>
									<View style={{ backgroundColor: '#A47551', height: 1, flex: 1 }}></View>
									<Text style={styles.formText2}>OR</Text>
									<View style={{ backgroundColor: '#A47551', height: 1, flex: 1 }}></View>
								</View>
								<View style={styles.btn}>
									<MyBtn
										padding={15}
										title={`Sign Up with Email`}
										textColor={'#222'}
										bgColor={'white'}
										onPress={() => {
											setIsSignup(true);
										}}
									/>
								</View>
								<View style={[styles.btn, { marginTop: 10 }]}>
									<MyBtn
										padding={15}
										title={`Sign in with Google`}
										textColor={'#222'}
										bgColor={'white'}
										onPress={() => {}}
									/>
								</View>
							</>
						)}
					</View>
					{isSignup && (
						<Text
							style={[styles.formText2, { width: '100%', textAlign: 'center' }]}
							onPress={() => {
								setIsSignup(false);
							}}>
							Login instead
						</Text>
					)}
				</View>
				<Text style={[styles.formText2, { width: '100%', textAlign: 'center' }]}>
					Terms of Service and Privacy Policy
				</Text>
			</ScrollView>
		</KeyboardAvoidingView>
	);
};;

//AuthScreen.navigationOptions =
export const screenOptions = (navProps) => {
	return {
		headerTitle: '',
		headerStyle: {
			borderBottomWidth: 0,
			backgroundColor: Colors.primary,
		},
	};
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		marginTop: -2,
		backgroundColor: Colors.primary,
	},
	logoRow: {
		alignItems: 'center',
		width: '100%',
		// paddingVertical: 25,
	},
	logoContainer: {
		width: 225,
		height: 44,
		padding: 10,
	},
	logo: { width: '100%', height: '100%' },
	formText: {
		padding: 5,
		textAlign: 'right',
		paddingVertical: 10,
		width: '100%',
		marginBottom: 10,
		fontSize: 14,
		fontFamily: 'OpenSansBold',
	},
	formText2: {
		padding: 5,
		fontSize: 14,
		fontFamily: 'OpenSansBold',
	},
	actions: {
		marginTop: 20,
		width: '100%',
	},
	btn: {
		marginBottom: 10,
		borderRadius: 8,
		overflow: 'hidden',
	},
});

export default AuthScreen;
