import axios from 'axios';

import {
  SET_ERRORS,
  GET_PROFILE,
  SET_PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE
} from './types';

export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get('/api/profiles')
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: {}
      })
    );
};

// Create a profile
export const submitProfile = (formValues, history) => async dispatch => {
  try {
    await axios.post('/api/profiles', formValues);
    history.push('/dashboard');
  } catch (err) {
    dispatch({
      type: SET_ERRORS,
      payload: err.response.data
    });
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
