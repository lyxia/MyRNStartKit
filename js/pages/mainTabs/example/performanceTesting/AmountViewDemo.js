//首页
import React, { Component } from 'react'
import {
    View,
    TouchableWithoutFeedback,
    Text,
    StyleSheet,
    ListView,
} from 'react-native'

export default class Example extends Component {

    static navigationOptions = {
        title: '大量视图渲染',
        tabBar: { visible: false }
    };

    constructor(props) {
        super(props)
        this.state = {
            show1: false,
            show2: false,
        }
        this.dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
        let rows = []
        for (var i = 0; i < 40; i++) {
            rows.push(i)
        }
        this.dataSource = this.dataSource.cloneWithRows(rows)
    }

    _renderRow = (rowData) => {
        return (
            <TouchableWithoutFeedback onPress={() => { }}>
                <View style={{ height: 20 }}>
                    <Text>index: {rowData}</Text>
                </View>
            </TouchableWithoutFeedback>
        )
    }

    _renderListView = () => {
        if (this.state.show1) {
            return (
                <ListView
                    contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap' }}
                    dataSource={this.dataSource}
                    initialListSize={10}
                    pageSize={10}
                    renderRow={this._renderRow}
                />
            )
        }
        return null
    }

    _renderAmoutView = () => {
        if (this.state.show2) {
            let rows = []
            for (var i = 0; i < 40; i++) {
                rows.push(
                    <TouchableWithoutFeedback onPress={() => { }} key={i}>
                        <View style={{ height: 20 }}>
                            <Text>index: {i}</Text>
                        </View>
                    </TouchableWithoutFeedback>
                )
            }
            return (
                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                    {rows}
                </View>
            )
        }
        return null
    }

    render() {
        return (
            <View style={styles.root}>
                <View>
                    {this._renderListView()}
                    {this._renderAmoutView()}
                    <TouchableWithoutFeedback onPress={() => this.setState({ show1: !this.state.show1 })}>
                        <View><Text>{this.state.show1 ? 'hide1' : 'show1'}</Text></View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => this.setState({ show2: !this.state.show2 })}>
                        <View><Text>{this.state.show2 ? 'hide2' : 'show2'}</Text></View>
                    </TouchableWithoutFeedback>
                </View >
            </View >
        );
    }
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
})