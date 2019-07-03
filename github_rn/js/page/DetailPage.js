import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  TouchableOpacity,
  WebView,
  DeviceInfo
} from 'react-native'

import FontAwesome from 'react-native-vector-icons/FontAwesome'

import NavigationUtil from './../navigator/NavigationUtil'
import NavigationBar from '../component/NavigationBar'
import BackPressComponent from '../component/BackPressComponent'
import ViewUtil from '../util/ViewUtil'

const TRENDING_URL = 'https://github.com/'
const THEME_COLOR = '#678'
export default class DetailPage extends Component {
  constructor(props) {
    super(props)
    this.params = this.props.navigation.state.params
    const { projectModel } = this.params
    this.url = projectModel.html_url || TRENDING_URL + projectModel.fullName
    const title = projectModel.full_name || projectModel.fullName

    this.backPress = new BackPressComponent({
      backPress: () => this.onBackPress()
    })

    this.state = {
      title: title,
      url: this.url,
      canGoBack: false
    }
  }

  componentDidMount() {
    this.backPress.componentDidMount()
  }

  componentWillUnmount() {
    this.backPress.componentWillUnMount()
  }

  onBackPress = () => {
    this.onBack()
    return true
  }

  onBack = () => {
    if (this.state.canGoBack) {
      this.webview.goBack()
    } else {
      NavigationUtil.goBack(this.props.navigation)
    }
  }
  // 生成右侧按钮
  renderRightButton = () => {
    return (
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity onPress={() => {}}>
          <FontAwesome
            name={'star-o'}
            size={20}
            style={{ color: '#fff', marginRight: 10 }}
          />
        </TouchableOpacity>
        {ViewUtil.getShareButton(() => {})}
      </View>
    )
  }
  onNavigationStateChange = navState => {
    this.setState({
      canGoBack: navState.canGoBack,
      url: navState.url
    })
  }
  render() {
    let statusBar = {
      backgroundColor: THEME_COLOR,
      barStyle: 'light-content'
    }
    let titleLayoutStyle =
      this.state.title.length > 20 ? { paddingRight: 30 } : null
    let navigationBar = (
      <NavigationBar
        leftButton={ViewUtil.getLeftButton(() => this.onBack())}
        rightButton={this.renderRightButton()}
        titleLayoutStyle={titleLayoutStyle}
        title={this.state.title}
        statusBar={statusBar}
        style={{ backgroundColor: THEME_COLOR }}
      />
    )
    return (
      <View style={styles.container}>
        {navigationBar}
        <WebView
          ref={webview => (this.webview = webview)}
          startInLoadingState={true}
          onNavigationStateChange={e => this.onNavigationStateChange(e)}
          source={{ uri: this.state.url }}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: DeviceInfo.isIPhoneX_deprecated ? 30 : 0
  }
})
