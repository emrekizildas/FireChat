import {
    LOGIN_START,
    LOGIN_SUCCESS,
    LOGIN_FAILD,
    GET_USER_DATA_START,
    GET_USER_DATA_SUCCESS,
    GET_USER_DATA_FAILD
  } from '../actions/types';
  
  const INITIAL_STATE = {
    loading: false,
    user: null,
  };
  export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case LOGIN_START:
        return {
          ...state, loading: true
        };
      case LOGIN_SUCCESS:
        return {
          ...state, loading: false, user: action.payload
        };
      case LOGIN_FAILD:
        return {
          ...state, loading: false
        };
  
        case GET_USER_DATA_SUCCESS:
        return {
          ...state, loading: false, other_user: action.payload
        };
  
      default:
        return state;
    }
  };