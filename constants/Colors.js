import {Platform } from 'react-native';

//for android
let primary = '#d0b49f'; 
let accent = '#A47551';
let btn = '#523a28';
let switchColor = primary
let switchColorWhite = 'white';
let switchAccent = accent;
let switchWhiteAccent = '#d5d5d5';


//for ios
// if(Platform.OS === 'ios'){
//     switchColor = 'white'
//     switchColorWhite= primary;
//     switchAccent = '#d5d5d5'
//     switchWhiteAccent = accent;
// }




export default {
    
    accent: accent,
    primary:primary,
    btn: btn,
    switchPrimary: switchColor,
    switchWhite : switchColorWhite,
    switchAccent: switchAccent,
    switchWhiteAccent: switchWhiteAccent,
};