import {
  createStackNavigator,
  createSwitchNavigator,
  createAppContainer
} from 'react-navigation'
import { connect } from 'react-redux'
import {
  createReactNavigationReduxMiddleware,
  createReduxContainer
} from 'react-navigation-redux-helpers'

import WelcomePage from '../page/WelcomePage'
import HomePage from '../page/HomePage'
import DetailPage from '../page/DetailPage'
import FetchDemoPage from '../page/FetchDemoPage'
import AsyncStorageDemoPage from '../page/AsyncStorageDemoPage'
import DataStoreDemoPage from '../page/DataStoreDemoPage'

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
  },
  FetchDemoPage: {
    screen: FetchDemoPage,
    navigationOptions: {
      header: null //可以通过将header设为null来禁用StackNavigator的Navigation Bar
    }
  },
  AsyncStorageDemoPage: {
    screen: AsyncStorageDemoPage,
    navigationOptions: {
      header: null //可以通过将header设为null来禁用StackNavigator的Navigation Bar
    }
  },

  DataStoreDemoPage: {
    screen: DataStoreDemoPage,
    navigationOptions: {
      header: null //可以通过将header设为null来禁用StackNavigator的Navigation Bar
    }
  }
})

// 选择哪个作为根路由
export const rootCom = 'Init'

// 配置路由
export const RootNavigator = createAppContainer(
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

/*
 * 初始化react-navigation与redux中间件
 */
export const middleware = createReactNavigationReduxMiddleware(
  state => state.reducer_nav,
  'root'
)

/*
 * 将根导航器组件传递给reduxifyNavigator 函数
 */
const AppWithNavigationState = createReduxContainer(RootNavigator, 'root')

const mapStateToProps = state => ({
  state: state.reducer_nav
})

export default connect(mapStateToProps)(AppWithNavigationState)
