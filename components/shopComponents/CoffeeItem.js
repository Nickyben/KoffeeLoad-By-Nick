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

import Btn from '../../components/UI/Btn';

import Colors from '../../constants/Colors';
import MyBtn from '../UI/MyBtn';
import TouchCard from '../UI/TouchCard';

const CoffeeItem = ({
	content: { id, ownerId, devicePushToken, title, image, description, price },
	category,
	onSelect,
}) => {
	let titleStyle = { ...styles.title };

	return (
		<TouchCard useIos onTouch={onSelect} style={styles.itemCard}>
			<View style={styles.itemMargin}>
				<View style={styles.itemContainer}>
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
									{price}
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
							bgColor={'#523a28'}
							borderColor={Colors.primary}
							onPress={onSelect}
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
		paddingHorizontal: 5,
	},
	itemContainer: {
		width: '100%',
		height: '100%',
		alignItems: 'center',
		justifyContent: 'center',
		paddingBottom: 10,
		backgroundColor: '#E4D4C8',
		borderRadius: 10,
	},
	imageContainer: {
		padding: 5,
		paddingVertical: 10,
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
		width: 90, //please please, set these with respect to window size
		height: 70,
		borderRadius: 10,
		//borderWidth: 2,
	},
	title: {
		fontFamily: 'OpenSansBold',
		fontSize: 12,
		color: '#22f',
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
