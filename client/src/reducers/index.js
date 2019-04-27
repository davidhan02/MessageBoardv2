import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './authReducer';
import errorsReducer from './errorsReducer';

export default combineReducers({
  auth: authReducer,
  form: formReducer,
  errors: errorsReducer
});
