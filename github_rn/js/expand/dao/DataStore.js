import { AsyncStorage } from 'react-native'

// 离线缓存框架
export default class DataStore {
  // 检查timestamp是否在有效期内 true不需要更新
  static checkTimestampValid(timestamp) {
    const currentDate = new Date()
    const targetDate = new Date()
    targetDate.setTime(timestamp)
    if (currentDate.getMonth() !== targetDate.getMonth()) return false
    if (currentDate.getDate() !== targetDate.getDate()) return false
    if (currentDate.getHours() - targetDate.getHours() > 4) return false
    return true
  }
  //  保存数据
  saveData(url, data, callback) {
    if (!data || !url) return
    AsyncStorage.setItem(url, JSON.stringify(this._wrapData(data)), callback)
  }
  _wrapData(data) {
    return {
      data,
      timestamp: new Date().getTime()
    }
  }
  // 获取本地数据
  fetchLocalData(url) {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem(url, (err, result) => {
        if (!err) {
          try {
            resolve(JSON.parse(result))
          } catch (e) {
            reject(e)
            console.log(e)
          }
        } else {
          reject(err)
          console.log(err)
        }
      })
    })
  }
  // 获取网络数据
  fetchNetData(url) {
    return new Promise((resolve, reject) => {
      fetch(url)
        .then(res => {
          if (res.ok) {
            return res.json()
          }
          throw new Error('Network response wat not ok.')
        })
        .then(resData => {
          this.saveData(url, resData)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
  // 获取数据，优先获取本地数据，如果无本地数据或者本地数据过期则获取网络数据
  fetchData(url) {
    return new Promise((resolve, reject) => {
      this.fetchLocalData(url)
        .then(wrapData => {
          if (wrapData && DataStore.checkTimestampValid(wrapData.timestamp)) {
            resolve(wrapData)
          } else {
            this.fetchNetData(url)
              .then(data => {
                resolve(this._wrapData(data))
              })
              .catch(err => {
                reject(err)
              })
          }
        })
        .catch(err => {
          this.fetchNetData(url)
            .then(data => {
              resolve(this._wrapData(data))
            })
            .catch(err => {
              reject(err)
            })
        })
    })
  }
}
