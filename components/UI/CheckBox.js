import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';// another approach is importing and using the connect function
import {
  StyleSheet, Text,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Colors from '../../constants/Colors';
import TouchIcon from '../../components/UI/TouchIcon';
import Touch from '../../components/UI/Touch';

const CheckBox = ({ title, shape, type, checkedColor, textStyle, itemStyle,
  checked, size, onCheck, disabled, useIos }) => {

  return (
    <Touch
      onTouch={onCheck}
      useIos={useIos}
      disabled={disabled} style={{
        flexDirection: 'row',
        justifyContent: type === 'right' ? 'space-between' : 'flex-start',
        paddingHorizontal: 20, paddingVertical: 3,
        ...itemStyle,
      }}>
      {type === 'right' && <Text style={{
        ...styles.titleStyle, ...textStyle,
        color: disabled ? ('#888') : ('#333'),
      }}>{title}</Text>}
      <View style={{
        marginRight: type === 'right' ? 0 : 20,
        alignItems: 'flex-start'
      }}>
        <TouchIcon
          useIos={useIos}
          disabled={disabled}
          onTouch={onCheck}
          touched={() => checked}
          name={Ionicons}
          size={size ? size : 24}
          color={
            disabled ? (checkedColor ? checkedColor + '77' : Colors.primary + '77') :
              (checkedColor ? checkedColor : Colors.primary)
          }
          toggleIcons={
            shape ? (shape === 'circle' ? ['radio-button-off', 'radio-button-on'] :
              ['square-outline', 'checkbox']) :
              ['square-outline', 'checkbox']
          }

        >
        </TouchIcon>
      </View>
      {(!type || type === 'left') &&
        <Text style={{
          ...styles.titleStyle, ...textStyle,
          color: disabled ? ('#888') : ('#333'),
        }}>{title}</Text>}


    </Touch>

  )
};

export const screenOptions = () => {
  return ({});
};

const styles = StyleSheet.create({
  screen: {},
  titleStyle: {
    fontFamily: 'OpenSansBold',
    color: '#333',
    fontSize: 15,

  }
});

export default CheckBox;



