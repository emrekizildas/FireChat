import { combineReducers } from 'redux'

import AuthReducers from './AuthReducers';
import ChatReducers from './ChatReducers';

export default combineReducers({
    authResponse: AuthReducers,
    chatResponse: ChatReducers
});