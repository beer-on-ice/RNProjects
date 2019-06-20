import React, { Component } from 'react'
import { StyleSheet, Text, View, TextInput, AsyncStorage } from 'react-native'

const KEY = 'save_key'

export default class AsyncStorageDemoPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showText: ''
    }
  }
  async doSave() {
    try {
      await AsyncStorage.setItem(KEY, this.value)
    } catch (err) {
      err && console.log(err.toString())
    }
  }
  async doRemove() {
    try {
      await AsyncStorage.removeItem(KEY)
    } catch (err) {
      err && console.log(err.toString())
    }
  }
  async getData() {
    try {
      let showText = await AsyncStorage.getItem(KEY)
      console.log(showText)

      this.setState({
        showText
      })
    } catch (err) {
      err && console.log(err.toString())
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>AsyncStorageDemoPage</Text>
        <View style={styles.input_container}>
          <TextInput
            style={styles.input}
            onChangeText={text => {
              this.value = text
            }}
          />
          <Text
            onPress={() => {
              this.doSave()
            }}
          >
            存储
          </Text>
          <Text
            onPress={() => {
              this.doRemove()
            }}
          >
            删除
          </Text>
          <Text
            onPress={() => {
              this.getData()
            }}
          >
            获取
          </Text>
        </View>
        <Text>{this.state.showText}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  input_container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  input: {
    height: 60,
    borderColor: 'black',
    borderWidth: 1,
    marginRight: 10
  }
})
