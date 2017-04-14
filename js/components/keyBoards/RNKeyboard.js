import React, { Component } from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  Image,
  StyleSheet,
} from 'react-native';

import { register, insertText, doDelete, backSpace, clearFocus } from 'react-native-custom-keyboard';
//数字键盘
import NumberKeyBoard from './NumberKeyBoard';
//ABC键盘
import ABCKeyBoard from './ABCKeyBoard'
//符号键盘
import CharKeyBoard from './CharKeyBoard'

import DisplayView from '../DisplayView'

class MyKeyboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      curKeyBoard: 'number',
      width: 0,
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
        />
      </DisplayView>
    )
  }

  _onLayout = ({ nativeEvent }) => {
    const width = nativeEvent.layout.width
    const height = nativeEvent.layout.height
    if (width > 0 && width !== this.state.width && height === 252) {
      this.setState({ ...this.state, width })
    }
  }

  render() {
    console.log('render RNKeyboard')
    return (
      <View onLayout={this._onLayout} style={styles.container}>
        {
          this.state.width > 0 ?
            (
              <View>
                <View style={styles.top}>
                  <View style={styles.topLeft}>
                    <Image source={require('./images/anquanbaohu.png')}/>
                    <Text style={styles.topDesText}>合富金融安全键盘</Text>
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
      </View>
    );
  }
}

register('hello', () => MyKeyboard)

const styles = StyleSheet.create({
  container: {
    flex: 1,
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