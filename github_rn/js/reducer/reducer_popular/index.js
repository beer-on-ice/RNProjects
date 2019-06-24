import { actionTypes } from './../../action'

const defaultState = {}
/*
 * java:{
     items:[],
     isLoading:false
   }                                      ，
   ios:{
     items:[],
     isLoading:true
   }
   难点：
    state树横向扩展
    如何动态获取和设置store，storeKey不固定
 */

// 下拉刷新数据
const onPopularRefresh = (state, action) => {
  return {
    ...state,
    [action.storeName]: {
      ...state[action.storeName],
      isLoading: true,
      hideLoadingMore: true
    }
  }
}

// 下拉刷新成功处理
const onLoadPopularSuccess = (state, action) => {
  return {
    ...state,
    [action.storeName]: {
      ...state[action.storeName],
      items: action.items, // 原始数据
      projectModes: action.projectModes, // 此次要展示的数据
      hideLoadingMore: false,
      isLoading: false,
      pageIndex: action.pageIndex
    }
  }
}

// 下拉刷新失败处理
const onLoadPopularFail = (state, action) => {
  return {
    ...state,
    [action.storeName]: {
      ...state[action.storeName],
      isLoading: false
    }
  }
}

// 上拉加载更多成功
const onLoadMoreSuccess = (state, action) => {
  return {
    ...state,
    [action.storeName]: {
      ...state[action.storeName],
      projectModes: action.projectModes,
      hideLoadingMore: false,
      pageIndex: action.pageIndex
    }
  }
}

// 上拉加载更多失败
const onLoadMoreFail = (state, action) => {
  return {
    ...state,
    [action.storeName]: {
      ...state[action.storeName],
      hideLoadingMore: true,
      pageIndex: action.pageIndex
    }
  }
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.POPULAR_REFRESH: //下拉刷新
      return onPopularRefresh(state, action)
    case actionTypes.POPULAR_REFRESH_SUCCESS: //下拉刷新成功
      return onLoadPopularSuccess(state, action)
    case actionTypes.POPULAR_REFRESH_FAIL: //下拉刷新失败
      return onLoadPopularFail(state, action)
    case actionTypes.POPULAR_LOAD_MORE_SUCCESS: //上拉加载成功
      return onLoadMoreSuccess(state, action)
    case actionTypes.POPULAR_LOAD_MORE_FAIL: //上拉加载失败
      return onLoadMoreFail(state, action)
    default:
      return state
  }
}
