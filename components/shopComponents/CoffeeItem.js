import React from 'react';
import {
    Platform, View, Text, StyleSheet, Image,
    Button, TouchableOpacity, TouchableNativeFeedback
} from 'react-native';

import Btn from '../../components/UI/Btn';

import Colors from '../../constants/Colors';
import TouchCard from '../UI/TouchCard';


const CoffeeItem = ({
	content: { id, ownerId, devicePushToken, title, image, description, price },
	category,
	onSelect,
}) => {
	return (
		<TouchCard useIos onTouch={onSelect} style={styles.itemCard}>
			<View style={styles.itemContainer}>
				<View style={styles.imageContainer}>
					<Image
						style={{
							...styles.listImage,
							width: styles.listImage.width,
							borderRadius: 10,
						}}
						source={image}
					/>
				</View>
				<View style={styles.infoContainer}>
					<View style={styles.titleContainer}>
						{title && (
							<Text style={{ ...styles.title, color: '#00a7e7' }} numberOfLines={2}>
								{title}
							</Text>
						)}

						{price && (
							<Text style={{ ...styles.title, color: '#00a7e7' }} numberOfLines={2}>
								{price}
							</Text>
						)}
					</View>

					<Btn
						style={styles.btn}
						bgColor={'transparent'}
						borderColor={Colors.primary}
						onPress={onSelect}
						textColor={Colors.primary}>
						Add To Cart
					</Btn>
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
		backgroundColor: '#fff',
		marginRight: 10,
		borderRadius: 15,
	},
	itemContainer: {
		width: '100%',
		height: '100%',
		alignItems: 'center',
		justifyContent: 'center',
		paddingBottom: 10,
	},
	imageContainer: {
		padding: 15,
		paddingBottom: 0,
	},
	infoContainer: {
		//flex: 1,
		width: '100%',
		marginTop: 10,
		//paddingBottom: 10,
		alignItems: 'center',
	},
	titleContainer: {
		width: '100%',
		maxWidth: 150,
		alignItems: 'center',
		padding: 5,
		paddingHorizontal: 0,
	},
	listImage: {
		width: 150, //please please, set these with respect to window size
		height: 150,
		//borderRadius: 75,
		borderWidth: 2,
	},
	title: {
		fontFamily: 'OpenSansBold',
		fontSize: 13,
		textAlign: 'center',
		color: '#444',
	},
	btn: {
		width: '100%',
		marginVertical: 10,
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