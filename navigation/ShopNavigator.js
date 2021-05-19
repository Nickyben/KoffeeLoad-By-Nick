import React from 'react';
import { Platform, StyleSheet,SafeAreaView, Button, View, Image } from 'react-native';
import { useDispatch } from 'react-redux';

//react navigation version 5
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer';

import { Ionicons } from '@expo/vector-icons';

import CartScreen, { screenOptions as cartScreenOptions } from '../screens/shop/CartScreen';
import HomeScreen, { screenOptions as homeScreenOptions } from '../screens/shop/HomeScreen';
import CoffeeDetailScreen, { screenOptions as coffeeDetailScreenOptions } from '../screens/shop/CoffeeDetailScreen';
import OrdersScreen, { screenOptions as ordersScreenOptions } from '../screens/shop/OrdersScreen';
import CoffeeShopScreen, { screenOptions as coffeeShopScreenOptions } from '../screens/shop/CoffeeShopScreen';
import UserProductsScreen, { screenOptions as userProdsScreenOptions } from '../screens/user/UserProductsScreen';
import AccountScreen, { screenOptions as accountScreenOptions } from '../screens/user/AccountScreen';
import EditProductScreen, { screenOptions as editProdScreenOptions } from '../screens/user/EditProductScreen';
import Colors from '../constants/Colors';
import AuthScreen, { screenOptions as authScreenOptions } from '../screens/user/AuthScreen';
import StartupScreen, { screenOptions as startUpScreenOptions } from '../screens/StartupScreen';

import * as authActions from '../store/actions/authAction';

let isAndroid, isIos, isWeb;

if (Platform.OS === 'ios') {
	isIos = true;
} else if (Platform.OS === 'android') {
	isAndroid = true;
} else if (Platform.OS === 'web') {
	isWeb = true;
}

const defaultNavOptions = {
	headerTitle: 'KoffeeLoad',
	headerTitleStyle: {
		fontFamily: 'OpenSansBold',
	},

	headerBackTitleStyle: {
		//for the back button text...seen in ios
		fontFamily: 'OpenSansRegular',
	},
	headerStyle: {
		backgroundColor: Colors.primary,
		borderBottomWidth: 0,
        borderBottomColor:'transparent',
	},
	headerTintColor: Colors.white,
	headerTitleAlign: 'left',
};

const defaultTabStacksOpts = ({ route }) => ({
	tabBarIcon: ({ focused, color, size }) => {
		let iconName;
		let iconSize;
		if (route.name === 'Home') {
			iconName = 'md-home';
		}  else if (route.name === 'Account') {
			iconName = 'md-person';
		}
		//else if (route.name === 'Home') {
		// 	iconName = !focused ? 'ios-home' : 'md-home';
		// } else if (route.name === 'Association' || route.name === 'FacultyAssociation') {
		// 	iconName = !focused ? 'ios-people' : 'md-people';
		// } else if (route.name === 'Profile') {
		// 	iconName = !focused ? 'ios-person' : 'md-person';
		// }
		//iconSize = focused ? 28: 24;
		// You can return any component that you like here!
		return <Ionicons name={iconName} size={26} color={color} />;
	},
});

const HomeStackNav = createStackNavigator();

const HomeStackNavigator = () => {
	return (
		<HomeStackNav.Navigator screenOptions={defaultNavOptions}>
			<HomeStackNav.Screen name="HomeScreen" component={HomeScreen} options={homeScreenOptions} />
			<HomeStackNav.Screen
				name="CoffeeDetail"
				component={CoffeeDetailScreen}
				options={coffeeDetailScreenOptions}
			/>
			<HomeStackNav.Screen name="Cart" component={CartScreen} options={cartScreenOptions} />
		</HomeStackNav.Navigator>
	);
};

const OrdersStackNav = createStackNavigator();

const OrdersStackNavigator = () => {
	return (
		<OrdersStackNav.Navigator screenOptions={defaultNavOptions}>
			<OrdersStackNav.Screen name="Orders" component={OrdersScreen} options={ordersScreenOptions} />
		</OrdersStackNav.Navigator>
	);
};

const CoffeeShopStackNav = createStackNavigator();
const CoffeeShopStackNavigator= () => {
	return (
		<CoffeeShopStackNav.Navigator screenOptions={defaultNavOptions}>
			<CoffeeShopStackNav.Screen
				name="CoffeeShop"
				component={CoffeeShopScreen}
				options={coffeeShopScreenOptions}
			/>
			<CoffeeShopStackNav.Screen name="Cart" component={CartScreen} options={cartScreenOptions} />
			<CoffeeShopStackNav.Screen
				name="CoffeeDetail"
				component={CoffeeDetailScreen}
				options={coffeeDetailScreenOptions}
			/>
		</CoffeeShopStackNav.Navigator>
	);
};


const AdminStackNav = createStackNavigator();

const AdminStackNavigator = () => {
	return (
		<AdminStackNav.Navigator screenOptions={defaultNavOptions}>
			<AdminStackNav.Screen name="UserProducts" component={UserProductsScreen} options={userProdsScreenOptions} />
			<AdminStackNav.Screen name="EditProduct" component={EditProductScreen} options={editProdScreenOptions} />
		</AdminStackNav.Navigator>
	);
};

