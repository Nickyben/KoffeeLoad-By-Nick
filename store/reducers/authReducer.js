import { SIGNUP, LOGIN, AUTHENTICATE, LOGOUT, SET_DID_TRY_AUTO_LOGIN } from '../actions/authAction';

const initialState = {
	idToken: null,
	userId: null,
	didTryAutoLogin: false,
	userEmail:null,
	userName:null,
	signupDate:null,
	signupId:null,
};

export default (state = initialState, action) => {
	switch (action.type) {
		case AUTHENTICATE:
			return {
				idToken: action.idToken,
				userId: action.userId,
				didTryAutoLogin: true,
				userEmail:action.userEmail,
				userName:action.userName,
				signupDate:action.signupDate,
				signupId:action.signupId,
			};
		case SET_DID_TRY_AUTO_LOGIN:
			return {
				...state,
				didTryAutoLogin: true,
			};
		case LOGOUT:
			return {
				// ...initialState
				...initialState,
				didTryAutoLogin: true,
			};
		// case LOGIN:
		//     return {
		//         idToken: action.token,
		//         userId: action.userId
		//     }
		// case SIGNUP:
		//     return {
		//         idToken: action.token,
		//         userId: action.userId
		//     }
		default:
			return state;
	}
};
