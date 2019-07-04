import React from 'react'
import { AsyncStorage } from 'react-native'

const FAVORITE_KEY_PREFIX = 'favorite_'

export default class FavoriteDao {
  constructor(flag) {
    this.favoriteKey = FAVORITE_KEY_PREFIX + flag
  }
  // 收藏项目，保存收藏的项目
  saveFavoriteItem = (key, value, callback) => {
    AsyncStorage.setItem(key, value, (error, result) => {
      if (!error) {
        this.updateFavoriteKeys(key, true)
      }
    })
  }
  // 更新Favorite Key集合 isAdd:true添加，false删除
  updateFavoriteKeys = (key, isAdd) => {
    AsyncStorage.getItem(this.favoriteKey, (err, result) => {
      if (!err) {
        let favoriteKeys = []
        if (result) {
          favoriteKeys = JSON.parse(result)
        }
        let index = favoriteKeys.indexOf(key)
        if (isAdd) {
          // 如果是添加且key不存在就添加到数组中
          if (index === -1) favoriteKeys.push(key)
        } else {
          // 如果是删除且key存在则将其从数值中移除
          if (index !== -1) favoriteKeys.splice(index, 1)
        }
        AsyncStorage.setItem(this.favoriteKey, JSON.stringify(favoriteKeys))
      }
    })
  }
  // 获取对应的repository收藏的key
  getAllFavoriteKeys = () => {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem(this.favoriteKey, (err, result) => {
        if (!err) {
          try {
            resolve(JSON.parse(result))
          } catch (e) {
            reject(err)
          }
        } else {
          reject(err)
        }
      })
    })
  }
  // 取消收藏
  removeFavoriteItem = key => {
    AsyncStorage.removeItem(key, (err, result) => {
      if (!err) {
        this.updateFavoriteKeys(key, false)
      }
    })
  }
  // 获取所有收藏的项目
  getAllItems = () => {
    return new Promise((resolve, reject) => {
      this.getAllFavoriteKeys()
        .then(keys => {
          let items = []
          if (keys) {
            // .multiGet获取多项，其中 keys 是字符串数组，比如：['k1', 'k2']
            AsyncStorage.multiGet(keys, (err, result) => {
              try {
                result.map((item, i, arr) => {
                  let key = arr[i][0]
                  let value = arr[i][1]
                  if (value) items.push(JSON.parse(value))
                })
                resolve(items)
              } catch (e) {
                reject(err)
              }
            })
          } else {
            resolve(items)
          }
        })
        .catch(e => {
          reject(e)
        })
    })
  }
}
