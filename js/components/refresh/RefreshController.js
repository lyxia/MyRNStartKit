import React, {Component} from 'react'

export function enhance(WrapedScrollView) {
    return class extends Component {
        _onScroll = (event) => {
            const {contentOffset} = event
            console.log(`contentOffset : ${contentOffset}`)
            this.props.onScroll && this.props.onScroll(event)
        }

        render() {
            return <WrapedScrollView {...this.props} onScroll={this._onScroll}/>
        }
    }
}