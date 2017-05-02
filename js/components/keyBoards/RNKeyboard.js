import React, { Component } from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  Image,
  StyleSheet,
  TextInput,
  Platform,
  findNodeHandle,
} from 'react-native';

import { register, insertText, doDelete, backSpace } from 'react-native-custom-keyboard';
//数字键盘
import NumberKeyBoard from './NumberKeyBoard';
//ABC键盘
import ABCKeyBoard from './ABCKeyBoard'
//符号键盘
import CharKeyBoard from './CharKeyBoard'
//提示
import KeyTip from './KeyTip'

import DisplayView from '../DisplayView'

function clearFocus(tag) {
  TextInput.State.blurTextInput(tag)
}

export default class MyKeyboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      curKeyBoard: 'number',
      width: 0,
      showTip: {isShow:false, layout:{x:0,y:0,width:0,height:0}, keyValue:""}
    }
  }

  _handleDelete = () => {
    this.backSpaceRequest = requestAnimationFrame(() => {
      backSpace(this.props.tag);
    })
  };

  _handleKeyPress = (key) => {
    this.insertTextRequest = requestAnimationFrame(() => {
      insertText(this.props.tag, key);
    })
  }

  _handerChangeABC = () => {
    this._handleChangeKeyboard('ABC')
  }

  _handleChangeKeyboard = (type) => {
    this.chageKeyboardRequest = requestAnimationFrame(() => {
      this.setState({ ...this.state, curKeyBoard: type })
    })
  }

  _clearFocus = () => {
    this.clearFocusRequest = requestAnimationFrame(() => {
      clearFocus(this.props.tag)
    })
  }

  componentWillUnmount() {
    this.clearFocusRequest && cancelAnimationFrame(this.clearFocusRequest)
    this.chageKeyboardRequest && cancelAnimationFrame(this.chageKeyboardRequest)
    this.insertTextRequest && cancelAnimationFrame(this.insertTextRequest)
    this.backSpaceRequest && cancelAnimationFrame(this.backSpaceRequest)
  }

  _renderNumberKeyBoard = (width) => {
    return (
      <DisplayView
        keepAlive={true}
        enable={this.state.curKeyBoard === 'number'}
      >
        <NumberKeyBoard
          keyboardType="decimal-pad"
          onDelete={this._handleDelete}
          onKeyPress={this._handleKeyPress}
          onChangeABC={this._handerChangeABC}
          disableOtherText={true}
        />
      </DisplayView>
    )
  }

//{isShow, ref, keyValue}
  _showTip = (showTipData) => {
    if(showTipData.isShow) {
      showTipData.ref.measureLayout(findNodeHandle(this.refs.keyboard), (left, top, width, height) => {
          console.log(`key: ${showTipData.keyValue} left:${left} top:${top} width:${width} height:${height}`)
          //{isShow:false, layout:{x:0,y:0,width:0,height:0}, keyValue:""}
          this.setState({...this.state, showTip:{...showTipData, layout:{x:left, y:top, width, height}}})
      })
    } else {
      this.setState({...this.state, showTip:showTipData})
    }
  }

  _renderABCKeyBoard = (width) => {
    return (
      <DisplayView
        keepAlive={true}
        enable={this.state.curKeyBoard === 'ABC'}
      >
        <ABCKeyBoard
          width={width}
          changeKeyboard={this._handleChangeKeyboard}
          onKeyPress={this._handleKeyPress}
          onDelete={this._handleDelete}
          onClearAll={this._handlerClearAll}
          showTip={this._showTip}
        />
      </DisplayView>
    )
  }

  _renderCharKeyBoard = (width) => {
    return (
      <DisplayView
        keepAlive = {true}
        enable = {this.state.curKeyBoard === 'char'}
      >
        <CharKeyBoard
          width={width}
          changeKeyboard={this._handleChangeKeyboard}
          onKeyPress={this._handleKeyPress}
          onDelete={this._handleDelete}
          onClearAll={this._handlerClearAll}
          showTip={this._showTip}
        />
      </DisplayView>
    )
  }

  _renderTip = () => {
    const {isShow, layout, keyValue} = this.state.showTip
    return isShow ? 
          (
            <KeyTip
              layout = {layout}
              keyValue = {keyValue}
            />
          )
          :
          null
  }

  _onLayout = ({ nativeEvent }) => {
    const width = nativeEvent.layout.width
    let height = nativeEvent.layout.height
    console.log(`width: ${width} height: ${height}`)
    if(Platform.OS === "android") {
      height = height - 54
    }
    if (width > 0 && width !== this.state.width && height === 252) {
      this.setState({ ...this.state, width })
    }
  }

  render() {
    return (
      <View onLayout={this._onLayout} style={styles.container} ref="keyboard" pointerEvents="box-none">
        {
          this.state.width > 0 ?
            (
              <View style={[styles.keyBoard, {height:252}]} key="keyboard">
                <View style={styles.top}>
                  <View style={styles.topLeft}>
                    <Image source={require('./images/anquanbaohu.png')}/>
                    <Text style={styles.topDesText}>安全键盘</Text>
                  </View>
                  <TouchableOpacity onPress={this._clearFocus}>
                    <Text style={styles.topCompleteText}>完成</Text>
                  </TouchableOpacity>
                </View>
                {this._renderNumberKeyBoard(this.state.width)}
                {this._renderABCKeyBoard(this.state.width)}
                {this._renderCharKeyBoard(this.state.width)}
              </View>
            )
            :
            null
        }
        {this._renderTip()}
      </View>
    );
  }
}

register('hello', () => MyKeyboard)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'flex-end',
  },
  keyBoard: {
    backgroundColor: '#f6f5f2',
  },
  top: {
    height: 36,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#a5a5a5',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  topLeft: {
    paddingLeft: 15,
    flexDirection: 'row',
  },
  topDesText: {
    color: '#adadad',
    fontSize: 15,
    paddingHorizontal: 8,
  },
  topCompleteText: {
    color: '#0297fa',
    fontSize: 15,
    paddingHorizontal: 15,
    paddingVertical: 10,
  }
})