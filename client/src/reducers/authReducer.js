import isEmpty from '../utils/is-empty';
import { FETCH_USER, LOGOUT_USER, SET_USER_LOADING } from '../actions/types';

const initialState = {
  isAuthenticated: false,
  user: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER:
      return {
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    case LOGOUT_USER:
      return {
        isAuthenticated: false,
        user: {}
      };
    default:
      return state;
  }
};
