import React, { Component } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import NavigationUtil from './../navigator/NavigationUtil'

export default class MyPage extends Component {
  render() {
    return (
      <View style={styles.container}>
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  }
})
