import React from 'react';
import {
  StyleSheet,
  Text,
  View, TouchableOpacity, Platform,
  TouchableNativeFeedback
} from 'react-native';
import Card from './Card';

const TouchCard = props => {
  const { activeOpacity} = props;
  let TouchableCmp = TouchableOpacity;

  if ((Platform.OS === 'android' && Platform.Version >= 21) && !!props.useIos !== true) {
    TouchableCmp = TouchableNativeFeedback;
  }

  let CardDynamic = props.disableCard ? View : Card;

  return (
    <CardDynamic style={{
      ...styles.touchCard, ...props.style

    }}>
      <TouchableCmp
        activeOpacity={activeOpacity ? activeOpacity : 0.6}
        style={styles.touchable}
        onPress={props.onTouch}
      >
        {props.children}
      </TouchableCmp>
    </CardDynamic>
  );
};

const styles = StyleSheet.create({
  touchable: {
    flex: 1,

  },
  touchCard: {
    padding: 0,
    overflow: (Platform.OS === 'android' && Platform.Version >= 21)
      ? 'hidden'
      : 'visible',
  }
});

export default TouchCard;
