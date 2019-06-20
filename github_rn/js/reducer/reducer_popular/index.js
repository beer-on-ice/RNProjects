import { actionTypes } from './../../action'

const defaultState = {
  theme: 'blue'
}
/*
 * java:{
     items:[],
     isLoading:false
   }                                      ，
   ios:{
     items:[],
     isLoading:true
   }
 */
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
