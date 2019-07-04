import {
  TRENDING_REFRESH,
  TRENDING_REFRESH_FAIL,
  TRENDING_REFRESH_SUCCESS,
  TRENDING_LOAD_MORE_SUCCESS
} from '../actionTypes'
import DataStore, { FLAG_STORE } from './../../expand/dao/DataStore'
import { handleData } from './../ActionUtil'

export const onLoadTrendingDataAsync = (storeName, url, pageSize) => {
  return dispatch => {
    dispatch({ type: TRENDING_REFRESH, storeName })
    // 获取最新数据
    let dataStore = new DataStore()
    dataStore
      .fetchData(url, FLAG_STORE.flag_trending)
      .then(data => {
        handleData(
          TRENDING_REFRESH_SUCCESS,
          dispatch,
          storeName,
          data,
          pageSize
        )
      })
      .catch(err => {
        dispatch({
          type: TRENDING_REFRESH_FAIL,
          storeName,
          err
        })
      })
  }
}

// 加载更多
export const onLoadMoreTrendingAsync = (
  storeName,
  pageIndex,
  pageSize,
  dataArray = [],
  callBack
) => {
  return dispatch => {
    // 模拟网络请求
    setTimeout(() => {
      if ((pageIndex - 1) * pageSize >= dataArray.length) {
        // 已经加载完全部数据
        if (typeof callBack === 'function') {
          callBack('no more')
        }
        dispatch({
          type: TRENDING_LOAD_MORE_SUCCESS,
          error: 'no more',
          storeName: storeName,
          pageIndex: --pageIndex,
          projectModels: dataArray
        })
      } else {
        // 还有数据
        let max =
          pageSize * pageIndex > dataArray.length
            ? dataArray.length
            : pageSize * pageIndex
        dispatch({
          type: TRENDING_LOAD_MORE_SUCCESS,
          storeName,
          pageIndex,
          projectModels: dataArray.slice(0, max)
        })
      }
    }, 500)
  }
}
