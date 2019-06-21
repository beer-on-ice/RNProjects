import { combineReducers } from 'redux'
import { rootCom, RootNavigator } from '../navigator/AppNavigator'
import reducer_theme from './reducer_theme'
import reducer_popular from './reducer_popular'

// 1.指定默认state
const navState = RootNavigator.router.getStateForAction(
  RootNavigator.router.getActionForPathAndParams(rootCom)
)

/** * 2.创建自己的 navigation reducer， */
const reducer_nav = (state = navState, action) => {
  const nextState = RootNavigator.router.getStateForAction(action, state)
  // 如果`nextState`为null或未定义，只需返回原始`state`
  return nextState || state
}

/** * 3.合并reducer * @type {Reducer<any> | Reducer<any, AnyAction>} */
const index = combineReducers({
  reducer_nav,
  reducer_theme,
  reducer_popular
})

export default index
