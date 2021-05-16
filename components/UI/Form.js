import React, { useEffect, useCallback, useReducer, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, View, Text, Alert, ScrollView, KeyboardAvoidingView } from 'react-native';
import Card from './Card';
import Input from './Input';
import Colors from '../../constants/Colors';
import Btn from './Btn';
import { submitForm } from '../../store/actions/formActions';
import { objToArr, arrToObj } from '../../constants/MyFunctions';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useNavigation } from '@react-navigation/native';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';
const FORM_SUBMIT_CHECK = 'FORM_SUBMIT_CHECK';
const FORM_SPECIFIC_CHECK = 'FORM_SPECIFIC_CHECK';

const SUBMIT_FORM = 'SUBMIT_FORM';
const FORM_IS_SUBMITTED = 'FORM_IS_SUBMITTED';

const formReducer = (state, action) => {
	//the state is initially the initial state passed to 2nd arg of useReducer
	switch (action.type) {
		case FORM_INPUT_UPDATE:
			const updatedInputValues = {
				...state.inputValues,
				[action.input]: action.value, //replacing the key(the input's name)  and value in inputValues Obj with the new text from action.value
			};
			const updatedInputValidities = {
				...state.inputValidities,
				[action.input]: action.isValid, //replacing the key(the input's name)  and value in inputValidities Obj with the new text from action.value
			};

			const updatedInputFocuses = {
				...state.inputFocuses,
				[action.input]: action.inputHasFocus, //replacing the key(the input's name)  and value in inputValidities Obj with the new text from action.value
			};

			const updatedInputBlurs = {
				...state.inputBlurs,
				[action.input]: action.inputLostFocus, //replacing the key(the input's name)  and value in inputValidities Obj with the new text from action.value
			};
			let updatedFormFocus = false;
			let updatedFormBlur = true;
			let updatedFormValidity = true;
			for (const key in updatedInputValidities) {
				//GOOD PRACTICE! : once the updatedFormValidity is false for any,
				// it remains false even if any other inputValidity is true, because the false will override in the AND logic
				updatedFormValidity = updatedFormValidity && updatedInputValidities[key];
			}
			for (const key in updatedInputFocuses) {
				updatedFormFocus = updatedFormFocus || updatedInputFocuses[key];
			}
			for (const key in updatedInputBlurs) {
				updatedFormBlur = updatedFormBlur && updatedInputBlurs[key];
			}
			return {
				...state,
				inputValues: updatedInputValues,
				inputValidities: updatedInputValidities,
				inputFocuses: updatedInputFocuses,
				inputBlurs: updatedInputBlurs,
				formValidity: updatedFormValidity,
				formHasFocus: updatedFormFocus,
				formLostFocus: updatedFormBlur,
				showFormStatus: false,
				formIsSubmitted: action.formIsSubmitted,
				newFormErrorMsg: null,
			};
		case FORM_SUBMIT_CHECK:
			return {
				...state,
				formHasError: action.hasError,
				showFormStatus: action.showFormStatus,
				submitForm: !action.hasError,
				formIsSubmitted: action.formIsSubmitted,
				newFormErrorMsg: action.newFormErrorMsg,
			};

		case FORM_IS_SUBMITTED:
			return {
				...state,
				clearInputs: action.clearForm,
			};
	}
	return state;
};

