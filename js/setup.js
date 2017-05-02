// import App from './pages/App'
import React, {Component} from 'react'
import {
    AppRegistry,
    View,
    Text,
} from 'react-native'

class App extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <View style={{width:250,height:100,position:"absolute",left:50,top:100,backgroundColor:'blue',overflow:'visible'}}>
                <View style={{width:50,height:300,backgroundColor:'red',overflow:'visible'}}></View>
            </View>
        )
    }
}

if(!__DEV__) {
    console = {
        log: ()=>{},
        error: ()=>{},
        info: ()=>{}
    }
}

AppRegistry.registerComponent('MyProject', ()=>App)