import {SET_CURRENT_USER} from '../constants/action-types'
// import {TEST_DISPATCH} from '../constants/action-types'

import isEmpty from '../../validation/is-empty'

 const initialState = {
  isAuthenticated: false,
  user: {
    // hello: 'hello'


  },
  // hello: 'test'
}

 export default function (state = initialState, action){
  switch(action.type) {
    // case TEST_DISPATCH:
    //   return {
    //     ...state,
    //     user: action.payload
    //
    //   }
    case SET_CURRENT_USER:
      return{
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };

    default:
      return state;

  }
}
