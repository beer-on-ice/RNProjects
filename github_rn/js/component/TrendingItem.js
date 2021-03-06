import React, { Component } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import HTMLView from 'react-native-htmlview'

// 趋势Item的组件
export default class TrendingItem extends Component {
  render() {
    const { item } = this.props
    if (!item) return null

    // 加入收藏
    let favoriteButton = (
      <TouchableOpacity
        style={{ padding: 6 }}
        onPress={() => {}}
        underlayColor={'transparent'}
      >
        <FontAwesome name={'star-o'} size={26} style={{ color: 'red' }} />
      </TouchableOpacity>
    )

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
            {favoriteButton}
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
