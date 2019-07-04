import React, { Component } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import HTMLView from 'react-native-htmlview'
import BaseItem from '../component/BaseItem'

// 趋势Item的组件
export default class TrendingItem extends BaseItem {
  render() {
    const { projectModel } = this.props
    const { item } = projectModel
    if (!item) return null

    let desc = `<p>${item.description}</p>`

    return (
      <TouchableOpacity onPress={this.props.onSelect}>
        <View style={styles.cell_container}>
          <Text style={styles.title}>{item.fullName}</Text>
          <HTMLView
            value={desc}
            onLinkPress={url => {}}
            stylesheet={{ p: styles.description, a: styles.description }}
          >
            {item.description}
          </HTMLView>
          <Text style={styles.description}>{item.meta}</Text>
          <View style={styles.row}>
            <View style={styles.row}>
              <Text>Contributors:</Text>
              {item.contributors.map((item, i, arr) => {
                return (
                  <Image
                    style={{ height: 22, width: 22, margin: 2 }}
                    source={{ uri: arr[i] }}
                    key={i}
                  />
                )
              })}
            </View>
            {this._favoriteIcon()}
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  cell_container: {
    backgroundColor: 'white',
    padding: 10,
    marginLeft: 5,
    marginRight: 5,
    marginVertical: 3,
    borderColor: '#ddd',
    borderWidth: 0.5,
    borderRadius: 2,
    shadowColor: 'gray',
    shadowOffset: { width: 0.5, height: 0.5 },
    shadowOpacity: 0.4,
    shadowRadius: 1,
    elevation: 2
  },
  title: {
    fontSize: 16,
    marginBottom: 2,
    color: '#212121'
  },
  description: {
    fontSize: 14,
    marginBottom: 2,
    color: '#757575'
  },
  row: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center'
  }
})
