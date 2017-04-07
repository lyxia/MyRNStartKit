import React, { Component } from 'react'
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
} from 'react-native'
import { NavigationActions } from 'react-navigation'

export default class Login extends Component {
    static navigationOptions = {
        title: '登录'
    };

    _login = () => {
        const { dispatch } = this.props.navigation;
        const navigateAction = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'MainTab' })
            ]
        })
        dispatch(navigateAction)
    }

    render() {
        return (
            <View style={styles.root}>
                <Text>登录</Text>
                <TouchableOpacity onPress={this._login}>
                    <Text>点击登录</Text>
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
