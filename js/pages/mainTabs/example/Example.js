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
        title: '示例',
    };

    _gotoUseCustomKeyBoard = () => {
        const {navigate} = this.props.navigation
        navigate('UseCustomKeyBoard')
    }

    _gotoPerformanceDemo = () => {
        const {navigate} = this.props.navigation
        navigate('PerformanceTesting')
    }

    render() {
        return (
            <View style={styles.root}>
                <View>
                    <TouchableOpacity onPress={this._gotoUseCustomKeyBoard}>
                        <Text>UseCustomKeyBoard</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this._gotoPerformanceDemo}>
                        <Text>PerformanceTesting</Text>
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