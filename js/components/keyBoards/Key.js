import React, { Component, PureComponent } from 'react';
import {
    TouchableWithoutFeedback,
    Text,
    View,
} from 'react-native';
import * as StyleSheet from '../../utils/MyStyleSheet'
import Svg, {
    Path,
    G,
} from 'react-native-svg';

const r = 8 //半径
const vs = 15
const radio = 0.6
class Shape extends Component {
    render() {
        const sw = this.props.width
        const sh = this.props.heigh
        const bw = sw * 2
        const bh = bw
        const sx = 0
        const sy = 0
        const brectl = `q ${-r} 0 ${-r} ${r} l 0 ${bh - r - vs} c 0 ${vs * radio} ${(bw - sw) / 2} ${vs * (1 - radio)} ${(bw - sw) / 2} ${vs} l 0 ${sh - r}`
        const srect = `q 0 ${r / 2} ${r / 2} ${r / 2} l ${sw - r} 0 q ${r / 2} 0 ${r / 2} ${-r / 2} l 0 ${-(sh - r)}`
        const brectr = `c 0 ${-vs * radio} ${(bw - sw) / 2} ${-vs * (1 - radio)} ${(bw - sw) / 2} ${-vs} l 0 ${-bh + r + vs} q 0 ${-r} ${-r} ${-r} Z`
        const keyValue = this.props.keyValue
        return (
            <View style={{ position: "absolute", left: -(bw - sw) / 2, top: -bh + 4 }}>
                <Svg
                    height={sh + bh}
                    width={bw}
                    style={[styles.keyBorder]}
                >
                    <G scale="1">
                        <Path
                            d={`M ${sx + r} ${sy} ${brectl} ${srect} ${brectr}`}
                            fill="white"
                        />
                    </G>
                </Svg>
                <View style={{position:"absolute", left:0, top:0, width:bw, height:bh, justifyContent:'center', alignItems:'center'}}>
                    <Text style={styles.keyText}>{keyValue}</Text>
                </View>
            </View>
        )
    }
}

export default class Key extends PureComponent {

    constructor(props) {
        super(props)
        this.state = { showBig: false }
    }

    _onPressIn = () => {
        console.log('on press in')
        this.setState({ ...this.state, showBig: true })
    }

    _onPressOut = () => {
        console.log('on press out')
        this.setState({ ...this.state, showBig: false })
    }

    render() {
        return (
            <TouchableWithoutFeedback onPress={() => this.props.onKeyPress(this.props.keyValue)} onPressIn={this._onPressIn} onPressOut={this._onPressOut}>
                <View style={[styles.key, styles.keyBorder, { width: this.props.keyWidth }]}>
                    <Text style={styles.keyText}>{this.props.keyValue}</Text>
                    {this.state.showBig ? <Shape width={this.props.keyWidth} heigh={rowHeight - 2 * vSpacing} keyValue={this.props.keyValue} /> : null}
                </View>
            </TouchableWithoutFeedback>
        )
    }
}

const rowHeight = 54
const vSpacing = 6
const styles = StyleSheet.create({
    key: {
        backgroundColor: 'white',
        borderRadius: 4,
        height: rowHeight - vSpacing * 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    keyBorder: {
        ios: {
            shadowColor: 'gray',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 1,
            shadowRadius: 1,
        },
        android: {
            borderColor: 'black',
            borderWidth: StyleSheet.hairlineWidth,
        }
    },
    keyText: {
        color: 'black',
        fontSize: 18,
        backgroundColor:'#00000000'
    },
})