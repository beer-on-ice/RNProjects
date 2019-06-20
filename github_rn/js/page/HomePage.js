import React, { Component } from 'react'
import { BackHandler } from 'react-native'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'

import NavigationUtil from './../navigator/NavigationUtil'

// 引入可配置组件
import DynamicTabNavigator from './../navigator/DynamicTabNavigator'

class HomePage extends Component {
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress)
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress)
  }

  // 处理Android的物理返回键
  onBackPress = () => {
    const { dispatch, nav } = this.props
    //if (nav.index === 0) {
    if (nav.routes[1].index === 0) {
      //如果RootNavigator中的MainNavigator的index为0，则不处理返回事件
      return false
    }
    dispatch(NavigationActions.back())
    return true
  }
  render() {
    NavigationUtil.navigation = this.props.navigation
    return <DynamicTabNavigator />
  }
}

const mapStateToProps = state => ({
  nav: state.reducer_nav
})

export default connect(mapStateToProps)(HomePage)