const AccountStackNav = createStackNavigator();

const AccountStackNavigator = () => {
	return (
		<AccountStackNav.Navigator screenOptions={defaultNavOptions}>
			<AccountStackNav.Screen name="UserProducts" component={AccountScreen} options={accountScreenOptions} />
			<AccountStackNav.Screen name="EditProduct" component={EditProductScreen} options={editProdScreenOptions} />
		</AccountStackNav.Navigator>
	);
};

const AuthStackNav = createStackNavigator();

export const AuthNavigator = () => {
	return (
		<AuthStackNav.Navigator screenOptions={defaultNavOptions}>
			<AuthStackNav.Screen name="Authentication" component={AuthScreen} options={authScreenOptions} />
		</AuthStackNav.Navigator>
	);
};

const KoffeeLoadTabNav = createBottomTabNavigator();

export const KoffeeLoadTabNavigator = () => {
	return (
		<KoffeeLoadTabNav.Navigator
			initialRouteName="Home"
			screenOptions={defaultTabStacksOpts}
			tabBarOptions={{
				activeTintColor: '#000',
				inactiveTintColor: '#888',
				activeBackgroundColor: 'white',
				labelPosition: 'below-icon',
				keyboardHidesTabBar: true,
				style: {
					height: 56,
				},

				labelStyle: {
					fontFamily: 'OpenSansBold',
					fontSize: 12,
					//textAlign: 'center',
					//alignSelf: 'center',
					//backgroundColor: 'red',
					//paddingBottom: 2,
				},
			}}>
			<KoffeeLoadTabNav.Screen name="Home" component={HomeStackNavigator} />
			<KoffeeLoadTabNav.Screen
				name="Shop"
				component={CoffeeShopStackNavigator}
				options={{
					tabBarIcon: ({ focused, tintColor }) => {
						return (
							<Image
								style={styles.iconProfileImg}
								source={
									!focused
										? require('../assets/shopIcon.png')
										: require('../assets/shopIconActive.png')
								}
							/>
						);
					},
				}}
			/>
			<KoffeeLoadTabNav.Screen name="Account" component={AccountStackNavigator} />
		</KoffeeLoadTabNav.Navigator>
	);
};


























const ShopDrawerNav = createDrawerNavigator();

export const ShopDrawerNavigator = () => {
	const dispatch = useDispatch();

	return (
		<ShopDrawerNav.Navigator
			drawerLabel="Menu"
			drawerPosition="left"
			drawerType="front"
			//you can add drawerStyle here
			drawerContent={(props) => {
				return (
					<View
						style={{
							flex: 1,
							paddingTop: 20,
						}}>
						<SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
							<DrawerItemList {...props} />
							<Button
								title="Logout"
								color={Colors.primary}
								onPress={() => {
									dispatch(authActions.logout());
									//props.navigation.navigate('Auth')//already handled by the renderer(AppNavigator) of the ShopNavigator @ app.js
								}}
							/>
						</SafeAreaView>
					</View>
				);
			}}
			drawerContentOptions={{
				activeTintColor: Colors.primary,
				activeBackgroundColor: '#f2f2f2',
				inactiveBackgroundColor: '#fafafa',
				inactiveTintColor: '#444',
				labelStyle: {
					fontSize: 18,
				},
			}}>
			<ShopDrawerNav.Screen
				name="ProductsStack"
				component={HomeStackNavigator}
				options={{
					//can also be set in the 2nd arg of this stack' s create func
					drawerLabel: 'Products',
					drawerIcon: (props) => (
						<Ionicons
							name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
							size={23}
							color={props.color}
						/>
					),
				}}
			/>
			<ShopDrawerNav.Screen
				name="OrdersStack"
				component={OrdersStackNavigator}
				options={{
					//can also be set in the 2nd arg of this stack' s create func
					drawerLabel: 'Orders',
					drawerIcon: (props) => (
						<Ionicons
							name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
							size={23}
							color={props.color}
						/>
					),
				}}
			/>
			<ShopDrawerNav.Screen
				name="UserStack"
				component={AdminStackNavigator}
				options={{
					//can also be set in the 2nd arg of this stack' s create func
					drawerLabel: 'Admin',
					drawerIcon: (props) => (
						<Ionicons
							name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
							size={23}
							color={props.color}
						/>
					),
				}}
			/>
		</ShopDrawerNav.Navigator>
	);
};




const styles = StyleSheet.create({
	iconProfileImg: {
		overflow: 'hidden',
		// borderRadius: 12,
		width: 24,
		height: 24,
		resizeMode: 'contain',
		alignItems: 'flex-start',
		justifyContent: 'flex-start',
	},
	// imageContainer: {
	// 	borderRadius: 12,
	// 	overflow: 'hidden',
	// 	width: 24,
	// 	height: 24,
	// 	alignContent: 'flex-start',
	// 	justifyContent: 'flex-start',
	// },
});