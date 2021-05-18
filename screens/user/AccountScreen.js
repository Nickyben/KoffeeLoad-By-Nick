import React, { useState, useEffect, useCallback } from 'react';
import {
	ScrollView,
	View,
	Text,
	StyleSheet,
	Button,
	FlatList,
	Platform,
	ActivityIndicator,
	Image,
	ImageBackground,
} from 'react-native';

import { useSelector, useDispatch } from 'react-redux'; // another approach is importing and using the connect function
import { HeaderTitle } from 'react-navigation-stack';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import ProductItem from '../../components/shopComponents/CoffeeItem';
import HeaderBtn from '../../components/UI/HeaderBtn';
import * as cartActions from '../../store/actions/cartAction';
import * as prodActions from '../../store/actions/productsAct';
import Colors from '../../constants/Colors';
import TouchIcon from '../../components/UI/TouchIcon';
import TouchCard from '../../components/UI/TouchCard';
import CoffeeItem from '../../components/shopComponents/CoffeeItem';
import Btn from '../../components/UI/Btn';
import Touch from '../../components/UI/Touch';
import MyBtn from '../../components/UI/MyBtn';

const AccountScreen = ({ props, navigation }) => {
	const [isLoading, setIsLoading] = useState(false);
	const [isRefreshing, setIsRefreshing] = useState(false);
	const [error, setError] = useState();

	const accountItems = [
		{
			sectionTitle: 'My Coffee Account',
			subItems: [
				{ title: 'Orders', icon: 'ordersIcon', onSelect: () => {} },
				{ title: 'Pending Orders', icon: 'pendingOrdersIcon', onSelect: () => {} },
				{ title: 'Saved Orders', icon: 'heart-empty', onSelect: () => {} },
				{ title: 'RecentlyViewed', icon: 'sync', onSelect: () => {} },
			],
		},
		{
			sectionTitle: 'My Settings',
			subItems: [
				{ title: 'My Account Settings', icon: 'person', onSelect: () => {} },
				{ title: 'Payment Method', icon: 'paymentMethodIcon', onSelect: () => {} },
				{ title: 'Security', icon: 'securityIcon', onSelect: () => {} },
			],
		},
	];

	const dispatch = useDispatch();
	// const loadProducts = useCallback(async () => {
	// 	setError(null);
	// 	setIsRefreshing(true);
	// 	try {
	// 		await dispatch(prodActions.fetchProducts());
	// 	} catch (err) {
	// 		setError(err.message);
	// 	}
	// 	setIsRefreshing(false);
	// }, [dispatch, setError]); //setIsLoading is handled already by react,

	// useEffect(() => {
	// 	const unsubscribe = navigation.addListener('focus', loadProducts);

	// 	//clean up function to run when effect is about to rerun or when component is destroyed
	// 	return () => {
	// 		unsubscribe();
	// 	};
	// }, [loadProducts]);

	// useEffect(
	// 	//will run only when the component load and not again
	// 	//don't use async keyword here, instead, use .then() after the dispatch()
	// 	() => {
	// 		setIsLoading(true);
	// 		loadProducts().then(() => {
	// 			setIsLoading(false);
	// 		});
	// 	},
	// 	[dispatch, loadProducts]
	// );

	const selectItemHandler = (id, title) => {
		navigation.navigate({
			name: 'ProductDetail',
			params: {
				productId: id,
				productTitle: title,
			},
		});
	};

	// if (error) {
	// 	return (
	// 		<View style={styles.spinner}>
	// 			<Text>Oops! an error occurred!</Text>
	// 			<Button
	// 				color={Colors.primary}
	// 				title="Try Again"
	// 				onPress={() => {
	// 					setIsLoading(true);
	// 					loadProducts().then(() => {
	// 						setIsLoading(false);
	// 					});
	// 				}}
	// 			/>
	// 		</View>
	// 	);
	// }

	if (isLoading) {
		return (
			<View style={styles.spinner}>
				<ActivityIndicator size="large" color={Colors.accent} />
			</View>
		);
	}

	// if (!isLoading && products.length === 0) {
	// 	return (
	// 		<View style={styles.spinner}>
	// 			<Text>Oops! No products Found!</Text>
	// 		</View>
	// 	);
	// }

	return (
		<View style={styles.screen}>
			<View style={styles.welcomeRow}>
				<Text style={styles.welcomeText}>Welcome Nicholas!</Text>
			</View>
			<ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
				{accountItems.map((section, index) => {
					const { sectionTitle, subItems } = section;

					return (
						<View key={index}>
							<Text style={styles.itemsHeader}>{sectionTitle}</Text>
							<View style={{ paddingHorizontal: 10 }}>
								{subItems.map(({ title, icon, onSelect }, subIndex) => {
									const iconIsImage = !(icon === 'sync' || icon === 'person' || icon === 'heart-empty'); 
									return (
										<View style={styles.itemRow} key={subIndex}>
											<View style={{ flexDirection: 'row', alignItems: 'center' }}>
												{!iconIsImage? (
													<TouchIcon
														useIosIcon={icon === 'heart-empty'}
														name={icon}
														size={23}
													/>
												) : (
													<Image
														style={styles.iconProfileImg}
														source={require(`../../assets/${icon}.png`)}
													/>
												)}
												<Text style={[styles.itemTitle],{marginLeft: iconIsImage? 10: 5}}>{title}</Text>
											</View>
											<TouchIcon useIosIcon name={'arrow-forward'} size={23} />
										</View>
									);
								})}
							</View>
						</View>
					);
				})}

				<View style={styles.action}>
					<MyBtn title={'Log Out'} bgColor={Colors.btn} textColor={'#fff'} />
				</View>
			</ScrollView>
		</View>
	);
};

