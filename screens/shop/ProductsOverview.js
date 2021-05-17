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

const ProductsOverviewScreen = ({ props, navigation }) => {
	const [isLoading, setIsLoading] = useState(false);
	const [isRefreshing, setIsRefreshing] = useState(false);
	const [error, setError] = useState();
	const topSellingCoffees = useSelector((state) => state.productsRed.availableProducts).filter(
		(cof) => cof.isTopSelling === true
	);
	console.log(topSellingCoffees);
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

	const renderItem = (
		category,
		{ item } //auto gets data in obj form , I deStructured it in params
	) => (
		<CoffeeItem
			content={item}
			category={category}
			onSelect={() => {
				navigation.navigate('DeptDetails', { itemId: item.id, title: item.constructor.name });
			}}
		/>
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
		<ScrollView style={styles.screen} showsVerticalScrollIndicator={false}>
			<View style={styles.welcomeRow}>
				<Text style={styles.welcomeText}>Welcome Adedire</Text>
				<TouchIcon name={'cart'} size={25} />
			</View>

			<View style={styles.imageContainer}>
				<Image source={require('../../assets/images/img1.png')} style={styles.image} />
			</View>

			<View style={styles.row}>
				<View style={styles.logoContainer}>
					<Image source={require('../../assets/logo1.png')} style={styles.logo} />
				</View>
				<Text>
					We have sourced the finest and rarest coffees, that easily allows coffee lovers to experience one of
					life's simple pleasures delivered right to your doorstep.
				</Text>
			</View>

			<View style={styles.row}>
				<View style={styles.imageContainer2}>
					<ImageBackground source={require('../../assets/images/img2.png')} style={styles.image2}>
						<Text style={styles.ourCoffee}>Our Coffee</Text>
					</ImageBackground>
				</View>
			</View>

			<View style={styles.row2}>
				<Text style={styles.rowLabel}>Top Selling Coffee</Text>
				<FlatList
					showsHorizontalScrollIndicator={false}
					//initialNumToRender, refreshing
					keyExtractor={(item, index) => item.id}
					data={topSellingCoffees}
					renderItem={renderItem.bind(this, 'coffee')}
					horizontal={true}
					contentContainerStyle={styles.listContainer}
					style={styles.flatListStyle}
				/>
			</View>
			<View style={styles.action}>
				<MyBtn title={'Create a Coffee Plan'} />
			</View>
		</ScrollView>
	);
};

//ProductsOverviewScreen.navigationOptions
export const screenOptions = (navProps) => {
	const cartIcon = 'md-cart';
	return {
		headerShown: false,
		headerTitle: 'All Products',
		headerRight: (props) => (
			<HeaderButtons HeaderButtonComponent={HeaderBtn}>
				<Item
					tile="Cart"
					iconName={cartIcon}
					onPress={() => {
						navProps.navigation.navigate({
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
		// justifyContent: 'center',
		// alignItems: 'center',
		padding: 20,
	},
	welcomeRow: {
		paddingTop: 40,
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
		paddingVertical: 15,
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	flatListStyle: {},
	action: {
		alignItems: 'center',
	},
});

export default ProductsOverviewScreen;

{
	/* <FlatList
				onRefresh={loadProducts}
				refreshing={isRefreshing}
				data={products}
				keyExtractor={(item) => item.id}
				renderItem={(itemData) => (
					<ProductItem
						image={itemData.item.imageUrl}
						title={itemData.item.title}
						price={itemData.item.price}
						onSelect={() => selectItemHandler(itemData.item.id, itemData.item.title)}>
						<View style={styles.buttons}>
							<Button
								color={Colors.primary}
								title="Details"
								onPress={() => selectItemHandler(itemData.item.id, itemData.item.title)}
							/>
						</View>
						<View style={styles.buttons}>
							<Button
								color={Colors.primary}
								title="To Cart"
								onPress={() => {
									dispatch(cartActions.addToCart(itemData.item));
									console.log('dispatched added to cart');
								}}
							/>
						</View>
					</ProductItem>
				)}
			/> */
}
