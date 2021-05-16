









import React, { useState, useCallback, useEffect, useReducer, } from 'react';
import { TextInput, Text, View, StyleSheet, Platform, SafeAreaView } from 'react-native';
import { useDispatch } from 'react-redux';

import Colors from '../../constants/Colors';
import Input from './Input';
import TouchIcon from './TouchIcon';



const ChatInput = ({ onSubmit, onInputChange, elevated, style, iconLeftName, onLeftIconPress,
  iconRightName, hideRightIcon, leftIconBgColor, leftIconBgBorderRadius, ...others }) => {
  const [submitted, setSubmitted] = useState(false);
  const [chatInputState, setChatInputState] = useState('');




  const msgInputHandler = (text) => {// 
    setSubmitted(p => false)
    onInputChange && onInputChange(text);
    setChatInputState(p => text)

  }//, [setChatInputState])//, [dispatchFormAction]);



  const msgPushHandler = () => {
    chatInputState && onSubmit(chatInputState);
    chatInputState && setSubmitted(p => true)
  }

  const elevateStyle = elevated ? {
    shadowColor: 'black',
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.26,
    elevation: 10,
  } : {}


 

  return (
    <SafeAreaView style={{ ...styles.typingContainer, ...elevateStyle, ...style }} >
      <View style={styles.typingActions}>
      </View>

      <Input
        {...others}
        id={'chatScreenInput'}
        //onInputChange={msgInputHandler}
        onTextChanged={msgInputHandler}
        newValue={submitted ? '' : chatInputState}
        hideLabel hideFloatingLabel showErrorMsg={false} singleInput rectInput
        placeholder='Start typing message'
        icon={{
          iconName: iconLeftName || 'images', touchable: true,
          onTouch: (onLeftIconPress && onLeftIconPress.bind(this, chatInputState)) || (() => { }),
          bgColor: leftIconBgColor,
          bgBorderRadius: leftIconBgBorderRadius,
        }}
        style={{ flex: 1, width: '89%' }}
        inputStyle={{ height: '100%' }}
        inputContainerStyle={styles.inputContainerStyle}
        submitted={submitted}
        onEndEditing={(onLeftIconPress && onLeftIconPress.bind(this, chatInputState)) || (() => { })}

      />
      {!hideRightIcon &&
        <View style={styles.submitMsgAction}>
          <TouchIcon
            onTouch={msgPushHandler}
            bgColor={Colors.primary + '22'}
            borderColor={Colors.primary}
            bigBg
            name={iconRightName || 'send'}
            size={22}
            color={Colors.primary}
          />
        </View>
      }
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  typingContainer: {
    alignSelf: 'flex-end',
    backgroundColor: 'white',
    height: 60,
    width: '100%',
    position: 'absolute',
    bottom: 0,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    //borderTopWidth: 1,
    borderTopColor: '#ddd',//Colors.primary + '77',
  },

  typingActions: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'red',

  },
  inputContainerStyle: {
    backgroundColor: '#f7fafb',
    borderRadius: 20,
    borderBottomWidth: 0,
    height: '100%',
  },
  submitMsgAction: {
    width: '10%',
    height: '100%',
    borderRadius: 1000,
    // backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ChatInput;


