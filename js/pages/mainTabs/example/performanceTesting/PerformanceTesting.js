//首页
import React, { Component } from 'react'
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
} from 'react-native'

export default class Example extends Component {

    static navigationOptions = {
        title: '性能测试',
        tabBarVisible: false,
    };

    _gotoBase = () => {
        const {navigate} = this.props.navigation
        navigate('BaseComponentDemo')
    }

    _gotoPure = () => {
        const {navigate} = this.props.navigation
        navigate('PureComponentDemo')
    }

    _gotoAmoutView = () => {
        const {navigate} = this.props.navigation
        navigate('AmountViewDemo')
    }

    render() {
        return (
            <View style={styles.root}>
                <View>
                    <TouchableOpacity onPress={this._gotoBase}>
                        <Text>BaseComponentDemo</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this._gotoPure}>
                        <Text>PureComponentDemo</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this._gotoAmoutView}>
                        <Text>AmountViewDemo</Text>
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