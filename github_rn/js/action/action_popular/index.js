import {
  POPULAR_REFRESH,
  POPULAR_REFRESH_FAIL,
  POPULAR_REFRESH_SUCCESS,
  POPULAR_LOAD_MORE_SUCCESS
} from '../actionTypes'
import DataStore from './../../expand/dao/DataStore'

// 获取最热数据的异步action
export const onLoadPopularDataAsync = (storeName, url, pageSize) => {
  return dispatch => {
    dispatch({ type: POPULAR_REFRESH, storeName })

    // 获取最新数据
    let dataStore = new DataStore()
    dataStore
      .fetchData(url)
      .then(data => {
        handleData(dispatch, storeName, data, pageSize)
      })
      .catch(err => {
        console.log(err)
        dispatch({
          type: POPULAR_REFRESH_FAIL,
          storeName,
          err
        })
      })
  }
}

const handleData = (dispatch, storeName, data, pageSize) => {
  let fixItems = []
  if (data && data.data && data.data.items) {
    fixItems = data.data.items
  }
  dispatch({
    type: POPULAR_REFRESH_SUCCESS,
    items: fixItems, // 原始数据
    projectModes:
      pageSize > fixItems.length ? fixItems : fixItems.slice(0, pageSize), //第一次要加载的数据
    storeName,
    pageIndex: 1
  })
}

// 加载更多
export const onLoadMorePopularAsync = (
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
          type: POPULAR_LOAD_MORE_SUCCESS,
          error: 'no more',
          storeName: storeName,
          pageIndex: --pageIndex,
          projectModes: dataArray
        })
      } else {
        // 还有数据
        let max =
          pageSize * pageIndex > dataArray.length
            ? dataArray.length
            : pageSize * pageIndex
        dispatch({
          type: POPULAR_LOAD_MORE_SUCCESS,
          storeName,
          pageIndex,
          projectModes: dataArray.slice(0, max)
        })
      }
    }, 500)
  }
}
