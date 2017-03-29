//首页
import React, {Component} from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} from 'react-native'

export default class Home extends Component {
    static navigationOptions = {
        title: '首页'
    };

    _gotoContent = () => {
        const {navigate} = this.props.navigation
        navigate('Content', 1)
    }

    render() {
        return (
            <View style = {styles.root}>
                <Text>首页</Text>
                <TouchableOpacity onPress={this._gotoContent}>
                    <Text>进入内容页</Text>
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