const Form = ({
	id,
	title,
	items,
	children,
	onSubmit,
	rectInputs,
	hideInputIcons,
	requiresAllInputs,
	formAction,
	formStateGetter,
	submitTitle,
	formActionDone,
	formErrorMsg,
	specificCheck,
	doNotClearInputs,
	formSuccessMsg,
	onFormSubmitted,
}) => {
	const dispatch = useDispatch();
	//const mountedRef = useRef(true);
	const navigation = useNavigation();
	const prevSubmittedForm = useSelector((s) => s.formReducer.submittedFormsData.find((form) => form.id === id));
	const lastInputItems = prevSubmittedForm ? prevSubmittedForm.inputValues : null;

	const inputItems = items ? items : [];
	let initialInputValues = {};
	let initialInputValidities = {};
	let initialInputFocuses = {};
	let initialInputBlurs = {};

	for (let input of inputItems) {
		if (input.initialValue !== null && input.initialValue !== undefined) {
			initialInputValues[input.id] = input.initialValue;
			initialInputValidities[input.id] = true;
		} else if (lastInputItems && !input.password) {
			initialInputValues[input.id] = lastInputItems[input.id];
			initialInputValidities[input.id] = true;
		} else {
			initialInputValues[input.id] = '';
			initialInputValidities[input.id] = requiresAllInputs || input.required ? false : true;
		}

		initialInputFocuses[input.id] = false;
		initialInputBlurs[input.id] = false;
	}
	const initialFormState = {
		//recommended instead of mgt of all text states and validity individually with useState() hook
		//initial Values
		inputValues: initialInputValues,
		//initial validity
		inputValidities: initialInputValidities,
		//initial general form validity
		formValidity: false,
		inputFocuses: initialInputFocuses,
		inputBlurs: initialInputBlurs,
		formHasFocus: false,
		formLostFocus: false,
		formId: id,
		formHasError: false,
		formIsSubmitted: false,
		showFormStatus: false,
		newFormErrorMsg: null,
	};

	const [formState, dispatchFormAction] = useReducer(formReducer, initialFormState);
	const formHasSomeEntry = objToArr(formState.inputValues).some((value) => value && value.length !== 0);

	const formInputHandler = useCallback(
		(inputNameOrId, text, validity, hasFocus, lostFocus) => {
			dispatchFormAction(
				//almost just like dispatching in redux
				//action
				{
					type: FORM_INPUT_UPDATE,
					value: text,
					isValid: validity,
					input: inputNameOrId,
					inputHasFocus: hasFocus,
					inputLostFocus: lostFocus,
					formIsSubmitted: false,
				}
			);
		},
		[dispatchFormAction]
	); //inputName,text, validity

	const formSubmitHandler = useCallback(async () => {
		// console.warn(onSubmit(), formState.formValidity, formState.formIsSubmitted)
		//if (!onSubmit()) {
		let specificData = {};
		const passTestFunc = () => {
			//setError(null);
			// setIsLoading(true);

			try {
				//dispatching happens here

				if (
					objToArr(formState.inputValues).every((value) => value.length !== 0) ||
					objToArr(formState.inputValidities).every((bool) => bool)
				) {
					//console.warn('valid');
					dispatchFormAction({
						type: FORM_SUBMIT_CHECK,
						hasError: false, //!onSubmit(),
						showFormStatus: true,
						formIsSubmitted: true,
						newFormErrorMsg: null,
					});
					//await
					formAction
						? formAction(formState.inputValues) &&
						  dispatch(submitForm(formState.formId, formState.inputValues))
						: dispatch(submitForm(formState.formId, formState.inputValues));
					//onFormSubmitted ? onFormSubmitted() : navig.goBack();
				}
			} catch (err) {
				// setError(err.message)
			}
			// setIsLoading(false);
			//props.navigation.goBack();
		};

		if (!formState.formValidity) {
			await dispatchFormAction({
				type: FORM_SUBMIT_CHECK,
				hasError: true, // !onSubmit(),
				showFormStatus: true,
				formIsSubmitted: formState.formIsSubmitted,
				newFormErrorMsg: formErrorMsg,
			});
		} else {
			if (specificCheck) {
				if (specificCheck === 'confirmPasswordMatch') {
					//check the password fields
					const confirmationInputs = inputItems.filter(
						(input) => input.password === true && input.check === 'confirmPasswordMatch'
					);
					const firstPassword = formState.inputValues[confirmationInputs[0].id];
					let passwordsMatched = true;
					for (let input of confirmationInputs) {
						passwordsMatched = formState.inputValues[input.id] === firstPassword && passwordsMatched;
					}

					if (!passwordsMatched) {
						await dispatchFormAction({
							type: FORM_SUBMIT_CHECK,
							hasError: true, // !onSubmit(),
							showFormStatus: true,
							formIsSubmitted: formState.formIsSubmitted,
							newFormErrorMsg: 'Passwords do not match',
						});
					} else {
						passTestFunc();
					}
				}
			} else {
				passTestFunc();
			}
		}

		// if (!formState.formValidity) {
		//   Alert.alert('Cannot Submit Invalid Form',
		//     'Please ensure that all input fields are filled correctly!', [{ text: 'Understood ' }])
		//   return;
		// }
	}, [dispatch, formState]);

	useEffect(() => {
		formStateGetter && formStateGetter(formState);
	}, [formState]);

	return (
		<View style={{ ...styles.scroll }}>
			{/* <Card style={styles.form}> */}
			{title && <Text style={styles.formTitle}>{title}</Text>}
			<View style={{ padding: 20 }}>
				{inputItems &&
					inputItems.map((input, index) => {
						return (
							<Input
								key={input.id + index}
								{...input}
								required={requiresAllInputs}
								hideIcon={hideInputIcons}
								rectInput={rectInputs}
								onInputChange={formInputHandler}
								onFocus={formInputHandler}
								initialValue={formState.inputValues[input.id]}
								initialValidity={formState.inputValidities[input.id]}
								newValue={
									formState.formIsSubmitted && (!doNotClearInputs || input.password)
										? ''
										: formState.inputValues[input.id]
								}
								formHasError={formState.formHasError && formState.showFormStatus }//&& formHasSomeEntry}
								submitted={formState.formIsSubmitted && (!doNotClearInputs || input.password)}
							/>
						);
					})}
				{children}
				{formState.formHasError && formState.showFormStatus && formHasSomeEntry && (
					<Text style={styles.formError}>
						{formState.newFormErrorMsg
							? formState.newFormErrorMsg
							: formErrorMsg
							? formErrorMsg
							: 'Please, ensure that the form is filled correctly!'}
					</Text>
				)}

				{!formState.formHasError && formActionDone && !formState.formHasFocus && (
					<Text style={{ ...styles.formError, color: '#55ff55', backgroundColor: '#ddffdd' }}>
						{formSuccessMsg ? formSuccessMsg : 'Your form has been submitted successfully.'}
					</Text>
				)}

				{/* {!formState.formHasError && formState.formIsSubmitted && formState.showFormStatus &&
            <Text style={{ ...styles.formError, color: '#55ff55', backgroundColor: Colors.success }}>
              {formSuccessMsg ? formSuccessMsg :
                'Your form has been submitted successfully.'}</Text>
          } */}

				<Btn
					fontSize={15}
					style={{ marginVertical: 20, borderRadius: 10 }}
					innerStyle={{ paddingVertical: 10 }}
					onPress={formSubmitHandler}
					bgColor={Colors.primary}
					//disabled={!objToArr(formState.inputValues).some(value=>!!value)}
				>
					{submitTitle ? submitTitle : 'Submit'}
				</Btn>
			</View>

			{/* 
          <Input
            id='title'
            label='Title'
            errorMsg='Please enter a valid title!'
            keyboardType='default'
            autoCapitalize='sentences'
            autoCorrect={true}
            returnKeyType='next'
            onInputChange={formInputHandler}//using()=>formInputHandler(, ,) causes the a problem because it rebuilds as its dependencies change since its a useCallback 
            initialValue={editProduct ? editProduct.title : ''}
            initialValidity={!!editProduct} //editProduct ? true : false
            required
          /> */}

			{/* </Card> */}
		</View>
	);
};

export const screenOptions = () => {
	return {};
};

const styles = StyleSheet.create({
	scroll: {
		backgroundColor: '#fff',
	},
	// form: {
	//   overflow: 'hidden',
	//   padding: 0,
	//   margin: 20,
	// },
	formTitle: {
		width: '100%',
		paddingTop: 30,
		paddingBottom: 0,
		padding: 20,
		textAlign: 'center',
		//backgroundColor: Colors.switchPrimary,
		color: Colors.primary, //'#222', //// Colors.switchWhiteAccent,//
		fontSize: 20,
		fontFamily: 'OpenSansBold',
		//borderBottomColor: '#f3f6f7',
		//borderBottomWidth: 2,
	},
	formError: {
		padding: 20,
		marginTop: 20,
		textAlign: 'center',
		backgroundColor: Colors.error, //'#f3f6f7',
		borderRadius: 5,
		fontFamily: 'OpenSansRegular',
		fontSize: 16,
		color: '#ff7777',
	},
});

export default Form;
