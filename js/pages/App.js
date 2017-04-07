import React, { Component } from 'react'
import {
    View,
    StyleSheet,
    Text,
    BackAndroid,
    Linking,
} from 'react-native'
import { addNavigationHelpers, NavigationActions } from 'react-navigation';
import { Provider, connect } from 'react-redux'

import { configureStore } from '../stores/configureStore'
import AppNavigator from '../components/AppNavigator'

const store = configureStore()

@connect(state => ({
    nav: state.nav,
}))
class AppWithNavigationState extends Component {
    _handleBackPress = () => {
        let curRoute = null
        let theLastIndex = null
        var {routes, index} = this.props.nav
        while(routes) {
            theLastIndex = index
            curRoute = routes[index]
            routes = curRoute.routes
            index = curRoute.index
        }
        if (theLastIndex) {
            this.props.dispatch({ type: "Navigation/BACK" })
            return true
        } else {
            return false
        }
    }

    componentDidMount() {
        BackAndroid.addEventListener('hardwareBackPress', this._handleBackPress);
    }
    componentWillUnmount() {
        BackAndroid.removeEventListener('hardwareBackPress', this._handleBackPress);
    }

    render() {
        return (
            <AppNavigator navigation={addNavigationHelpers({
                dispatch: this.props.dispatch,
                state: this.props.nav,
            })} />
        );
    }
}

export default class App extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Provider store={store}>
                <AppWithNavigationState />
            </Provider>
        )
    }
}
