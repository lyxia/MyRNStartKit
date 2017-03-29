import App from './pages/App'
import {
    AppRegistry
} from 'react-native'

if(!__DEV__) {
    console = {
        log: ()=>{},
        error: ()=>{},
        info: ()=>{}
    }
}

AppRegistry.registerComponent('MyProject', ()=>App)