//ProductsOverviewScreen.navigationOptions
export const screenOptions = (navProps) => {
	const cartIcon = 'md-cart';
	return {
		headerTitle: 'Account',
		headerStyle: {
			borderBottomWidth: 0,
			backgroundColor: Colors.accent,
		},
	};
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		marginTop: -2,
	},
	scroll: {
		backgroundColor: '#fff',
		flex: 1,

		// justifyContent: 'center',
		// alignItems: 'center',
		padding: 10,
		paddingVertical: 30,
	},
	welcomeRow: {
		backgroundColor: Colors.accent,
		justifyContent: 'space-between',
		flexDirection: 'row',
		alignItems: 'center',
		width: '100%',
		paddingHorizontal: 15,
		paddingBottom: 10,
	},
	welcomeText: {
		fontFamily: 'OpenSansBold',
		fontSize: 14,
		color: '#222',
		// padding: 10,
	},

	row: {
		width: '100%',
		padding: 10,
		// backgroundColor: 'red',
	},
	row2: {
		flex: 1,
		// backgroundColor: 'green',
		width: '100%',
	},
	rowLabel: {
		marginTop: 10,
		fontFamily: 'OpenSansBold',
		fontSize: 14,
		color: '#222',
	},
	image: {
		borderRadius: 10,
		width: '100%',
		height: '100%',
	},
	image2: {
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 10,
		width: '100%',
		height: '100%',
	},
	ourCoffee: {
		fontFamily: 'OpenSansBold',
		fontSize: 22,
		color: '#fff',
		// padding: 10,
	},
	logo: {
		width: '100%',
		height: '100%',
	},

	buttons: {
		borderRadius: 8,
		overflow: 'hidden',
	},
	spinner: {
		backgroundColor: Colors.primary,
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	listContainer: {
		//flex: 1,
		width: '100%',

		// backgroundColor: 'purple',
		paddingVertical: 15,
		flexDirection: 'row',
		//justifyContent: 'space',
		//justifyContent: 'center',
	},
	flatListStyle: { flex: 1 },
	action: {
		width:'100%',
		marginTop: 20,
		paddingHorizontal: 30,
	},
	itemsHeader: {
		width: '100%',
		padding: 10,
		//paddingLeft: 25,
		fontFamily: 'OpenSansBold',
		fontSize: 14,
		color: '#000',
	},

	itemRow: {
		padding: 10,
		paddingRight: 5,
		paddingVertical: 5,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		borderRadius: 10,
		borderWidth: .1,
		borderColor: '#ccc',
		marginBottom: 7,
	},
	itemTitle: {
		fontFamily: 'OpenSansBold',
		fontSize: 12,
		color: '#222',
	},
	iconProfileImg: {
		overflow: 'hidden',
		// borderRadius: 12,
		width: 24,
		height: 24,
		resizeMode: 'contain',
		alignItems: 'flex-start',
		justifyContent: 'flex-start',
	},
});

export default AccountScreen;
