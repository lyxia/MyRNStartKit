import React, { Component } from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
} from 'react-native';

import { register, insertText, doDelete, backSpace, clearFocus } from 'react-native-custom-keyboard';
import Keyboard from 'react-native-keyboard';

class MyKeyboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      curKeyBoard: 'number'
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

  _onLayout = (nativeEvent) => {
    console.log('hello')
  }

  _clearFocus = () => {
    clearFocus(this.props.tag)
  }

  _renderKeyBoard = () => {
    if (this.state.curKeyBoard === 'number') {
      return (
        <Keyboard
          keyboardType="decimal-pad"
          onClear={this._handleClearAll}
          onDelete={this._handleDelete}
          onKeyPress={this._handleKeyPress}
          onChangeABC={()=>this._handleChangeKeyboard('ABC')}
          disableOtherText={true}
        />
      )
    } else if (this.state.curKeyBoard === 'ABC') {
      return (
        <ABCKeyBoard 
          changeKeyboard={(type)=>this._handleChangeKeyboard(type)}
          onKeyPress={this._handleKeyPress}
          onDelete={this._handleDelete}
        />
      )
    }
  }

  render() {
    return (
      <View style={styles.container} onLayout={this._onLayout}>
        <View>
          <TouchableOpacity onPress={this._clearFocus}><Text>完成</Text></TouchableOpacity>
        </View>
        {this._renderKeyBoard()}
      </View>
    );
  }
}

register('hello', () => MyKeyboard);

class ABCKeyBoard extends Component {
  constructor(props) {
    super(props)

    this.state = { width: 0, isUP: false }
    this.keyWidth = 0;
  }

  _changeUPOrDown = () => {
    //大小写转换
    this.setState({ ...this.state, isUP: !this.state.isUP })
  }

  _renderDel = () => {
    //绘制删除键
  }

  _renderNumber = () => {
    //转换数字键盘
  }

  _renderChar = () => {
    //转换为符号键盘
  }

  _renderKey = (key) => {
    return (
      <TouchableOpacity onPress={()=>this.props.onKeyPress(key)} key={key}>
        <View style={[styles.key, { width: this.keyWidth }]}>
          <Text style={styles.keyText}>{key}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  //A code is 65
  //a code is 97
  _renderKeyBoard = () => {
    let startCode = 0
    if (this.state.isUP) {
      //渲染大写
      startCode = 65
    } else {
      //渲染小写
      startCode = 97
    }

    let rows = []
    let firstRowKeys = []
    for (var i = startCode; i < startCode + 10; i++) {
      firstRowKeys.push(this._renderKey(String.fromCharCode(i)))
    }
    let rowWidth = 10 * this.keyWidth + 4 * 9
    rows.push(
      <View style={[styles.row, styles.abcRow]} key={1}>
        <View style={{ width: rowWidth, flexDirection: 'row', justifyContent: 'space-around' }}>
          {firstRowKeys}
        </View>
      </View >
    )

    let secondRowKeys = []
    for (var i = startCode + 10; i < startCode + 19; i++) {
      secondRowKeys.push(this._renderKey(String.fromCharCode(i)))
    }
    rowWidth = 9 * this.keyWidth + 4 * 8
    rows.push(
      <View style={[styles.row, styles.abcRow]} key={2}>
        <View style={{ width: rowWidth, flexDirection: 'row', justifyContent: 'space-around' }}>
          {secondRowKeys}
        </View>
      </View >
    )

    let threeRowKeys = []
    for (var i = startCode + 19; i < startCode + 26; i++) {
      threeRowKeys.push(this._renderKey(String.fromCharCode(i)))
    }
    rowWidth = 7 * this.keyWidth + 4 * 6
    rows.push(
      <View style={[styles.row, styles.abcRow]} key={3}>
        <View style={{ justifyContent: 'space-between', width: this.state.width - 8, flexDirection: 'row' }}>
          <TouchableOpacity onPress={this._changeUPOrDown}>
            <View style={[styles.key, { width: 48 }]}>
              <Text>U/D</Text>
            </View>
          </TouchableOpacity>
          <View style={{ width: rowWidth, flexDirection: 'row', justifyContent: 'space-around' }}>
            {threeRowKeys}
          </View>
          <TouchableOpacity onPress={this.props.onDelete}>
            <View style={[styles.key, { width: 48 }]}>
              <Text>Back</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View >
    )

    let spaceWidth = rowWidth - (2 * this.keyWidth + 2 * 4)
    let accessWidth = (this.state.width - 16 - spaceWidth) / 2
    rows.push(
      <View style={[styles.row, styles.abcRow]} key={4}>
        <View style={{ justifyContent: 'space-between', width: this.state.width - 8, flexDirection: 'row' }}>
          <TouchableOpacity onPress={() => this.props.changeKeyboard('number')}>
            <View style={[styles.key, { width: accessWidth }]}>
              <Text>123</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.props.onKeyPress(' ')}>
            <View style={[styles.key, { width: spaceWidth }]} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.props.changeKeyboard('char')}>
            <View style={[styles.key, { width: accessWidth }]}>
              <Text>#+=</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    )

    return rows;
  }

  _onLayout = ({ nativeEvent }) => {
    const width = nativeEvent.layout.width;
    if (width > 0 && width !== this.state.width) {
      this.keyWidth = (width - 11 * 4) / 10;
      this.setState({ ...this.state, width })
    }
  }

  render() {
    return (
      <View onLayout={this._onLayout} style={styles.keyboard}>
        {this.state.width === 0 ? null : this._renderKeyBoard()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'gray',
  },
  keyboard: {
    backgroundColor: 'gray',
  },
  row: {
    height: 54,
    flexDirection: 'row',
  },
  abcRow: {
    justifyContent: 'center',
  },
  key: {
    backgroundColor: 'white',
    borderRadius: 4,
    shadowColor: 'gray',
    height: 46,
    shadowOffset: { width: 0, height: 2 },
    justifyContent: 'center',
    alignItems: 'center',
  },
  keyText: {

  },
})