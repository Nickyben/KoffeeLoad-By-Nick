import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ScrollView, View, Text, Image, Button, StyleSheet, ImageBackground } from 'react-native';

import Colors from '../../constants/Colors';
import * as cartActions from '../../store/actions/cartAction';
import TopRecentCoffees from '../../components/shopComponents/TopRecentCoffees';
import ChatInput from '../../components/UI/ChatInput';
import MyBtn from '../../components/UI/MyBtn';
import TouchIcon from '../../components/UI/TouchIcon';

const CoffeeDetailScreen = ({ route }) => {
	const prodId = route.params.itemId;
	const dispatch = useDispatch();
	const selectedProduct = useSelector((state) =>
		state.productsRed.availableProducts.find((prod) => prod.id === prodId)
	);
	const { id, image, price, description, title } = selectedProduct;
	const loadSearchesHandler = (text) => {};

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
			<ScrollView
				style={styles.scroll}
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{ width: '100%', maxWidth: 500, alignSelf: 'center' }}>
				<View style={styles.row}>
					<View style={styles.imageContainer2}>
						<ImageBackground source={image} style={styles.image2}>
							<Text style={styles.ourCoffee}>{title}</Text>
						</ImageBackground>
					</View>
				</View>
				<View style={styles.row}>
					<Text style={styles.description}>{description}</Text>
					<Text style={styles.id}>SKU: {id}</Text>
					<Text style={styles.price}>£{price.toFixed(2)}</Text>
				</View>
				<View style={styles.actions}>
					<View style={[{flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius:5, padding:7, paddingHorizontal:12}]}>
						<TouchIcon
							color={'#222'}
							useIosIcon
							name={'arrow-down'}
							size={23}
							onTouch={() => {
							}}
						/>
						<Text style={[styles.price,{fontSize:18}]}>1</Text>
					</View>
					<View style={[styles.action,{}]}>
						<MyBtn
							padding={15}
							bgColor={Colors.btn}
							textColor={'white'}
							title="Add To Cart"
							onPress={() => {
								//this btn is wrongly clicked from navigating screen. please report or update
								dispatch(cartActions.addToCart(selectedProduct));
							}}
						/>
					</View>
				</View>
				<TopRecentCoffees isTopSelling />
			</ScrollView>
		</View>
	);
};

//ProductDetail.navigationOptions
export const screenOptions = ({ route }) => {
	return {
		headerTitle: '',
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
	scroll: {},
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

	imageContainer2: {
		width: '100%',
		height: 196,
		borderRadius: 10,
		overflow: 'hidden',
	},

	row: {
		marginTop: 15,
		width: '100%',
		padding: 0,
		// backgroundColor: 'red',
	},

	image2: {
		flex: 1,
		justifyContent: 'flex-end',
		borderRadius: 10,
		width: '100%',
		height: '100%',
	},
	ourCoffee: {
		textAlign: 'center',
		width: '100%',
		backgroundColor: '#222b',
		fontFamily: 'OpenSansBold',
		fontSize: 22,
		color: '#fff',
		padding: 5,
	},
	price: {
		fontFamily: 'OpenSansBold',
		fontSize: 20,
	},
	description: {
		fontSize: 12,
	},
	id: { marginTop: 10, fontFamily: 'OpenSansBold', fontSize: 12 },
	actions: {
		flexDirection: 'row',
		marginVertical: 10,
		alignItems: 'center',
	},
	button: {
		borderRadius: 8,
		overflow: 'hidden',
	},
	action: {
		marginTop: 0,
		marginLeft: 15,
	},
});

export default CoffeeDetailScreen;
