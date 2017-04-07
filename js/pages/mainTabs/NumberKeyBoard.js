import React, {Component} from 'react'
import {View, Text, StyleSheet} from 'react-native';
import Keyboard from 'react-native-keyboard';

let model = {
    
    _keys: [],

    _listeners: [],

    addKey(key) {
        this._keys.push(key);
        this._notify();
    },

    delKey() {
        this._keys.pop();
        this._notify();
    },

    clearAll() {
        this._keys = [];
        this._notify();
    },

    getKeys() {
        return this._keys;
    },

    onChange(listener) {
        if (typeof listener === 'function') {
            this._listeners.push(listener);
        }
    },

    _notify() {
        this._listeners.forEach((listner) => {
            listner(this);
        });
    }
};

let styles = StyleSheet.create({
    text: {marginTop: 100, textAlign: 'center'}
});

export default class NumberKeyBoard extends React.Component {
    static navigationOptions = {
        title: '使用自定义数字键盘',
        tabBar: {visible: false}
    };

    constructor(props) {
        super(props);
        this.state = {
            text: ''
        };
    }

    componentDidMount() {
        model.onChange((model) => {
            this.setState({text: model.getKeys().join('')});
        });
    }

    _handleClear() {
        model.clearAll();
    }

    _handleDelete() {
        model.delKey();
    }

    _handleKeyPress(key) {
        model.addKey(key);
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <View style={{flex: 1}}>
                    <Text style={styles.text}>{this.state.text}</Text>
                </View>    
                <Keyboard 
                    keyboardType="decimal-pad"
                    onClear={this._handleClear.bind(this)}
                    onDelete={this._handleDelete.bind(this)}
                    onKeyPress={this._handleKeyPress.bind(this)}
                />
            </View>
        );
    }
}