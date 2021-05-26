import React from 'react';
import {
	Platform,
	View,
	Text,
	StyleSheet,
	Image,
	Button,
	TouchableOpacity,
	TouchableNativeFeedback,
} from 'react-native';
import { useDispatch } from 'react-redux';

import Btn from '../../components/UI/Btn';

import Colors from '../../constants/Colors';
import { addToCart } from '../../store/actions/cartAction';
import MyBtn from '../UI/MyBtn';
import TouchCard from '../UI/TouchCard';

const CoffeeItem = ({ content, category, width, flex, backgroundColor, onAddToCart, onSelect }) => {
	const dispatch = useDispatch();
	const { id, ownerId, devicePushToken, title, image, description, price } = content;
	let titleStyle = styles.title;

	return (
		<TouchCard useIos onTouch={onSelect} style={styles.itemCard}>
			<View style={styles.itemMargin}>
				<View
					style={{
						flex: flex ? flex : 1,
						width: width ? width : '100%',
						//height: '100%',
						alignItems: 'center',
						justifyContent: 'center',
						paddingBottom: 10,
						backgroundColor: backgroundColor ? backgroundColor : '#E4D4C8',
						borderRadius: 10,
					}}>
					<View style={styles.imageContainer}>
						<Image style={styles.listImage} source={image} />
					</View>
					<View style={styles.infoContainer}>
						<View style={styles.titleContainer}>
							{title && (
								<Text style={titleStyle} numberOfLines={2}>
									{title}
								</Text>
							)}

							{price && (
								<Text style={styles.title2} numberOfLines={2}>
									{'£'}
									{price.toFixed(2)}
								</Text>
							)}
						</View>

						<MyBtn
							title={'Add To Cart'}
							padding={5}
							horizPadding={10}
							fontSize={12}
							fontFamily={'OpenSansRegular'}
							style={styles.btn}
							bgColor={Colors.btn}
							borderColor={Colors.primary}
							onPress={
								onAddToCart
									? onAddToCart
									: () => {
											dispatch(addToCart(content));
									  }
							}
							textColor={Colors.primary}
						/>
					</View>
				</View>
			</View>
		</TouchCard>
	);
};

const styles = StyleSheet.create({
	itemCard: {
		padding: 0,
		flex: 1,
		//maxWidth: 300,

		borderRadius: 15,
	},
	itemMargin: {
		width: '100%',
		//height: '100%',
		paddingHorizontal: 5,
	},
	itemContainer: {},
	imageContainer: {
		//aspectRatio: 9/7,
		width: '100%',

		padding: 5,
		paddingVertical: 10,
		paddingBottom: 0,
	},
	infoContainer: {
		//flex: 1,
		width: '100%',
		marginTop: 0,
		//paddingBottom: 10,
		alignItems: 'center',
	},
	titleContainer: {
		width: '100%',
		maxWidth: 150,
		alignItems: 'center',
		padding: 10,
		paddingHorizontal: 0,
		paddingTop: 0,
	},
	listImage: {
		minWidth: 90, //please please, set these with respect to window size
		minHeight: 70,
		width: '100%',
		height: 'auto',
		borderRadius: 10,
		//aspectRatio: 9/7
		//borderWidth: 2,
	},
	title: {
		fontFamily: 'OpenSansBold',
		fontSize: 12,
		color: '#222',
	},
	title2: {
		fontFamily: 'OpenSansRegular',
		fontSize: 11,
		textAlign: 'center',
		color: '#444',
	},
	btn: {
		width: '100%',
		marginVertical: 10,
		padding: 5,
		borderRadius: 10,
	},
});
export default CoffeeItem;

// productCard: {
//         height: 350,//edit this with respect to device dimensions
//         margin: 20,
//     },
//     touchContainer: {
//         borderRadius: 10,
//         overflow: 'hidden',
//         height: '100%',
//     },
//     itemDetail: {
//         alignItems: 'center',
//         height: '20%',
//         padding: 10,
//         backgroundColor: '#ffdfcf',

//     },

//     title: {
//         fontFamily: 'OpenSansBold',
//         fontSize: 18,
//         marginVertical: 2,
//     },
//     price: {
//         fontFamily: 'OpenSansRegular',
//         fontSize: 16,
//         color: '#333',
//     },
//     actions: {
//         flex: 1,
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         height: '20%',
//         backgroundColor: '#fff7f7',
//         paddingHorizontal: 20,
//     },
//     buttons: {
//         borderRadius: 8,
//         overflow: 'hidden',
//     },
//     imageContainer: {
//         width: '100%',
//         height: '60%',
//         borderTopLeftRadius: 10,
//         borderTopRightRadius: 10,
//         overflow: 'hidden'
//     },
//     image: {
//         width: '100%',
//         height: '100%'
//     },
