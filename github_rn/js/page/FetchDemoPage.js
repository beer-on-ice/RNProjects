import React, { Component } from 'react'
import { StyleSheet, Text, View, Button, TextInput } from 'react-native'

export default class FetchDemoPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showText: ''
    }
  }
  loadData() {
    let url = `https://api.github.com/search/repositories?q=${this.searchKey}`
    fetch(url)
      .then(res => {
        if (res.ok) {
          return res.text()
        }
        throw new Error('Network response was not ok!')
      })
      .then(res =>
        this.setState({
          showText: res
        })
      )
      .catch(err => {
        this.setState({
          showText: err.toString()
        })
      })
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>FetchDemoPage</Text>
        <View style={styles.input_container}>
          <TextInput
            style={styles.input}
            onChangeText={text => {
              this.searchKey = text
            }}
          />
          <Button
            title="获取"
            onPress={() => {
              this.loadData()
            }}
          />
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
    alignItems: 'center'
  },
  input: {
    height: 60,
    borderColor: 'black',
    flex: 1,
    borderWidth: 1,
    marginRight: 10
  }
})
