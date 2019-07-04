import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { TouchableOpacity } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

export default class BaseItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isFavorite: this.props.projectModel.isFavorite
    }
  }
  static getDerivedStateFromProps(props, state) {
    const isFavorite = props.projectModel.isFavorite
    if (state.isFavorite !== isFavorite) {
      return {
        isFavorite
      }
    }
    return null
  }

  setFavoriteState = isFavorite => {
    this.props.projectModel.isFavorite = isFavorite
    this.setState({ isFavorite })
  }

  // 点击收藏图标
  onPressFavorite = () => {
    this.setFavoriteState(!this.state.isFavorite)
    this.props.onFavorite(this.props.projectModel.item, !this.state.isFavorite)
  }

  // 生成收藏图标
  _favoriteIcon = () => {
    return (
      <TouchableOpacity
        style={{ padding: 6 }}
        underlayColor="transparent"
        onPress={() => this.onPressFavorite()}
      >
        <FontAwesome
          name={this.state.isFavorite ? 'star' : 'star-o'}
          size={26}
          style={{ color: '#678' }}
        />
      </TouchableOpacity>
    )
  }
  render() {
    return <div />
  }
}

BaseItem.propTypes = {
  projectModel: PropTypes.object,
  onSelect: PropTypes.func,
  onFavorite: PropTypes.func
}
