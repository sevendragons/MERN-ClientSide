import axios from 'axios';
import jwt_decode from 'jwt-decode'

import { GET_ERRORS, SET_CURRENT_USER } from '../constants/action-types';
import setAuthToken from '../../utils/setAuthToken';

// import { TEST_DISPATCH } from '../constants/action-types';

/*------- Register User -------*/
export const registerUser = (userData, history) => dispatch => {
  axios.post('/api/users/register', userData)
    // .then( res => console.log(res.data) )
    .then( res => history.push('/login'))
    .catch(err =>
        dispatch ({
          type: GET_ERRORS,
          payload: err.response.data

        })
    );
};

/*------- Login - Get User Token -------*/
export const loginUser = (userData) => dispatch => {
  axios.post('/api/users/login', userData)
  .then(res => {
    //Save to localStorage(lS)
    const { token } = res.data
    //Set token to lS
    localStorage.setItem('jwtToken', token);
    //Set token to Auth Header
    setAuthToken(token);
    //Decode token to get user data
    const decoded = jwt_decode(token);
    //Set current user
    dispatch(setCurrentUser(decoded));
  })
  .catch(err =>
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  );
};

// Set logged in user
export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};


//Log user out
export const logOutUser = () => dispatch => {
  // Remove token from localStorage
  localStorage.removeItem('jwtToken');
  // Remove auth header for future requests
  setAuthToken(false);

  //Set current user to {} - mean empty object, which will set isAuthenticated to false
  dispatch(setCurrentUser( {} ));

}






//Testing
// export const registerUser = userData => {
//   return {
//       type: TEST_DISPATCH,
//       payload: userData
//     };
// };
