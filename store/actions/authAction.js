import { AsyncStorage } from 'react-native';
import ENV from '../../env';

// export const SIGNUP = 'SIGNUP';
// export const LOGIN = 'LOGIN';
export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';
export const SET_DID_TRY_AUTO_LOGIN = 'SET_DID_TRY_AUTO_LOGIN';

const API_KEY = ENV().REACT_APP_FIREBASE_API_KEY;
let timer;

export const setDidTryAutoLogin = () => {
	return { type: SET_DID_TRY_AUTO_LOGIN };
};

export const authenticate = (idToken, userId, expiryTime, userAppData) => {
	console.log('authenticate--', userAppData);
	const { userEmail, userName, signupDate, signupId } = userAppData;
	return (dispatch) => {
		dispatch(setLogoutTimer(expiryTime));
		dispatch({
			type: AUTHENTICATE,
			idToken: idToken,
			userId: userId,
			userEmail,
			userName,
			signupDate,
			signupId,
		});
	};
};

export const signup = ({ userEmail, userPassword, userConfirmPassword, userName }) => {
	return async (dispatch) => {
		//this fetch request creates an new user and returns info about the new account
		if (userEmail && userPassword && userPassword === userConfirmPassword) {
			const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					email: userEmail,
					password: userPassword,
					returnSecureToken: true,
				}),
			});

			if (!response.ok) {
				const responseErrorData = await response.json();
				const respErrMsg = responseErrorData.error.message;
				let errMsg = 'Error Occurred!';
				if (respErrMsg === 'EMAIL_EXISTS') {
					errMsg = 'Email already exits!';
				} else if (respErrMsg === 'TOO_MANY_ATTEMPTS_TRY_LATER') {
					errMsg = 'Too many attempts, please try again later!';
				}
				throw new Error(errMsg);
			}
			//make sure to handle all errors, example: network error
			const responseData = await response.json();
			//console.log(responseData)
			if (!responseData) throw new Error('Something went wrong');

			const userAppData = await uploadUserAppData(userName, userEmail, responseData.idToken, responseData.localId);
			dispatch(
				authenticate(
					responseData.idToken,
					responseData.localId,
					parseInt(responseData.expiresIn) * 1000,
					userAppData
				)
			);
			//dispatch({ type: SIGNUP, token: responseData.idToken, userId: responseData.localId });
			const expiryDate = new Date(new Date().getTime() + parseInt(responseData.expiresIn) * 1000);
			saveDataToStorage(responseData.idToken, responseData.localId, expiryDate, userAppData); //just like you stored it in redux store(mem), but here, in the device storage
		} else if (userEmail && userPassword) {
			throw new Error('PASSWORDS DO NOT MATCH');
		} else {
			//console.log('EMPTY FIELDS');
			throw new Error('EMPTY FIELDS');
		}
	};
};

