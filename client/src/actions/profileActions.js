import axios from 'axios';

import {
  SET_ERRORS,
  GET_PROFILE,
  SET_PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  FETCH_USER
} from './types';

export const getCurrentProfile = () => async dispatch => {
  dispatch(setProfileLoading());
  try {
    const res = await axios.get('/api/profiles');
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GET_PROFILE,
      payload: {}
    });
  }
};

export const submitProfile = (formValues, history) => async dispatch => {
  try {
    await axios.post('/api/profiles', formValues);
    history.push('/login');
  } catch (err) {
    dispatch({
      type: SET_ERRORS,
      payload: err.response.data
    });
  }
};

export const deleteAccount = () => async dispatch => {
  if (window.confirm('Are you sure you want to delete your account?')) {
    try {
      await axios.delete('/api/profiles');
      dispatch({
        type: FETCH_USER,
        payload: {}
      });
    } catch (err) {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    }
  }
};

export const setProfileLoading = () => {
  return {
    type: SET_PROFILE_LOADING
  };
};

export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};
