import React, { Component } from 'react'
import {
    View,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
} from 'react-native'

class BaseComponent extends Component {
    constructor(props) {
        super(props)
        console.log(`constructor ${this.constructor.className}`)
    }

    componentWillMount() {
        console.log(`componentWillMount ${this.constructor.className}`)
    }

    componentDidMount() {
        console.log(`componentDidMount ${this.constructor.className}`)
    }

    componentWillReceiveProps(nextProps) {
        console.log(`componentWillReceiveProps ${this.constructor.className} \n nextProps: ${JSON.stringify(nextProps)}`)
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log(`shouldComponentUpdate ${this.constructor.className}\n nextProps: ${JSON.stringify(nextProps)}\n nextState: ${JSON.stringify(nextState)}`)
        return true
    }

    componentWillUpdate(nextProps, nextState) {
        console.log(`componentWillUpdate ${this.constructor.className} \n nextProps: ${JSON.stringify(nextProps)} \n nextState: ${JSON.stringify(nextState)}`)
    }

    componentDidUpdate(prevProps, prevState) {
        console.log(`componentDidUpdate ${this.constructor.className}\n prevProps: ${JSON.stringify(prevProps)} \n prevState: ${JSON.stringify(prevState)}`)
    }

    componentWillUnmount() {
        console.log(`componentWillUnmount ${this.constructor.className}`)
    }

    render() {
        console.log(`render ${this.constructor.className}`)
    }
}

class Yellow1 extends BaseComponent {
    shouldComponentUpdate(nextProps, nextState) {
        super.shouldComponentUpdate(nextProps, nextState)

        return nextProps.text !== this.props.text
    }

    render() {
        super.render()
        return _renderBlock('yellow', this.props.text, { flex: 1 })
    }
}
Yellow1.className = 'Yellow1'

class Yellow2 extends BaseComponent {
    shouldComponentUpdate(nextProps, nextState) {
        super.shouldComponentUpdate(nextProps, nextState)

        return nextProps.text !== this.props.text
    }

    render() {
        super.render()
        return _renderBlock('yellow', this.props.text, { flex: 1 })
    }
}
Yellow2.className = 'Yellow2'

class Aqua1 extends BaseComponent {
    shouldComponentUpdate(nextProps, nextState) {
        super.shouldComponentUpdate(nextProps, nextState)

        return nextProps.text !== this.props.text || nextProps.hideBlue1 !== this.props.hideBlue1
    }

    render() {
        super.render()
        return (
            <View style={{ flex: 1 }}>
                {_renderBlock('aqua', this.props.text)}
                {this.props.hideBlue1 ? <BlueAndYellow text={'BlueAndYellow'} /> : null}
            </View>
        )
    }
}
Aqua1.className = 'Aqua1'

class Aqua2 extends BaseComponent {
    shouldComponentUpdate(nextProps, nextState) {
        super.shouldComponentUpdate(nextProps, nextState)

        return nextProps.text !== this.props.text
    }

    render() {
        super.render()
        return (
            <View style={{ flex: 1 }}>
                {_renderBlock('aqua', this.props.text)}
            </View>
        )
    }
}
Aqua2.className = 'Aqua2'

class BlueAndYellow extends BaseComponent {
    shouldComponentUpdate(nextProps, nextState) {
        super.shouldComponentUpdate(nextProps, nextState)

        return nextProps.text !== this.props.text
    }

    render() {
        super.render()
        return (
            <View style={[{ alignItems: 'center' }, this.props.style]}>
                {_renderBlock('blue', this.props.text)}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Yellow1 text={'Yellow1'} />
                    <Yellow2 text={'Yellow2'} />
                </View>
            </View>
        )
    }
}
BlueAndYellow.className = 'BlueAndYellow'

class BlueAndAqua extends BaseComponent {
    shouldComponentUpdate(nextProps, nextState) {
        super.shouldComponentUpdate(nextProps, nextState)

        return nextProps.text !== this.props.text || nextProps.hideAqua2 !== this.props.hideAqua2 || nextProps.hideBlue1 !== this.props.hideBlue1
    }

    render() {
        super.render()
        return (
            <View style={{ alignItems: 'center', flex: 1 }}>
                {_renderBlock('blue', this.props.text)}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Aqua1 text={'Aqua1'} hideBlue1={this.props.hideBlue1} />
                    {this.props.hideAqua2 ? null : <Aqua2 text={'Aqua2'} />}
                </View>
            </View>
        )
    }
}
BlueAndAqua.className = 'BlueAndAqua'

_renderBlock = (borderColor, text, style) => {
    return (
        <View style={[style, { borderColor, borderWidth: StyleSheet.hairlineWidth, alignItems: 'center' }]}>
            <Text>{text}</Text>
        </View>
    )
}

export default class App extends BaseComponent {
    static navigationOptions = {
        title: '基础实现',
        tabBar: { visible: false }
    };

    constructor(props) {
        super(props)

        this.state = {
            hideBlue1: false,
            hideAqua2: false,
            reverse: false,
        }
    }

    render() {
        super.render()
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                {_renderBlock('red', 'App')}
                {this.state.reverse ?
                    (
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <BlueAndAqua key={'BlueAndAqua'} text={'BlueAndAqua'} hideAqua2={this.state.hideAqua2} hideBlue1={this.state.hideBlue1} />
                            {this.state.hideBlue1 ? null : <BlueAndYellow text={'BlueAndYellow'} key={'BlueAndYellow'} style={styles.commonflex}/>}
                        </View>
                    )
                    :
                    (
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            {this.state.hideBlue1 ? null : <BlueAndYellow key='BlueAndYellow' text={'BlueAndYellow'} style={styles.commonflex}/>}
                            <BlueAndAqua key={'BlueAndAqua'} text={'BlueAndAqua'} hideAqua2={this.state.hideAqua2} hideBlue1={this.state.hideBlue1} />
                        </View>
                    )
                }
                <TouchableWithoutFeedback onPress={() => this.setState({ ...this.state, hideBlue1: !this.state.hideBlue1 })}>
                    <View><Text>{this.state.hideBlue1 ? 'show blue1' : 'hide blue1'}</Text></View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => this.setState({ ...this.state, hideAqua2: !this.state.hideAqua2 })}>
                    <View><Text>{this.state.hideAqua2 ? 'show aqua2' : 'hide aqua2'}</Text></View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => this.setState({ ...this.state, reverse: !this.state.reverse })}>
                    <View><Text>{this.state.reverse ? 'order' : 'reverse'}</Text></View>
                </TouchableWithoutFeedback>
            </View>
        )
    }
}
App.className = 'App'

const styles = StyleSheet.create({
    commonflex: {
        flex: 1
    }
})