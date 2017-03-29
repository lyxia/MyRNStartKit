//设置页面
import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native'
import codePush from 'react-native-code-push'

export default class Setting extends Component {
    static navigationOptions = {
        title: '设置'
    };

    _syncUpdata = () => {
        codePush.sync({
            updateDialog: true,
            installMode: codePush.InstallMode.ON_NEXT_RESTART
        });
    }

    render() {
        return (
            <View style={styles.root}>
                <Text>设置</Text>
                <TouchableOpacity onPress={this._syncUpdata}>
                    <Text>Touch for update</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
})