//YOU CAN ALSO CHOOSE TO COMBINE THE TWO ACTION CREATORS INTO JUST ONE ACTION CREATOR(FUNC)
export const login = (userEmail, userPassword) => {
	return async (dispatch) => {
		//this fetch request creates an new user and returns info about the new account
		if (userEmail && userPassword) {
			const response = await fetch(
				`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						email: userEmail,
						password: userPassword,
						returnSecureToken: true,
					}),
				}
			);

			if (!response.ok) {
				const responseErrorData = await response.json();
				const respErrMsg = responseErrorData.error.message;
				let errMsg = 'Error Occurred!';
				if (respErrMsg === 'EMAIL_NOT_FOUND') {
					errMsg = "Email couldn't be found!";
				} else if (respErrMsg === 'INVALID_PASSWORD') {
					errMsg = 'Password is incorrect!';
				}
				throw new Error(errMsg);
			}
			//make sure to handle all errors, example: network error
			const responseData = await response.json();
			//console.log(responseData)

			const userAppData = await fetchUserAppData(responseData.localId);

			dispatch(
				authenticate(
					//CHECK IF YOU CAN STORE THE USERS PUSH TOKEN EACH TIME THEY LOGIN(even for auto login) (SINCE THEIR PUSH TOKEN SHOULD CHANGE ON EVERY NEW DEVICE)
					responseData.idToken,
					responseData.localId,
					parseInt(responseData.expiresIn) * 1000,
					userAppData
				)
			);
			//dispatch({ type: LOGIN, token: responseData.idToken, userId: responseData.localId });

			//getting the future date/time when the token expires
			const expiryDate = new Date(new Date().getTime() + parseInt(responseData.expiresIn) * 1000);
			saveDataToStorage(responseData.idToken, responseData.localId, expiryDate, userAppData); //just like you stored it in redux store(mem), but here, in the device storage
		} else {
			alert('EMPTY FIELDS');
			throw new Error('Please fill in all fields.');
		}
	};
};

export const logout = () => {
	clearLogoutTimer();
	AsyncStorage.removeItem('userData'); //you can still choose to wait for this
	return {
		type: LOGOUT,
	};
};

const clearLogoutTimer = () => {
	if (timer) {
		clearTimeout(timer);
	}
};

const setLogoutTimer = (tokenExpiryTime) => {
	return (dispatch) => {
		timer = setTimeout(() => {
			// REM: I ignored the yellow box msg about long timers
			dispatch(logout());
		}, tokenExpiryTime);
	};
};

const saveDataToStorage = (idToken, userId, tokenExpiry, userAppData) => {
	AsyncStorage.setItem(
		'userData',
		JSON.stringify({
			idToken: idToken,
			userId: userId,
			expiryDate: tokenExpiry.toISOString(),
			signupId: userAppData.signupId,
			userName: userAppData.userName,
			userEmail: userAppData.userEmail,
			//signupDate: userAppData.signupDate.toISOString(),
		})
	);
};

const fetchUserAppData = async (userId) => {
	// return async(dispatch, getState) => {
	// 	//async code
	// const userId = getState().authRed.userId;
	try {
		//the u1 will be replaced with a specific authenticated user
		const response = await fetch(`https://rn-firebase-expo-project.firebaseio.com/userAppData/${userId}.json`, {
			method: 'GET', //already the default, hence is unnecessary
		});

		//optional
		if (!response.ok) {
			throw new Error('Something went wrong!');
		}

		const responseData = await response.json(); //waits form the response before continuing with other exe below
		if (!responseData) throw new Error('Something went wrong!');

		let userAppData;
		for (const key in responseData) {
			console.log('name is: ', key, 'obj is: ', responseData);
			const itemObj = responseData[key];
			userAppData = {
				signupId: itemObj.signupId,
				userName: itemObj.userName,
				userEmail: itemObj.userEmail,
				signupDate: new Date(itemObj.signupDate),
			};
		}
		console.log({ userAppData, responseData });
		return userAppData;
	} catch (err) {
		//send to custom analytics server
		throw err; //handle this on the screen file
	}
	// };
};

const uploadUserAppData = async (userName, userEmail, idToken, userId) => {
	// return async (dispatch, getState) => {
	// const idToken = getState().authRed.idToken;
	// const userId = getState().authRed.userId;
	const date = new Date();
	const response = await fetch(
		`https://rn-firebase-expo-project.firebaseio.com/userAppData/${userId}.json?auth=${idToken}`,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				userName,
				userEmail,
				signupDate: date.toISOString(),
			}),
		}
	);
	if (!response.ok) {
		throw new Error('Something went wrong');
	}
	const responseData = await response.json(); //waits form the response before continuing the exe
	if (!responseData) throw new Error('Something went wrong');
	const userAppData = {
		signupId: responseData.name,
		userName,
		userEmail,
		signupDate: date,
	};
	console.log({ userAppData, responseData });
	return userAppData;
};
