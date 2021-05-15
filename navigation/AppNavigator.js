import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

//React navigation version 5
import { NavigationContainer } from '@react-navigation/native';

import { ShopDrawerNavigator, AuthNavigator, KoffeeLoadTabNavigator} from './ShopNavigator';
import StartupScreen from '../screens/StartupScreen';

const AppNavigator = props => {
    const isAuth =true// useSelector(state => !!state.authRed.idToken);
    const didTryAutoLogin = useSelector(state => !!state.authRed.didTryAutoLogin);

    return (
		<NavigationContainer>
			{/* {isAuth && <ShopDrawerNavigator />} */}
			{isAuth && <KoffeeLoadTabNavigator />}

			{!isAuth && didTryAutoLogin && <AuthNavigator />}
			{!isAuth && !didTryAutoLogin && <StartupScreen />}
		</NavigationContainer>
	);
};

export default AppNavigator;