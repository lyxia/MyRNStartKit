import React, {Component} from 'react'
import {
    View,
    Dimensions,
} from 'react-native'

import SafeKeyboard from '../../../js/components/keyBoards/RNKeyboard'
import {CustomTextInput} from 'react-native-custom-keyboard'

export default class KeyBoard extends Component {
    render() {
        return (
            <CustomTextInput customKeyboardType='hello' style={{width:200,height:50}} defaultValue='default value'/>
        )
    }
}