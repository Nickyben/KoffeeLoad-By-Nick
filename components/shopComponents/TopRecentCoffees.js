import React from 'react';
import {
	Platform,
	View,
	Text,
	StyleSheet,
	Image,
	Button,
	FlatList,
	TouchableOpacity,
	TouchableNativeFeedback,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import Colors from '../../constants/Colors';
import Card from '../UI/Card';
import CoffeeItem from './CoffeeItem';
import { useSelector } from 'react-redux';

const TopRecentCoffees = ({ isTopSelling }) => {
	const navigation = useNavigation();
	const coffeeData = isTopSelling
		? useSelector((state) => state.productsRed.availableProducts).filter((cof) => cof.isTopSelling === true)
		: useSelector((state) => state.productsRed.availableProducts).filter((cof) => cof.isTopSelling === true);

	const renderItem = (
		category,
		{ item, index } //auto gets data in obj form , I deStructured it in params
	) => {
		return (
			<View
				style={{
					flex: 1,
					alignItems: 'stretch',
					marginLeft: index === 0 ? -5 : 0,
					width: '33.3%',
				}}>
				<CoffeeItem
					backgroundColor={isTopSelling ? null : '#E4D4C8'}
					content={item}
					category={category}
					onSelect={() => {
						navigation.navigate('CoffeeDetail', { itemId: item.id, title: item.constructor.name });
					}}
				/>
			</View>
		);
	};

	return (
		<View style={styles.row2}>
			<Text style={styles.rowLabel}>{isTopSelling ? 'Top Selling Coffee' : 'Recently Viewed'}</Text>
			<FlatList
				showsHorizontalScrollIndicator={false}
				//initialNumToRender, refreshing
				keyExtractor={(item, index) => item.id}
				data={coffeeData}
				renderItem={renderItem.bind(this, 'coffee')}
				horizontal={true}
				contentContainerStyle={styles.listContainer}
				style={styles.flatListStyle}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	row2: {
		flex: 1,
		width: '100%',
	},
	rowLabel: {
		marginTop: 10,
		fontFamily: 'OpenSansBold',
		fontSize: 14,
		color: '#222',
	},
	listContainer: {
		flex: 1,
		
	
		
		//justifyContent: 'space',
		//justifyContent: 'center',
	},
	flatListStyle: { flex: 1,flexDirection: 'row',	paddingVertical: 15,
	},
});
export default TopRecentCoffees;
