import {createStore, applyMiddleware, compose} from 'redux'
import { Platform } from 'react-native';
import reducers from '../reducers'

export function configureStore() {
    store = createStore(reducers)
    return store;
}