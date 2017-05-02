import React, {Component} from 'react'
import {
    View,
    StyleSheet,
} from 'react-native'

export var Triangle = React.createClass({
  render: function() {
    return (
      <View style={{width:250,height:100,position:"absolute",left:50,top:100,backgroundColor:'blue',overflow:'visible'}}>
        <View style={{width:50,height:300,position:'absolute', left:100,top:-50,backgroundColor:'red',overflow:'visible'}}></View>
      </View>
    )
  }
})
