// import App from './pages/App'
import React, {Component} from 'react'
import {
    AppRegistry,
    View,
    Text,
} from 'react-native'
import App from './pages/App'

if(!__DEV__) {
    console = {
        log: ()=>{},
        error: ()=>{},
        info: ()=>{}
    }
}

AppRegistry.registerComponent('MyProject', ()=>App)