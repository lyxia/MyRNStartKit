import {combineReducers} from 'redux'
import {navReducer} from './navReducer'

const reducers = combineReducers({
    nav: navReducer,
})

export default reducers