import React from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

const Card = props => {
 if (props.disableCard ){
   return(
     <View style={{ ...myStyles.noCard, ...props.style }} >
       {props.children}
     </View>
   );
 }
  return (
    <View style={{ ...myStyles.card, ...props.style }} >
      {props.children}
    </View>
  );
};

const myStyles = StyleSheet.create({
  card: {
    shadowColor: 'black',
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.26,
    elevation: 2,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 5,
    

  },
  noCard:{
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 5,

  }
});

export default Card;
