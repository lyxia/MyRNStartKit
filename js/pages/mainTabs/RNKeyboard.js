import React, { Component } from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
} from 'react-native';

import { register, insertText, doDelete, backSpace, clearFocus } from 'react-native-custom-keyboard';
//数字键盘
import Keyboard from 'react-native-keyboard';
//ABC键盘
import ABCKeyBoard from '../../components/keyBoards/ABCKeyBoard'
//符号键盘
import CharKeyBoard from '../../components/keyBoards/CharKeyBoard'

class MyKeyboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      curKeyBoard: 'number',
      width: 0,
    }
  }

  _handleDelete = () => {
    backSpace(this.props.tag);
  };

  _handleKeyPress = (key) => {
    insertText(this.props.tag, key);
  }

  _handleClearAll = () => {

  }

  _handleChangeKeyboard = (type) => {
    this.setState({ ...this.state, curKeyBoard: type })
  }

  _clearFocus = () => {
    clearFocus(this.props.tag)
  }

  _renderKeyBoard = (width) => {
    if (this.state.curKeyBoard === 'number') {
      return (
        <Keyboard
          keyboardType="decimal-pad"
          onClear={this._handleClearAll}
          onDelete={this._handleDelete}
          onKeyPress={this._handleKeyPress}
          onChangeABC={() => this._handleChangeKeyboard('ABC')}
          disableOtherText={true}
        />
      )
    } else if (this.state.curKeyBoard === 'ABC') {
      return (
        <ABCKeyBoard
          width={width}
          changeKeyboard={(type) => this._handleChangeKeyboard(type)}
          onKeyPress={this._handleKeyPress}
          onDelete={this._handleDelete}
        />
      )
    } else if (this.state.curKeyBoard === 'char') {
      return (
        <CharKeyBoard
          width={width}
          changeKeyboard={(type) => this._handleChangeKeyboard(type)}
          onKeyPress={this._handleKeyPress}
          onDelete={this._handleDelete}
        />
      )
    }
  }

  _onLayout = ({ nativeEvent }) => {
    const width = nativeEvent.layout.width
    if (width > 0 && width !== this.state.width) {
      this.setState({ ...this.state, width })
    }
  }

  render() {
    return (
      <View onLayout={this._onLayout} style={styles.container}>
        {
          this.state.width > 0 ?
            (
              <View>
                <View style={styles.top}>
                  <TouchableOpacity onPress={this._clearFocus}><Text>完成</Text></TouchableOpacity>
                </View>
                {this._renderKeyBoard(this.state.width)}
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
    backgroundColor: 'gray',
  },
  top: {
    height: 36,
  }
})