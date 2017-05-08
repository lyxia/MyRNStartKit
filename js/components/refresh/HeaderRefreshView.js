import React, { Component, PureComponent } from 'react'
import {
    View,
    Text,
    StyleSheet,
    Animated,
} from 'react-native'

import { StateStyle } from './Style'
import ScrollEventEmitter from './ScrollEventEmitter'

export default class HeaderRefreshView extends PureComponent {
    constructor(props) {
        super(props)

        this._scrollY = new Animated.Value(0)
        this.state = {
            curState: 'Idle',
        }
    }

    //添加事件监听
    componentDidMount() {
        // setTimeout(()=>{
        //     Animated.timing(
        //         this._scrollY,
        //         {
        //             toValue: -400,
        //         }
        //     ).start()
        // }, 2000)
        this.scrollSubscribe = ScrollEventEmitter.addListener('onScroll',
            Animated.event(
                [{ nativeEvent: { contentOffset: { y: this._scrollY } } }]
            )
        )
        // this.scrollSubscribe = ScrollEventEmitter.addListener('onScroll', this._onScroll)
        this.scrollEndSubscribe = ScrollEventEmitter.addListener('onScrollEndDrag', this._onScrollEndDrag)
    }

    componentWillUnmount() {
        // ScrollEventEmitter.removeSubscription(this.scrollSubscribe)
        ScrollEventEmitter.removeSubscription(this.scrollEndSubscribe)
    }

    _onScroll = (e) => {
        // this.lastOffsetY = e.nativeEvent.contentOffset.y;
        // console.log(`offsetY = ${this.lastOffsetY}`)
        // this.setState((prevState) => {
        //     if (this.lastOffsetY > -40) {
        //         if (prevState.curState === 'Pulling') {
        //             return { curState: 'Idle' }
        //         }
        //     } else if (this.lastOffsetY < -40 && prevState.curState === 'Idle') {
        //         return { curState: 'Pulling' }
        //     }
        //     return prevState
        // })
    }

    _onScrollEndDrag = (e) => {
        // this.lastOffsetY = e.nativeEvent.contentOffset.y;
        // this.setState((prevState) => {
        //     if (prevState.curState === 'Pulling') {
        //         return { curState: 'Refreshing' }
        //     } else if (prevState.curState !== 'Refreshing') {
        //         return { curState: 'Idle'}
        //     }
        // })
    }

    render() {
        const style = StateStyle[this.state.curState]
        console.log(`curState: ${this.state.curState}`)
        return (
            <Animated.View style={[style.View, {
                height: 40,
                marginTop: this._scrollY.interpolate(
                    {
                        inputRange:[-40, 0],
                        outputRange:[0, -40],
                        extrapolate:'clamp',
                    }
                )
            }]}>
                <Text style={style.Text}>{StateDes[this.state.curState]}</Text>
            </Animated.View>
        )
    }
}

const StateDes = { "Idle": "下拉刷新", "Pulling": "松开即可刷新", "Refreshing": "正在刷新" }
