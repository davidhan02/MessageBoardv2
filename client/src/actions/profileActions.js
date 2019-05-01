import axios from 'axios';

import {
  FETCH_USER,
  SET_ERRORS,
  CLEAR_ERRORS,
  GET_PROFILE,
  SET_PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE
} from './types';

export const getProfiles = () => async dispatch => {
  dispatch(setProfileLoading());
  try {
    const res = await axios.get('/api/profiles/all');
    dispatch({
      type: GET_PROFILES,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GET_PROFILES,
      payload: null
    });
  }
};

export const getCurrentProfile = () => async dispatch => {
  dispatch(setProfileLoading());
  try {
    const res = await axios.get('/api/profiles/me');
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

export const getProfileByHandle = handle => async dispatch => {
  dispatch(setProfileLoading());
  try {
    const res = await axios.get(`/api/profiles/handle/${handle}`);
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GET_PROFILE,
      payload: null
    });
  }
};

export const submitProfile = (formValues, history) => async dispatch => {
  try {
    await axios.post('/api/profiles/me', formValues);
    history.push('/login');
  } catch (err) {
    dispatch({
      type: SET_ERRORS,
      payload: err.response.data
    });
  }
};

export const addExperience = (formValues, history) => async dispatch => {
  try {
    await axios.post('api/profiles/experience', formValues);
    history.push('/dashboard');
  } catch (err) {
    dispatch({
      type: SET_ERRORS,
      payload: err.response.data
    });
  }
};

export const addEducation = (formValues, history) => async dispatch => {
  try {
    await axios.post('api/profiles/education', formValues);
    history.push('/dashboard');
  } catch (err) {
    dispatch({
      type: SET_ERRORS,
      payload: err.response.data
    });
  }
};

export const deleteExperience = id => async dispatch => {
  try {
    const res = await axios.delete(`/api/profiles/experience/${id}`);
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: SET_ERRORS,
      payload: err.response.data
    });
  }
};

export const deleteEducation = id => async dispatch => {
  try {
    const res = await axios.delete(`/api/profiles/education/${id}`);
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: SET_ERRORS,
      payload: err.response.data
    });
  }
};

export const deleteAccount = () => async dispatch => {
  if (window.confirm('Are you sure you want to delete your account?')) {
    await axios.delete('/api/profiles/me');
    dispatch({
      type: FETCH_USER,
      payload: {}
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

export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
