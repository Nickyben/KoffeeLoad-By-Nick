import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux'; // another approach is importing and using the connect function
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Colors from '../../constants/Colors';
import TouchIcon from './TouchIcon';
import Touch from './Touch';
import MyModal from '../shopComponents/MyModal';
import CheckBox from './CheckBox';
import Btn from './Btn';
import ItemIcon from './ItemIcon';

const DropdownPicker = ({
	id,
	items,
	handleRequestClose,
	value,
	style,
	onChooseOption,
	hasFocus,
	onFocus,
	onBlur,
	pickerLabel,
	placeholder,
	pickerHeader,
	checkShape,
	multipleChoice,
	hideIcon,
	rectInput,
	icon,
}) => {
	const [pickerChoice, setPickerChoice] = useState(multipleChoice ? [] : '');
	const [openPicker, setOpenPicker] = useState(false);

	const dropDownChoiceHandler = ({ id, label }) => {
		if (multipleChoice) {
			const isAlreadyChecked = pickerChoice.find((choice) => choice.id === id);
			const updatedChoice = !!isAlreadyChecked
				? pickerChoice.filter((choice) => choice.id !== id)
				: pickerChoice.concat({ id, label });

			setPickerChoice(updatedChoice);
			onChooseOption && onChooseOption(updatedChoice.map((choice) => choice.label));
			//setOpenPicker(false);
		} else {
			const isAlreadyChecked = pickerChoice === id;
			const updatedChoice = !!isAlreadyChecked ? {id:'', label: ''} : { id, label };
			setPickerChoice(updatedChoice.id);
			onChooseOption && onChooseOption(updatedChoice.label);
			setOpenPicker(false);
		}
	};
	const openPickerHandler = () => {
		setOpenPicker((p) => !p);
	};
	useEffect(() => {
		if (openPicker) {
			onFocus && onFocus();
		} else {
			onBlur && onBlur();
		}
	}, [onFocus, onBlur, openPicker]);

	useEffect(() => {
		if (multipleChoice) {
		} else {
			const option = items.find((option) => option.label === value);
			!!option ? setPickerChoice(option.label) : setPickerChoice(value);
		}
	}, [multipleChoice, value, items]);

	return (
		<View style={{ ...style }} focusable>
			<Text style={styles.label}>{pickerLabel}</Text>
			<Touch
				onTouch={openPickerHandler}
				style={{
					...styles.openPickerContainer,
					borderBottomColor: hasFocus ? Colors.primary : styles.openPickerContainer.borderColor,
				}}>
				{!hideIcon && (
					<View style={{ marginLeft: rectInput ? 0 : 10 }}>
						<ItemIcon
							onTouch={icon && icon.touchable && icon.onTouch}
							bgColor={(icon && icon.bgColor) || Colors.primary + '22'}
							name={icon ? icon.iconName : 'clipboard'}
							borderRadius={icon && icon.bgBorderRadius}
							size={23}
							color={icon && icon.iconColor ? icon.iconColor : Colors.primary}
						/>
					</View>
				)}

				<Text style={{ ...styles.openPickerText, color: value ? '#333' : styles.openPickerText.color }}>
					{value ? value : placeholder}
				</Text>
				<ItemIcon
					onTouch={openPickerHandler}
					bgColor={'transparent'}
					name={openPicker ? 'arrow-dropup' : 'arrow-dropdown'}
					size={23}
					color={Colors.primary}
				/>
			</Touch>
			<MyModal
				showModal={openPicker}
				handleRequestClose={openPickerHandler}
				headerText={pickerHeader}
				submitBtn={multipleChoice ? 'Ok' : null}>
				{items.map(({ label }, index) => {
					const optionId = label;
					const isChecked = multipleChoice
						? pickerChoice.find((choice) => choice.id === optionId)
						: pickerChoice === optionId;

					return (
						<CheckBox
							key={index}
							type={'right'}
							shape={checkShape}
							title={label}
							checked={!!isChecked}
							checkedColor={Colors.primary}
							onCheck={dropDownChoiceHandler.bind(this, { id: optionId, label: label })}
						/>
					);
				})}
			</MyModal>
		</View>
	);
};

export const screenOptions = () => {
	return {};
};

const styles = StyleSheet.create({
	screen: {},

	openPickerContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		width: '100%',
		borderColor: '#bbb',
		borderBottomWidth: 1.5,
		borderRadius: 10,
	},
	openPickerText: {
		flex: 1,
		paddingHorizontal: 10,
		paddingVertical: 5,
		fontFamily: 'OpenSansRegular',
		fontSize: 18,
		color: '#ccc',
	},
	label: {
		marginTop: 10,
		marginBottom: 7,
		paddingHorizontal: 10,
		fontSize: 17,
		fontFamily: 'OpenSansBold',
		color: '#555',
	},
});

export default DropdownPicker;
