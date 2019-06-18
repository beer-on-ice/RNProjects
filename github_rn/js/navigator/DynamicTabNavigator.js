import React, { Component } from 'react'
import { createBottomTabNavigator, createAppContainer } from 'react-navigation'
import { BottomTabBar } from 'react-navigation-tabs'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

import NavigationUtil from './../navigator/NavigationUtil'

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

class TabBarComponent extends Component {
  constructor(props) {
    super(props)
    this.theme = {
      tintColor: props.activeTintColor,
      updateTime: new Date().getTime()
    }
  }
  render() {
    const { routes, index } = this.props.navigation.state
    if (routes[index].params) {
      const { theme } = routes[index].params
      // 以最新的更新时间为主
      if (theme && theme.updateTime > this.theme.updateTime) {
        this.theme = theme
      }
    }
    return (
      <BottomTabBar
        {...this.props}
        activeTintColor={this.theme.tintColor || this.theme.activeTintColor}
      />
    )
  }
}

export default class DynamicTabNavigator extends Component {
  constructor(props) {
    super(props)
    console.disableYellowBox = true // 去除黄色警告
  }
  _tabNavigator = () => {
    const { PopularPage, TrendingPage, FavoritePage, MyPage } = TABS
    const tabs = { PopularPage, TrendingPage, FavoritePage, MyPage } // 根据需要定制显示的tab
    return createAppContainer(
      createBottomTabNavigator(tabs, {
        tabBarComponent: TabBarComponent
      })
    )
  }
  render() {
    NavigationUtil.navigation = this.props.navigation
    const Tab = this._tabNavigator()
    return <Tab />
  }
}
