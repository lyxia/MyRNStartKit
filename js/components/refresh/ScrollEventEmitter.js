// import {
//     EventEmitter
// } from 'react-native'
var EventEmitter = require('EventEmitter');

class ScrollEventEmitter extends EventEmitter {
    onScroll = (e) => {
        this.emit('onScroll', e)
    }

    onScrollEndDrag = (e) => {
        this.emit('onScrollEndDrag', e)
    }
}

var eventEmitter = new ScrollEventEmitter()

export default eventEmitter