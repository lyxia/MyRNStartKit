import React, {Component} from 'react'
import {
    View,
    Text,
    StyleSheet,
} from 'react-native'

import {StateStyle} from './Style'
import ScrollEventEmitter from './ScrollEventEmitter'

export default class FooterRefreshView extends Component {
    //添加事件监听
    componentDidMount() {
        this.scrollSubscribe = ScrollEventEmitter.addListener('onScroll', this._onScroll)
    }

    componentWillUnmount() {
        ScrollEventEmitter.removeSubscription(this.scrollSubscribe)
    }

    _onScroll = (e) => {
        // console.log('footer know onscroll')
        // const visibleLength = this._selectLength(e.nativeEvent.layoutMeasurement);
        // const contentLength = this._selectLength(e.nativeEvent.contentSize);
        // const offset = this._selectOffset(e.nativeEvent.contentOffset);
    }

    render() {
        // const {state, process} = this.props
        const state = 'Idle'
        const style = StateStyle[state]
        
        return (
            <View style={style.View}>
                <Text style={style.Text}>{StateDes[state]}</Text>
            </View>
        )
    }
}

const StateDes = {"Idle":"上拉刷新", "Pulling":"松开即可刷新", "Refreshing": "正在刷新"}