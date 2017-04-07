import {
    StackNavigator, 
    TabNavigator, 
    TabView
} from 'react-navigation'

//all scenes
import Login from '../pages/Login'
import Home from '../pages/mainTabs/Home'
import Setting from '../pages/mainTabs/Setting'
import Content from '../pages/Content'
import Example from '../pages/mainTabs/Example'
import UseCustomKeyBoard from '../pages/mainTabs/UseCustomKeyBoard'
import NumberKeyBoard from '../pages/mainTabs/NumberKeyBoard'

//all navigations
const HomeNavigation = StackNavigator({
    Home: {screen: Home},
    Content: {screen: Content},
})

const SettingNavigation = StackNavigator({
    Setting: {screen: Setting}
})

const ExampleNavigation = StackNavigator({
    Example: {screen: Example},
    UseCustomKeyBoard: {screen: UseCustomKeyBoard},
    NumberKeyBoard: {screen: NumberKeyBoard},
})

const MainTab = TabNavigator({
  HomeNavigation: { screen: HomeNavigation },
  SettingNavigation: { screen: SettingNavigation },
  ExampleNavigation: { screen: ExampleNavigation}
}, {
    tabBarComponent: TabView.TabBarBottom,
    tabBarPosition: 'bottom',
    swipeEnabled: false,
    animationEnabled: false,
    lazyLoad: true,
});

const AppNavigator = StackNavigator({
    Login: { screen: Login },
    MainTab: { screen: MainTab},
}, {
    mode: "modal", 
    headerMode: "none",
    navigationOptions: {
        cardStack: {
            gesturesEnabled: false
        }
    },
})

//应用的根导航
export default AppNavigator