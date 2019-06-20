import {
  POPULAR_REFRESH,
  LOAD_POPULAR_FAIL,
  LOAD_POPULAR_SUCCESS
} from '../actionTypes'
import DataStore from './../../expand/dao/DataStore'

// 获取最热数据的异步action
export const onLoadPopularDataAsync = (storeName, url) => {
  return dispatch => {
    dispatch({ type: POPULAR_REFRESH, storeName })
    let dataStore = new DataStore()
    dataStore
      .fetchData(url)
      .then(res => {
        handleDate(dispatch, store, res)
      })
      .catch(err => {
        console.log(err)
        dispatch({
          type: LOAD_POPULAR_FAIL,
          storeName,
          err
        })
      })
  }
}

const handleDate = (dispatch, storeName, data) => {
  dispatch({
    type: LOAD_POPULAR_SUCCESS,
    items: data && data.data && data.data.items,
    storeName
  })
}
