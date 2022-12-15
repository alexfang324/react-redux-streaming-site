import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './authReducer';
import streamReducer from './streamReducer';

//the redux form reducer must use the specific key "form" in combineReducers
export default combineReducers({
  auth: authReducer,
  form: formReducer,
  streams: streamReducer
});
