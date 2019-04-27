import isEmpty from '../utils/is-empty';
import { FETCH_USER, LOGOUT_USER } from '../actions/types';

const initialState = {
  isAuthenticated: false,
  user: {},
  errors: {},
  loading: true
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
        user: {},
        errors: {}
      };
    default:
      return state;
  }
};
