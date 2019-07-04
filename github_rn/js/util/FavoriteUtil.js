import React, { Component } from 'react'
import { FLAG_STORE } from '../expand/dao/DataStore'

export default class FavoriteUtil extends Component {
  static onFavorite(favoriteDao, item, isFavorite, flag) {
    const key =
      flag === FLAG_STORE.flag_trending ? item.fullName : item.id.toString()
    if (isFavorite) {
      favoriteDao.saveFavoriteItem(key, JSON.stringify(item))
    } else {
      favoriteDao.removeFavorite(key)
    }
  }
}
