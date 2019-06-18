import React, { Component } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'

import NavigationUtil from './../navigator/NavigationUtil'

import {
  createMaterialTopTabNavigator,
  createAppContainer
} from 'react-navigation'

export default class PopularPage extends Component {
  render() {
    const TabNavigator = createAppContainer(
      createMaterialTopTabNavigator({
        PopularTab1: {
          screen: PopularTab,
          navigationOptions: {
            title: 'Tab1'
          }
        },
        PopularTab2: {
          screen: PopularTab,
          navigationOptions: {
            title: 'Tab2'
          }
        }
      })
    )
    return (
      <View style={{ flex: 1, marginTop: 30 }}>
        <TabNavigator />
      </View>
    )
  }
}

class PopularTab extends Component {
  render() {
    const { tabLabel } = this.props
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>{tabLabel}</Text>
        <Button
          onPress={() => {
            NavigationUtil.goPage({}, 'DetailPage')
          }}
          title="跳转到详情页"
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
