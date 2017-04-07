//首页
import React, { Component } from 'react'
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
} from 'react-native'

import './RNKeyboard'
import { CustomTextInput, install } from 'react-native-custom-keyboard';

export default class Example extends Component {

    static navigationOptions = {
        title: '示例',
    };

    _gotoUseCustomKeyBoard = () => {
        const {navigate} = this.props.navigation
        navigate('UseCustomKeyBoard')
    }

    _gotoNumberKeyBoard = () => {
        const {navigate} = this.props.navigation
        navigate('NumberKeyBoard')
    }

    render() {
        return (
            <View style={styles.root}>
                <View>
                    <TouchableOpacity onPress={this._gotoUseCustomKeyBoard}>
                        <Text>UseCustomKeyBoard</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this._gotoNumberKeyBoard}>
                        <Text>NumberKeyBoard</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
})