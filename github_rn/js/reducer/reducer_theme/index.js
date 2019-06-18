import { actionTypes } from './../../action'

const defaultState = {
  theme: 'blue'
}

const onThemeAction = (state, action) => {
  return {
    ...state,
    theme: action.theme
  }
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.THEME_CHANGE:
      return onThemeAction(state, action)
    default:
      return state
  }
}
