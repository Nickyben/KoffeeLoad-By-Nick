import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, FlatList, Platform, ActivityIndicator, ScrollView, Image } from 'react-native';

import { useSelector, useDispatch } from 'react-redux'; // another approach is importing and using the connect function
import { HeaderTitle } from 'react-navigation-stack';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import Colors from '../../constants/Colors';
import CartItem from '../../components/shopComponents/CartItem';
import Card from '../../components/UI/Card';
import HeaderBtn from '../../components/UI/HeaderBtn';
import * as cartActions from '../../store/actions/cartAction';
import * as ordersActions from '../../store/actions/ordersAction';
import TouchIcon from '../../components/UI/TouchIcon';
import MyBtn from '../../components/UI/MyBtn';
import TopRecentCoffees from '../../components/shopComponents/TopRecentCoffees';

const CartScreen = (props) => {
	const [isLoading, setIsLoading] = useState(false);
	//const [error, setError] = useState()
	const cartTotalAmt = useSelector((state) => state.cartRed.totalAmount);
	const cartItemsArr = useSelector((state) => {
		const cartItemsArray = [];
		for (const key in state.cartRed.items) {
			cartItemsArray.push({
				productId: key,
				quantity: state.cartRed.items[key].quantity,
				productPrice: state.cartRed.items[key].productPrice,
				productTitle: state.cartRed.items[key].productTitle,
				productSum: state.cartRed.items[key].productSum,
				productPushToken: state.cartRed.items[key].pushToken, //*productPushToken
			});
		}
		return cartItemsArray.sort((a, b) => (a.productId > b.productId ? 1 : -1));
	});
	const isDisabled = cartItemsArr.length === 0;
	const dispatch = useDispatch();

	const sendOrderHandler = async () => {
		setIsLoading(true);
		await dispatch(ordersActions.addOrder(cartItemsArr, Math.round(cartTotalAmt.toFixed(2) * 100) / 100));
		console.log('dispatched order with cartItems');
		setIsLoading(false);
	};
	const shopCoffees = useSelector((state) => state.productsRed.availableProducts).filter((coffee,index)=>(index===0 || index===3));
	const arrangeRow = { flexDirection: 'row', alignItems: 'center' };
	return (
		<View style={styles.screen}>
			<View style={styles.welcomeRow}>
				<Text style={styles.welcomeText}>Cart</Text>
			</View>
			<View style={{ flex: 1 }}>
				<ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
					{shopCoffees.map(({ id, title, image, price }, index) => {
						return (
							<View
								key={id}
								style={{ padding: 20, backgroundColor: '#E4D4C8', borderRadius: 15, marginBottom: 10 }}>
								<View
									style={{
										flexDirection: 'row',
										alignItems: 'center',
										paddingBottom: 10,
										borderBottomColor: Colors.accent,
										borderBottomWidth: 1,
									}}>
									<Image source={image} style={{ width: 90, height: 70 }} />
									<View style={{ padding: 15 }}>
										<Text style={[styles.cartText, { fontSize: 18, marginBottom: 15 }]}>
											{title}
										</Text>
										<Text style={styles.cartText}>£{price}</Text>
									</View>
								</View>
								<View style={[arrangeRow]}>
									<View style={[arrangeRow]}>
										{['heart-empty', 'trash'].map((name, index) => {
											return <TouchIcon key={index} useIosIcon name={name} size={23} />;
										})}
										<Text style={styles.cartText}>Remove</Text>
									</View>
									<View style={[arrangeRow]}></View>
								</View>
							</View>
						);
					})}

					<View style={[arrangeRow, { flex: 1, justifyContent: 'space-between' }]}>
						<Text style={[styles.cartText, {fontSize: 14}]}>Total</Text>
						<Text style={[styles.cartText, {fontSize: 14}]}>£{cartTotalAmt? (Math.round(cartTotalAmt.toFixed(2) * 100) / 100): '40.00'}</Text>
					</View>
					<View style={[styles.action,{ marginBottom: 15}]}>
						{isLoading ? (
							<ActivityIndicator size="large" color={Colors.primary} />
						) : (
							<MyBtn title={'Complete Your Order'} bgColor={Colors.btn} textColor={'#fff'} />
						)}
					</View>
					<TopRecentCoffees/>

					{/* <FlatList
						data={cartItemsArr}
						horizontal={true}
						keyExtractor={(item) => item.productId}
						renderItem={(itemData) => (
							<CartItem
								quantity={itemData.item.quantity}
								amount={itemData.item.productSum}
								title={itemData.item.productTitle}
								onDelete={() => {
									dispatch(cartActions.removeFromCart(itemData.item.productId));
								}}
								canDelete={true}
							/>
						)}
					/> */}
				</ScrollView>
			</View>
		</View>
	);
};

export const screenOptions = (navProps) => {
	return {
		headerTitle: '',
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
		padding: 20,
	},
	welcomeRow: {
		backgroundColor: Colors.accent,
		paddingBottom: 10,
		marginTop: -2,
		// justifyContent: 'center',
		// alignItems: 'center',
		padding: 20,
		paddingVertical: 0,
	},
	welcomeText: {
		fontFamily: 'OpenSansBold',
		fontSize: 22,
		color: '#222',
		// padding: 10,
	},
	cartText: {
		fontFamily: 'OpenSansBold',
		fontSize: 12,
		color: '#222',
	},
	

	action: {
		width: '100%',
		marginTop: 20,
		paddingHorizontal: 30,
	},

	spinner: {},
});

export default CartScreen;
