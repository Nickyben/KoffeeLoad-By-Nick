import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

//React navigation version 5
import { NavigationContainer } from '@react-navigation/native';

import { ShopDrawerNavigator, AuthNavigator, KoffeeLoadTabNavigator } from './ShopNavigator';
import StartupScreen from '../screens/StartupScreen';
import LogoScreen2 from '../screens/LogoScreen2';

const AppNavigator = (props) => {
	const [isLoadingApp, setIsLoadingApp] = useState(true);
	const [isAuth, setIsAuth] = useState(false);

	const isAuthenticated =  useSelector(state => !!state.authRed.idToken);
	const didTryAutoLogin = useSelector((state) => !!state.authRed.didTryAutoLogin);
	useEffect(() => {
		const logoLoad = setTimeout(() => {
			setIsLoadingApp(false);
			setIsAuth(isAuthenticated);
		}, 1000);
		return () => {
			clearTimeout(logoLoad);
		};
	}, [isAuthenticated]);

	return (
		<NavigationContainer>
			{isLoadingApp && <LogoScreen2 />}

			{isAuth && <KoffeeLoadTabNavigator />}

			{!isLoadingApp && !isAuth && didTryAutoLogin && <AuthNavigator />}
			{!isLoadingApp && !isAuth && !didTryAutoLogin && <StartupScreen />}
		</NavigationContainer>
	);
};

export default AppNavigator;
