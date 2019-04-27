import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './authReducer';
import errorsReducer from './errorsReducer';
import profilesReducer from './profilesReducer';

export default combineReducers({
  auth: authReducer,
  form: formReducer,
  profiles: profilesReducer,
  errors: errorsReducer
});
