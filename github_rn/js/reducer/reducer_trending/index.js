import { actionTypes } from './../../action'

const defaultState = {}
// 下拉刷新数据
const onTrendingRefresh = (state, action) => {
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
const onLoadTrendingSuccess = (state, action) => {
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
const onLoadTrendingFail = (state, action) => {
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
    case actionTypes.TRENDING_REFRESH: //下拉刷新
      return onTrendingRefresh(state, action)
    case actionTypes.TRENDING_REFRESH_SUCCESS: //下拉刷新成功
      return onLoadTrendingSuccess(state, action)
    case actionTypes.TRENDING_REFRESH_FAIL: //下拉刷新失败
      return onLoadTrendingFail(state, action)
    case actionTypes.TRENDING_LOAD_MORE_SUCCESS: //上拉加载成功
      return onLoadMoreSuccess(state, action)
    case actionTypes.TRENDING_LOAD_MORE_FAIL: //上拉加载失败
      return onLoadMoreFail(state, action)
    default:
      return state
  }
}
