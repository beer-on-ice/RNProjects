import React, { Component } from 'react'
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native'
import NavigationUtil from './../navigator/NavigationUtil'
import NavigationBar from '../component/NavigationBar'
import Feather from 'react-native-vector-icons/Feather'
import Ionicons from 'react-native-vector-icons/Ionicons'

const THEME_COLOR = '#678'

export default class MyPage extends Component {
  getRightButton = () => {
    return (
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity onPress={() => {}}>
          <View style={{ padding: 5, marginRight: 8 }}>
            <Feather name={'search'} size={24} style={{ color: '#fff' }} />
          </View>
        </TouchableOpacity>
      </View>
    )
  }
  getLeftButton = callBack => {
    return (
      <TouchableOpacity
        onPress={callBack}
        style={{ padding: 8, paddingLeft: 12 }}
      >
        <Ionicons name={'ios-arrow-back'} size={26} style={{ color: '#fff' }} />
      </TouchableOpacity>
    )
  }
  render() {
    let statusBar = {
      backgroundColor: THEME_COLOR,
      barStyle: 'light-content'
    }
    let navigationBar = (
      <NavigationBar
        title={'我的'}
        statusBar={statusBar}
        style={{ backgroundColor: THEME_COLOR }}
        rightButton={this.getRightButton()}
        leftButton={this.getLeftButton()}
      />
    )
    return (
      <View style={styles.container}>
        {navigationBar}
        <Text style={styles.welcome}>MyPage</Text>
        <Button
          title="跳转到详情页"
          onPress={() => {
            NavigationUtil.goPage({}, 'DetailPage')
          }}
        />
        <Button
          title="跳转到FetchDemoPage"
          onPress={() => {
            NavigationUtil.goPage({}, 'FetchDemoPage')
          }}
        />
        <Button
          title="AsyncStorage 的使用"
          onPress={() => {
            NavigationUtil.goPage({}, 'AsyncStorageDemoPage')
          }}
        />
        <Button
          title="离线缓存的使用"
          onPress={() => {
            NavigationUtil.goPage({}, 'DataStoreDemoPage')
          }}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  }
})
