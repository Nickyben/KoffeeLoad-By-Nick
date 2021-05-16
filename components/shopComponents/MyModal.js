import React from 'react';
import { StyleSheet, View, Text, Modal, ScrollView } from 'react-native';
import { useState } from 'react';
import Colors from '../../constants/Colors';
import TouchCard from '../UI/TouchCard';
import Btn from '../UI/Btn';
import Card from '../UI/Card';
import Touch from '../UI/Touch';

const MyModal = ({
	children,
	showModal,
	handleRequestClose,
	modalType,
	headerText,
	submitBtn,
	topAlertBox,
	bottomAlertBox,
	alertBoxContent,
}) => {
	return (
		<Modal animationType={'fade'} visible={showModal} transparent onRequestClose={handleRequestClose}>
			<TouchCard activeOpacity={1} useIos disableCard onTouch={handleRequestClose} style={{ flex: 1 }}>
				{/* <ScrollView> */}
				<>
					{!(topAlertBox || bottomAlertBox) && (
						<View style={{ ...styles.contentBoxContainer }}>
							<View style={styles.contentBox}>
								{!submitBtn && headerText && <Text style={styles.contentBoxHeader}>{headerText}</Text>}
								{submitBtn && (
									<View style={styles.contentBoxHeaderWithBtn}>
										{headerText && <Text style={styles.headerText}>{headerText}</Text>}
										{submitBtn && <Btn onPress={handleRequestClose}>{submitBtn}</Btn>}
									</View>
								)}

								<ScrollView style={{ flex: 0 }}>{children}</ScrollView>
							</View>
						</View>
					)}
					{(topAlertBox || bottomAlertBox) && (
						<View
							style={{
								flex: 1,
								backgroundColor: '#000b',
								justifyContent: bottomAlertBox ? 'flex-end' : 'flex-start',
							}}>
							<View
								style={{
									width: '100%',
									height: '60%',
									justifyContent: bottomAlertBox ? 'flex-end' : 'flex-start',
								}}>
								<Card
									style={{
										width: '100%',
										//height: '100%',
										borderTopLeftRadius: bottomAlertBox ? 15 : 0,
										borderTopRightRadius: bottomAlertBox ? 15 : 0,
										borderBottomLeftRadius: topAlertBox ? 15 : 0,
										borderBottomRightRadius: topAlertBox ? 15 : 0,
										backgroundColor: '#fff', //Colors.primary + '77',
										paddingHorizontal: 0,
										
									}}>
									<ScrollView style={{}}>{children}</ScrollView>
								</Card>
							</View>
						</View>
					)}
				</>

				{/* </ScrollView> */}
			</TouchCard>
		</Modal>
	);
};

export const screenOptions = () => {
	return {};
};

const styles = StyleSheet.create({
	screen: {},
	contentBoxContainer: {
		flex: 1,
		backgroundColor: '#000b',
		justifyContent: 'center',
		alignItems: 'center',
		paddingVertical: 10,
	},
	scroll: {
		flex: 1,
		width: '100%',
		backgroundColor: 'red',
		justifyContent: 'center',
		alignItems: 'center',
	},
	contentBox: {
		backgroundColor: '#fff',
		width: '80%',
		minHeight: 150,
		maxHeight: '70%',
		borderRadius: 10,
		paddingTop: 0,
		paddingBottom: 15,
		justifyContent: 'center',
		//alignItems: 'center',
	},
	contentBoxHeader: {
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10,
		textAlign: 'center',
		fontFamily: 'OpenSansBold',
		fontSize: 17,
		padding: 15,
		width: '100%',
		backgroundColor: Colors.switchPrimary,
		color: Colors.switchWhite,
		borderBottomColor: '#e3e6e7',
		borderBottomWidth: 1,
	},
	contentBoxHeaderWithBtn: {
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: 15,
		width: '100%',
		backgroundColor: Colors.switchPrimary,
		borderBottomColor: '#e3e6e7',
		borderBottomWidth: 1,
	},
	headerText: {
		flex: 1,
		textAlign: 'center',
		fontFamily: 'OpenSansBold',
		fontSize: 17,
		color: Colors.switchWhite,
	},
});

export default MyModal;
