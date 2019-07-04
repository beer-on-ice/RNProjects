import {
  POPULAR_REFRESH,
  POPULAR_REFRESH_FAIL,
  POPULAR_REFRESH_SUCCESS,
  POPULAR_LOAD_MORE_SUCCESS,
  POPULAR_LOAD_MORE_FAIL
} from '../actionTypes'
import DataStore, { FLAG_STORE } from './../../expand/dao/DataStore'
import { handleData, _projectModels } from './../ActionUtil'
/*
 * 流程：先通过onLoadPopularDataAsync获取最新全部数据items，经过handleData（模拟请求只能手动分组）分组出第一次要加载的数据projectModels，
 */
// 获取最热数据的异步action
export const onLoadPopularDataAsync = (
  storeName,
  url,
  pageSize,
  favoriteDao
) => {
  return dispatch => {
    dispatch({ type: POPULAR_REFRESH, storeName })

    // 获取最新数据
    let dataStore = new DataStore()
    dataStore
      .fetchData(url, FLAG_STORE.flag_popular)
      .then(data => {
        handleData(
          POPULAR_REFRESH_SUCCESS,
          dispatch,
          storeName,
          data,
          pageSize,
          favoriteDao
        )
      })
      .catch(err => {
        dispatch({
          type: POPULAR_REFRESH_FAIL,
          storeName,
          err
        })
      })
  }
}

/*
 * 加载更多，根据原始数据items和pageindex来分出下一组并存到projectModels
 */
// 加载更多
export const onLoadMorePopularAsync = (
  storeName,
  pageIndex,
  pageSize,
  dataArray = [],
  favoriteDao,
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
          type: POPULAR_LOAD_MORE_FAIL,
          error: 'no more',
          storeName: storeName,
          pageIndex: --pageIndex
        })
      } else {
        // 还有数据
        let max =
          pageSize * pageIndex > dataArray.length
            ? dataArray.length
            : pageSize * pageIndex
        _projectModels(dataArray.slice(0, max), favoriteDao, projectModels => {
          dispatch({
            type: POPULAR_LOAD_MORE_SUCCESS,
            storeName,
            pageIndex,
            projectModels: projectModels
          })
        })
      }
    }, 500)
  }
}
