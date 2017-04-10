import React, { Component } from 'react';
import {
  TouchableOpacity,
  Text,
  View,
} from 'react-native';
import * as StyleSheet from '../../utils/MyStyleSheet'

export default class ABCKeyBoard extends Component {
  constructor(props) {
    super(props)

    this.state = { isUP: false }
    this.keyWidth = 0;
  }

  _changeUPOrDown = () => {
    //大小写转换
    this.setState({ ...this.state, isUP: !this.state.isUP })
  }

  _renderUpDown = () => {
    //绘制大小写转换
    return (
      <TouchableOpacity onPress={this._changeUPOrDown}>
        <View style={[styles.key, styles.otherKey, { width: rowHeight - vSpacing * 2 }]}>
          <Text>U/D</Text>
        </View>
      </TouchableOpacity>
    )
  }

  _renderDel = () => {
    //绘制删除键
    return (
      <TouchableOpacity onPress={this.props.onDelete}>
        <View style={[styles.key, styles.otherKey, { width: rowHeight - vSpacing * 2 }]}>
          <Text>Back</Text>
        </View>
      </TouchableOpacity>
    )
  }

  _renderNumber = (accessWidth) => {
    //转换数字键盘
    return (
      <TouchableOpacity onPress={() => this.props.changeKeyboard('number')}>
        <View style={[styles.key, styles.otherKey, { width: accessWidth }]}>
          <Text>123</Text>
        </View>
      </TouchableOpacity>
    )
  }

  _renderChar = (accessWidth) => {
    //转换为符号键盘
    return (
      <TouchableOpacity onPress={() => this.props.changeKeyboard('char')}>
        <View style={[styles.key, styles.otherKey, { width: accessWidth }]}>
          <Text>#+=</Text>
        </View>
      </TouchableOpacity>
    )
  }

  _renderSpacing = (spaceWidth) => {
    return (
      <TouchableOpacity onPress={() => this.props.onKeyPress(' ')}>
        <View style={[styles.key, { width: spaceWidth }]} />
      </TouchableOpacity>
    )
  }

  _renderKey = (key) => {
    return (
      <TouchableOpacity onPress={() => this.props.onKeyPress(key)} key={key}>
        <View style={[styles.key, { width: this.keyWidth }]}>
          <Text style={styles.keyText}>{key}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  _renderKeys = (keys, width) => {
    return (
      <View style={{ width, flexDirection: 'row', justifyContent: 'space-around' }}>
        {keys}
      </View>
    )
  }

  _renderKeyBoard = () => {
    let curKeys = [] 
    if (this.state.isUP) {
      //渲染大写
      curKeys = upKeys
    } else {
      //渲染小写
      curKeys = keys
    }

    let rows = []
    let rowKeys = curKeys.map((rows) => {
      return rows.map((key) => {
        return this._renderKey(key)
      })
    })

    let rowWidth = rowKeys[0].length * this.keyWidth + hSpacing * (rowKeys[0].length - 1)
    rows.push(
      <View style={[styles.row, styles.abcRow]} key={1}>
        {this._renderKeys(rowKeys[0], rowWidth)}
      </View >
    )

    rowWidth = rowKeys[1].length * this.keyWidth + hSpacing * (rowKeys[1].length - 1)
    rows.push(
      <View style={[styles.row, styles.abcRow]} key={2}>
        {this._renderKeys(rowKeys[1], rowWidth)}
      </View >
    )

    rowWidth = rowKeys[2].length * this.keyWidth + hSpacing * (rowKeys[2].length - 1)
    rows.push(
      <View style={[styles.row, styles.abcRow]} key={3}>
        <View style={{ justifyContent: 'space-between', width: this.props.width - hSpacing*2, flexDirection: 'row' }}>
          {this._renderUpDown()}
          {this._renderKeys(rowKeys[2], rowWidth)}
          {this._renderDel()}
        </View>
      </View >
    )

    let spaceWidth = rowWidth - (2 * this.keyWidth + 2 * hSpacing)
    let accessWidth = (this.props.width - hSpacing*4 - spaceWidth) / 2
    rows.push(
      <View style={[styles.row, styles.abcRow]} key={4}>
        <View style={{ justifyContent: 'space-between', width: this.props.width - hSpacing*2, flexDirection: 'row' }}>
          {this._renderNumber(accessWidth)}
          {this._renderSpacing(spaceWidth)}
          {this._renderChar(accessWidth)}
        </View>
      </View>
    )

    return rows;
  }

  render() {
    const width = this.props.width;
    this.keyWidth = (width - (keys[0].length + 1) * hSpacing) / keys[0].length;
    return (
      <View style={styles.keyboard}>
        {this._renderKeyBoard()}
      </View>
    )
  }
}

const rowHeight = 54
const vSpacing = 6
const hSpacing = 8
const keys = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
  ['z', 'x', 'c', 'v', 'b', 'n', 'm']]
const upKeys = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['Z', 'X', 'C', 'V', 'B', 'N', 'M']]

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'gray',
  },
  keyboard: {
    backgroundColor: '#d2d5dc',
  },
  row: {
    height: rowHeight,
    flexDirection: 'row',
    alignItems: 'center',
  },
  abcRow: {
    justifyContent: 'center',
  },
  key: {
    backgroundColor: 'white',
    borderRadius: 4,
    height: rowHeight - vSpacing * 2,
    justifyContent: 'center',
    alignItems: 'center',
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
  otherKey: {
    backgroundColor: 'gray',
  },
  keyText: {

  },
})