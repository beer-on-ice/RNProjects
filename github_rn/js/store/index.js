import { applyMiddleware, createStore, compose } from 'redux'
import thunk from 'redux-thunk'
import reducers from './../reducer'
import { middleware } from './../navigator/AppNavigator'

// 自定义中间件
const logger = store => next => action => {
  if (typeof action === 'function') {
    // console.log('dispatching a function')
  } else {
    // console.log('dispatching ', action)
  }
  const result = next(action)
  // console.log('nextState', store.getState())
}

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose

const middlewares = [middleware, logger, thunk]

/** * 创建store */
export default createStore(
  reducers,
  composeEnhancers(applyMiddleware(...middlewares))
)
