import React, { Component } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, Text, View, Button } from 'react-native'

import { actionThemes } from './../action'

class FavoritePage extends Component {
  render() {
    const { onThemeChange } = this.props
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>FavoritePage</Text>
        <Button title="改变主题色" onPress={() => onThemeChange('red')} />
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

const mapDispatchToProps = dispatch => ({
  onThemeChange: theme => {
    dispatch(actionThemes.onThemeChange(theme))
  }
})

export default connect(
  null,
  mapDispatchToProps
)(FavoritePage)
