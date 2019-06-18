import {
  createStackNavigator,
  createSwitchNavigator,
  createAppContainer
} from 'react-navigation'

import WelcomePage from '../page/WelcomePage'
import HomePage from '../page/HomePage'
import DetailPage from '../page/DetailPage'

// 欢迎页
const InitNavigator = createStackNavigator({
  WelcomePage: {
    screen: WelcomePage,
    navigationOptions: {
      header: null //可以通过将header设为null来禁用StackNavigator的Navigation Bar
    }
  }
})

// 主页
const MainNavigator = createStackNavigator({
  HomePage: {
    screen: HomePage,
    navigationOptions: {
      header: null //可以通过将header设为null来禁用StackNavigator的Navigation Bar
    }
  },
  DetailPage: {
    screen: DetailPage,
    navigationOptions: {
      header: null //可以通过将header设为null来禁用StackNavigator的Navigation Bar
    }
  }
})

export default createAppContainer(
  createSwitchNavigator(
    {
      Init: InitNavigator,
      Main: MainNavigator
    },
    {
      navigationOptions: {
        header: null //可以通过将header设为null来禁用StackNavigator的Navigation Bar
      }
    }
  )
)
