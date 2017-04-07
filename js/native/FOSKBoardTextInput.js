// import { 
//     requireNativeComponent
//  } from 'react-native';

// module.exports = requireNativeComponent('FOSKBoardTextInput');


import {
    TextInput,
    Platform,
} from 'react-native'

export default class FOSKBoardTextInput extends TextInput {
    onfocus = () => {
        //禁止系统键盘
        if(Platform.OS === 'android') {
            //android，获取到
            React.Children
        } else {
            //ios
        }
    }
}