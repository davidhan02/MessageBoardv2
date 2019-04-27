import isEmpty from '../utils/is-empty';
import { FETCH_USER, LOGOUT_USER, SET_USER_LOADING } from '../actions/types';

const initialState = {
  isAuthenticated: false,
  loading: false,
  user: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
        loading: false
      };
    case LOGOUT_USER:
      return {
        ...state,
        isAuthenticated: false,
        user: {}
      };
    case SET_USER_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
};
