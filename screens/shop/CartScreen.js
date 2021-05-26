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
import Touch from '../../components/UI/Touch';

const CartScreen = ({ navigation }) => {
	const [isLoading, setIsLoading] = useState(false);
	//const [error, setError] = useState()
	const cartTotalAmt = useSelector((state) => state.cartRed.totalAmount);
	const cartItemsArr = useSelector((state) => {
		const cartItemsArray = [];
		for (const key in state.cartRed.items) {
			cartItemsArray.push({
				id: key,
				quantity: state.cartRed.items[key].quantity,
				price: state.cartRed.items[key].price,
				title: state.cartRed.items[key].title,
				sum: state.cartRed.items[key].sum,
				pushToken: state.cartRed.items[key].pushToken,
				image: state.cartRed.items[key].image, //*productPushToken
			});
		}
		return cartItemsArray.sort((a, b) => (a.productId > b.productId ? 1 : -1));
	});
	const isDisabled = cartItemsArr.length === 0;
	const dispatch = useDispatch();

	const sendOrderHandler = async () => {
		setIsLoading(true);
		await dispatch(ordersActions.addOrder(cartItemsArr, Math.round(cartTotalAmt.toFixed(2) * 100) / 100));
		//console.log('dispatched order with cartItems');
		setIsLoading(false);
	};
	
	const arrangeRow = { flexDirection: 'row', alignItems: 'center' };
	return (
		<View style={styles.screen}>
			<View style={styles.welcomeRow}>
				<Text style={styles.welcomeText}>Cart</Text>
			</View>
			{/* <View style={{ flex: 1 }}> */}
			<ScrollView
				style={styles.scroll}
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{
					paddingVertical: 20,
					width: '100%',
					maxWidth: 500,
					alignSelf: 'center',
				}}>
				{cartItemsArr.map((cartItem, index) => {
					const { id, title, image, price, quantity, sum } = cartItem;
					return (
						<View
							key={id}
							style={{
								padding: 20,
								paddingVertical: 15,
								backgroundColor: '#E4D4C8',
								borderRadius: 15,
								marginBottom: 10,
							}}>
							<View
								style={{
									flexDirection: 'row',
									alignItems: 'center',
									paddingBottom: 10,
									borderBottomColor: Colors.accent,
									borderBottomWidth: 1,
								}}>
								<Touch
									onTouch={() => {
										navigation.navigate('CoffeeDetail', {
											itemId: id,
										});
									}}>
									<Image source={image} style={{ width: 90, height: 70, borderRadius: 10 }} />
								</Touch>
								<View style={{ padding: 15 }}>
									<Text style={[styles.cartText, { fontSize: 18, marginBottom: 15 }]}>{title}</Text>
									<Text style={styles.cartText}>£{price.toFixed(2)}</Text>
								</View>
							</View>
							<View style={[arrangeRow, { justifyContent: 'space-between', marginTop: 10 }]}>
								<View style={[arrangeRow]}>
									{['heart-empty', 'trash'].map((name, index) => {
										return (
											<TouchIcon
												key={index}
												useIosIcon
												name={name}
												size={23}
												onTouch={
													name === 'trash'
														? () => {
																dispatch(cartActions.totallyDeleteFromCart(id));
														  }
														: () => {}
												}
											/>
										);
									})}
									<Text
										style={styles.cartText}
										onPress={() => {
											dispatch(cartActions.totallyDeleteFromCart(id));
										}}>
										Remove
									</Text>
								</View>
								<View style={[arrangeRow]}>
									<TouchIcon
										bgColor={Colors.btn}
										color={'#fff'}
										useIosIcon
										name={'remove'}
										size={12}
										onTouch={() => {
											dispatch(cartActions.removeFromCart(id));
										}}
									/>

									<Text
										style={[
											{
												backgroundColor: '#fff',
												borderRadius: 5,
												padding: 5,
												paddingHorizontal: 10,
												marginLeft: 5,
												marginRight: 5,
											},
										]}>
										{quantity}
									</Text>
									<TouchIcon
										bgColor={Colors.btn}
										color={'#fff'}
										useIosIcon
										name={'add'}
										size={12}
										onTouch={() => {
											dispatch(cartActions.addToCart(cartItem));
										}}
									/>
								</View>
							</View>
						</View>
					);
				})}

				<View style={[arrangeRow, { justifyContent: 'space-between' }]}>
					<Text style={[styles.cartText, { fontSize: 14 }]}>Total</Text>
					<Text style={[styles.cartText, { fontSize: 14 }]}>£{cartTotalAmt.toFixed(2)}</Text>
				</View>
				<View style={[styles.action, { marginBottom: 15 }]}>
					{isLoading ? (
						<ActivityIndicator size="large" color={Colors.primary} />
					) : (
						<MyBtn
							disabled={isDisabled}
							title={'Complete Your Order'}
							bgColor={Colors.btn}
							textColor={'#fff'}
						/>
					)}
				</View>
					<TopRecentCoffees />

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
			{/* </View> */}
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
		flex: 1,
		paddingHorizontal: 20,
		// justifyContent: 'center',
		// alignItems: 'center',
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
