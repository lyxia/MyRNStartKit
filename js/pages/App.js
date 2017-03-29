import React, { Component } from 'react'
import {
    View,
    StyleSheet,
    Text,
    BackAndroid,
} from 'react-native'
import { addNavigationHelpers } from 'react-navigation';
import { Provider, connect } from 'react-redux'

import { configureStore } from '../stores/configureStore'
import AppNavigator from '../components/AppNavigator'

const store = configureStore()

@connect(state => ({
    nav: state.nav,
}))
class AppWithNavigationState extends Component {
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
