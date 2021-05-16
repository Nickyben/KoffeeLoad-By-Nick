import React, { } from 'react';
import {
  StyleSheet,
  View, Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import Touch from './Touch';

const ItemIcon = ({ size, name, color, style, borderColor, bgColor, bigBackground, onTouch, borderRadius}) => {

  if (onTouch) {
    return (
      <View style={{
        borderRadius: borderRadius || 5,
        overflow: 'hidden',
        ...style,
      }}>
        <Touch
          onTouch={onTouch}
          style={{
            borderColor: borderColor,
            borderWidth: borderColor ? 1 : 0,
            width: bigBackground ? size + 28 : size + 10,
            height: bigBackground ? size + 25 : size + 10,
            backgroundColor: bgColor ? bgColor : Colors.primary + '22',
            alignItems: 'center',
            justifyContent: 'center',
          }}

        >
          <Ionicons
            name={
              Platform.OS === 'android' ? `md-${name}` : `ios-${name}`
            }
            size={size}
            color={color}
          />
        </Touch>
      </View>

    );
  }

  return (
    <View style={{
      borderRadius: borderRadius || 5,
      overflow: 'hidden',
      borderColor: borderColor,
      borderWidth: borderColor ? 1 : 0,
      width: bigBackground ? size + 28 : size + 10,
      height: bigBackground ? size + 25 : size + 10,
      backgroundColor: bgColor ? bgColor : Colors.primary + '22',
      alignItems: 'center',
      justifyContent: 'center',
      ...style,
    }}>
      <Ionicons
        name={
          Platform.OS === 'android' ? `md-${name}` : `ios-${name}`
        }
        size={size}
        color={color}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    overflow: 'hidden',

  }
});

export default ItemIcon;
