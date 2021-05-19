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
import ChatInput from '../../components/UI/ChatInput';

const CoffeeShopScreen = ({ props, navigation }) => {
	const [isLoading, setIsLoading] = useState(false);
	const [isRefreshing, setIsRefreshing] = useState(false);
	const [error, setError] = useState();
	const shopCoffees = useSelector((state) => state.productsRed.availableProducts);
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

	const checkCartHandler = () => {
		navigation.navigate({
			name: 'Cart',
			params: {
				source: 'Shop',
			},
		});
	};
	const loadSearchesHandler = (text) => {};

	const renderItem = (
		category,
		{ item } //auto gets data in obj form , I deStructured it in params
	) => (
		<View style={{ marginBottom: 10, alignItems: 'stretch', width: '33.3%' }}>
			<CoffeeItem
				content={item}
				category={category}
				onSelect={() => {
					navigation.navigate('DeptDetails', { itemId: item.id, title: item.constructor.name });
				}}
			/>
		</View>
	);

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
		<View
			style={styles.screen}
			// showsVerticalScrollIndicator={false}
		>
			<ChatInput
				defaultPosition
				style={styles.typingContainer}
				hideRightIcon={true}
				iconLeftName="search"
				placeholder={'Search'}
				leftIconBgColor="transparent"
				leftIconBgBorderRadius={50}
				onInputChange={loadSearchesHandler}
				onLeftIconPress={loadSearchesHandler}
				multiline={false}
			/>

			<View style={styles.row}>
				<View style={styles.imageContainer2}>
					<ImageBackground source={require('../../assets/images/img2.png')} style={styles.image2}>
						<Text style={styles.ourCoffee}>Our Coffee</Text>
					</ImageBackground>
				</View>
			</View>

			<View style={styles.row2}>
				<FlatList
					numColumns={3}
					showsVerticalScrollIndicator={false}
					//initialNumToRender, refreshing
					keyExtractor={(item, index) => item.id}
					data={shopCoffees}
					renderItem={renderItem.bind(this, 'coffee')}
					contentContainerStyle={styles.listContainer}
					style={styles.flatListStyle}
				/>
			</View>
		</View>
	);
};

export const screenOptions = ({ navigation }) => {
	const cartIcon = 'md-cart';
	const leftArrow = 'md-arrow-round-back';
	const checkCartHandler = () => {
		navigation.navigate({
			name: 'Cart',
			params: {
				source: 'Shop',
			},
		});
	};
	return {
		headerShown: true,
		headerTitle: '',
		headerStyle: {
			borderBottomWidth: 0,
			backgroundColor: Colors.primary,
		},
		headerLeft: (props) => (
			<HeaderButtons HeaderButtonComponent={HeaderBtn}>
				<Item tile="arrowLeft" iconName={leftArrow} onPress={checkCartHandler} />
			</HeaderButtons>
		),
		headerRight: (props) => (
			<HeaderButtons HeaderButtonComponent={HeaderBtn}>
				<Item
					tile="Cart"
					iconName={cartIcon}
					onPress={() => {
						navigation.navigate({
							name: 'Cart',
							params: {},
						});
					}}
				/>
			</HeaderButtons>
		),
	};
};

const styles = StyleSheet.create({
	screen: {
		backgroundColor: Colors.primary,
		flex: 1,
		marginTop: -2,
		// justifyContent: 'center',
		// alignItems: 'center',
		padding: 20,
		paddingVertical: 0,
	},

	typingContainer: {
		paddingTop: 5,
		width: '100%',

		//marginBottom:10,
	},
	welcomeRow: {
		//
		justifyContent: 'space-between',
		flexDirection: 'row',
		alignItems: 'center',
		width: '100%',
		paddingHorizontal: 10,
	},
	welcomeText: {
		fontFamily: 'OpenSansBold',
		fontSize: 22,
		color: '#222',
		// padding: 10,
	},
	imageContainer: {
		width: '100%',
		height: 134,
		borderRadius: 10,
		overflow: 'hidden',
		padding: 10,
		// backgroundColor: 'red',
	},
	imageContainer2: {
		width: '100%',
		height: 96,
		borderRadius: 10,
		overflow: 'hidden',
		// backgroundColor: 'red',
	},
	logoContainer: {
		width: 142,
		height: 26,
		// backgroundColor: 'blue',
		alignItems: 'center',
		paddingVertical: 5,
	},
	row: {
		width: '100%',
		padding: 10,
		// backgroundColor: 'red',
	},
	row2: {
		width: '100%',
		flex: 1,
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
		flex: 1,
		paddingVertical: 15,
		justifyContent: 'space-between',
		//alignItems: 'center',
	},
	flatListStyle: { flex: 1 },
	action: {
		alignItems: 'center',
	},
});

export default CoffeeShopScreen;
