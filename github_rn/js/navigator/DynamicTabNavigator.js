// 可配置自定义底部导航栏
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createBottomTabNavigator, createAppContainer } from 'react-navigation'
import { BottomTabBar } from 'react-navigation-tabs'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

import PopularPage from './../page/PopularPage'
import FavoritePage from './../page/FavoritePage'
import TrendingPage from './../page/TrendingPage'
import MyPage from './../page/MyPage'

// 此处配置页面的路由
const TABS = {
  PopularPage: {
    screen: PopularPage,
    navigationOptions: {
      tabBarLabel: '最热',
      tabBarIcon: ({ tintColor, focused }) => (
        <MaterialIcons
          name={'whatshot'}
          size={26}
          style={{ color: tintColor }}
        />
      )
    }
  },
  TrendingPage: {
    screen: TrendingPage,
    navigationOptions: {
      tabBarLabel: '趋势',
      tabBarIcon: ({ tintColor, focused }) => (
        <MaterialIcons
          name={'trending-up'}
          size={26}
          style={{ color: tintColor }}
        />
      )
    }
  },
  FavoritePage: {
    screen: FavoritePage,
    navigationOptions: {
      tabBarLabel: '收藏',
      tabBarIcon: ({ tintColor, focused }) => (
        <MaterialIcons
          name={'favorite'}
          size={26}
          style={{ color: tintColor }}
        />
      )
    }
  },
  MyPage: {
    screen: MyPage,
    navigationOptions: {
      tabBarLabel: '我的',
      tabBarIcon: ({ tintColor, focused }) => (
        <FontAwesome
          name={'user-circle-o'}
          size={26}
          style={{ color: tintColor }}
        />
      )
    }
  }
}

// tabBarComponent - 可选，覆盖用作标签栏的组件
class TabBarComponent extends Component {
  render() {
    return <BottomTabBar {...this.props} activeTintColor={this.props.theme} />
  }
}

class DynamicTabNavigator extends Component {
  constructor(props) {
    super(props)
    console.disableYellowBox = true // 去除黄色警告
  }
  _tabNavigator = () => {
    // if (this.Tabs) {
    //   return this.Tabs
    // }
    const { theme } = this.props
    const { PopularPage, TrendingPage, FavoritePage, MyPage } = TABS
    const tabs = { PopularPage, TrendingPage, FavoritePage, MyPage } // 根据需要定制显示的tab

    this.Tabs = createAppContainer(
      createBottomTabNavigator(tabs, {
        tabBarComponent: props => <TabBarComponent theme={theme} {...props} />
      })
    )
    return this.Tabs
  }
  render() {
    const Tab = this._tabNavigator()
    return <Tab />
  }
}

const mapStateToProps = state => {
  return {
    theme: state.reducer_theme.theme
  }
}

export default connect(mapStateToProps)(DynamicTabNavigator)
