import {
  CHAT_FAILD,
  CHAT_SUCCESS,
  CHAT_LISTEN,
  CHAT_LOGOUT,
  CHAT_START
} from '../actions/types';

const INITIAL_STATE = {
  chatid: null,
  messages: [],
  message: 'Connecting...'
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CHAT_SUCCESS:
      return {
        ...state, loading: true, message: action.message, chatid: action.chatid
      };
    case CHAT_FAILD:
      return {
        ...state, loading: false
      };
    case CHAT_LISTEN:
      return {
        ...state, loading: false, messages: action.payload
      };
    case CHAT_LOGOUT: 
    return {
      ...state, loading: false, messages: [], chatid: null, message: ''
    };
    case CHAT_START:
      return {
        ...state, loading: true, message: 'Connecting...'
      };

    default:
      return state;
  }
};