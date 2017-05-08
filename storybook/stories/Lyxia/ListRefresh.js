import ListRefresh from '../../../js/pages/mainTabs/example/ListRefresh'

import React, {Component} from 'react'
import {
    Text,
    View,
} from 'react-native'

export default class ListRefreshExample extends Component {
    render () {
        return (
            <View style={{flex:1, width:"100%"}}>
                <View style={{alignItems:'center', justifyContent:'center', backgroundColor:'gray', height:60}}>
                    <Text>Navigator Header</Text>
                </View>
                <ListRefresh/>
            </View>
        )
    }
}