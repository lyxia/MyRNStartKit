import React, { Component } from 'react'
import {
    View,
    Text,
    FlatList,
    VirtualizedList,
    ScrollView,
    TouchableWithoutFeedback,
    RefreshControl,
} from 'react-native'

import HeaderRefreshView from '../../../components/refresh/HeaderRefreshView'
import FooterRefreshView from '../../../components/refresh/FooterRefreshView'
import ScrollEventEmitter from '../../../components/refresh/ScrollEventEmitter'

class DataSouce {
    data = [{ id: 'a', text: 'a text' }, { id: 'b', text: 'b text' }]

    refresh = () => {
        this.data = [{ id: 'a', text: 'a text' }, { id: 'b', text: 'b text' }]
    }

    fetchMore = () => {
        this.data.push([{ id: 'a', text: 'a text' }, { id: 'b', text: 'b text' }])
    }
}

const dataSouce = new DataSouce()

class MyRefreshControl extends Component {
    state = { refreshing: false }

    _onRefresh = () => {
        console.log('my refresh control refresh')
        this.setState({ refreshing: true })
        setTimeout(() => {
            this.setState({ refreshing: false })
        }, 2000)
    }

    render() {
        console.log('render my refresh control')
        return <RefreshControl
            {...this.props}
            onRefresh={this._onRefresh}
            refreshing={this.state.refreshing} />
    }
}

class MyListItem extends React.PureComponent {
    _onPress = () => {
        this.props.onPressItem(this.props.id);
    };

    render() {
        return (
            <TouchableWithoutFeedback onPress={this._onPress}>
                <View>
                    <Text style={{ color: this.props.selected ? 'red' : 'black' }}>{this.props.text}</Text>
                </View>
            </TouchableWithoutFeedback>
        )
    }
}

//HOC 添加触发和回调

class MyList extends React.PureComponent {
    state = { selected: (new Map(): Map<string, boolean>)};

    _keyExtractor = (item, index) => item.id;

    _onPressItem = (id: string) => {
        // updater functions are preferred for transactional updates
        this.setState((state) => {
            // copy the map rather than modifying state.
            const selected = new Map(state.selected);
            selected.set(id, !state.selected.get(id)); // toggle
            return { selected };
        });
    };

    _renderItem = ({ item }) => (
        <MyListItem
            id={item.id}
            text={item.text}
            onPressItem={this._onPressItem}
            selected={!!this.state.selected.get(item.id)}
            title={item.title}
        />
    );

    _onScroll = (e) => {
        //发送消息通知
        ScrollEventEmitter.onScroll(e)
    }

    _onScrollEndDrag = (e) => {
        ScrollEventEmitter.onScrollEndDrag(e)
    }

    render() {
        return (
            <FlatList
                data={this.props.dataSouce.data}
                extraData={this.state}
                keyExtractor={this._keyExtractor}
                renderItem={this._renderItem}
                onScroll={this._onScroll}
                onScrollEndDrag={this._onScrollEndDrag}
                ListHeaderComponent={HeaderRefreshView}
                ListFooterComponent={FooterRefreshView}
                scrollEventThrottle={16}
            />
        );
    }
}

export default class ListRefresh extends Component {
    static navigationOptions = {
        title: '使用FlatList',
        tabBarVisible: false
    };

    render() {
        return (
            <MyList
                dataSouce={dataSouce}
            />
        )
    }
}