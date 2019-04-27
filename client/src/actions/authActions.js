import axios from 'axios';
import {
  FETCH_USER,
  LOGOUT_USER,
  SET_ERRORS,
  SET_USER_LOADING,
  CLEAR_USER_LOADING,
  CLEAR_ERRORS
} from './types';

export const fetchUser = () => async dispatch => {
  dispatch(setUserLoading());
  const res = await axios.get('/api/users/current_user');
  dispatch({
    type: FETCH_USER,
    payload: res.data
  });
};

export const logoutUser = history => async dispatch => {
  dispatch(setUserLoading());
  await axios.get('/api/users/logout');
  dispatch({
    type: LOGOUT_USER
  });
  history.push('/');
};

export const submitLogin = (formValues, history) => async dispatch => {
  dispatch(setUserLoading());
  try {
    const res = await axios.post('/api/users/login', formValues);
    dispatch({
      type: FETCH_USER,
      payload: res.data
    });
    history.push('/login');
  } catch (err) {
    await dispatch({
      type: SET_ERRORS,
      payload: err.response.data
    });
    dispatch(clearUserLoading());
  }
};

export const submitRegister = (formValues, history) => async dispatch => {
  dispatch(setUserLoading());
  try {
    const res = await axios.post('/api/users/register', formValues);
    dispatch({
      type: FETCH_USER,
      payload: res.data
    });
    history.push('/login');
  } catch (err) {
    await dispatch({
      type: SET_ERRORS,
      payload: err.response.data
    });
    dispatch(clearUserLoading());
  }
};

export const setUserLoading = () => {
  return {
    type: SET_USER_LOADING
  };
};

export const clearUserLoading = () => {
  return {
    type: CLEAR_USER_LOADING
  };
};

export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
