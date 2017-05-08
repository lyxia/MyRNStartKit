import {
    StackNavigator, 
    TabNavigator, 
    TabView
} from 'react-navigation'

//all scenes
import Login from '../pages/Login'

import Home from '../pages/mainTabs/Home'
import Content from '../pages/Content'

import Setting from '../pages/mainTabs/Setting'

import Example from '../pages/mainTabs/example/Example'
import UseCustomKeyBoard from '../pages/mainTabs/example/UseCustomKeyBoard'
import PerformanceTesting from '../pages/mainTabs/example/performanceTesting/PerformanceTesting'
import ListRefresh from '../pages/mainTabs/example/ListRefresh'
import BaseComponentDemo from '../pages/mainTabs/example/performanceTesting/BaseComponentDemo'
import PureComponentDemo from '../pages/mainTabs/example/performanceTesting/PureComponentDemo'
import AmountViewDemo from '../pages/mainTabs/example/performanceTesting/AmountViewDemo'

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
    PerformanceTesting: {screen: PerformanceTesting},
    ListRefresh: {screen: ListRefresh},
    BaseComponentDemo: {screen: BaseComponentDemo},
    PureComponentDemo: {screen: PureComponentDemo},
    AmountViewDemo: {screen: AmountViewDemo},
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