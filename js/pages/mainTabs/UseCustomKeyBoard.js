//首页
import React, { Component } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    StyleSheet,
    TextInput,
    findNodeHandle,

} from 'react-native'

import './RNKeyboard'
import { CustomTextInput, install } from 'react-native-custom-keyboard';

export default class UseCustomKeyBoard extends Component {

    static navigationOptions = {
        title: '使用自定义键盘',
        tabBar: { visible: false }
    };

    constructor(props) {
        super(props)
        this.state = { showKeyboard: false, text: 'text text' };
    }

    onChangeText = (text) => {
        this.setState({ text: text })
    }

    render() {
        return (
            <View style={styles.root}>
                <CustomTextInput ref={this.onRef} style={styles.textInput} customKeyboardType="hello" value={this.state.text} onChangeText={this.onChangeText} />
                <TextInput style={styles.textInput} defaultValue={'default 1 value'} />
                <TextInput style={styles.textInput} defaultValue={'default 2 value'} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
    },
    textInput: {
        height: 50,
    }
})