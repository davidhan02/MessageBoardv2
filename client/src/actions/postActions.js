import axios from 'axios';
import {
  GET_POST,
  GET_POSTS,
  SET_ERRORS,
  CLEAR_ERRORS,
  SET_POST_LOADING,
  SET_COMMENT_LOADING
} from './types';

export const getPosts = () => async dispatch => {
  dispatch(setPostLoading);
  try {
    const posts = await axios.get('/api/posts/all');
    dispatch({
      type: GET_POSTS,
      payload: posts.data
    });
  } catch (err) {
    dispatch({
      type: GET_POSTS,
      payload: null
    });
  }
};

export const getPostsByUser = userId => async dispatch => {
  dispatch(setPostLoading);
  try {
    const posts = await axios.get(`/api/posts/user/${userId}`);
    dispatch({
      type: GET_POSTS,
      payload: posts.data
    });
  } catch (err) {
    dispatch({
      type: GET_POSTS,
      payload: null
    });
  }
};

export const getPost = postId => async dispatch => {
  dispatch(setPostLoading);
  try {
    const post = await axios.get(`/api/posts/view/${postId}`);
    dispatch({
      type: GET_POST,
      payload: post.data
    });
  } catch (err) {
    dispatch({
      type: GET_POST,
      payload: null
    });
  }
};

export const submitPost = (formValues, history) => async dispatch => {
  dispatch(setPostLoading);
  try {
    await axios.post('/api/posts/create', formValues);
    history.push('/posts');
  } catch (err) {
    dispatch(setErrors(err));
  }
};

export const deletePost = postId => async dispatch => {
  dispatch(setPostLoading);
  try {
    await axios.delete(`/api/posts/delete/${postId}`);
    dispatch(getPosts);
  } catch (err) {
    dispatch(setErrors(err));
  }
};

export const submitComment = (formValues, postId) => async dispatch => {
  dispatch(setCommentLoading);
  try {
    const post = await axios.post(`/api/posts/view/${postId}`, formValues);
    dispatch({
      type: GET_POST,
      payload: post.data
    });
  } catch (err) {
    dispatch(setErrors(err));
  }
};

export const deleteComment = (postId, commentId) => async dispatch => {
  dispatch(setPostLoading);
  try {
    await axios.delete(`/api/posts/view/${postId}/${commentId}`);
    dispatch(getPosts);
  } catch (err) {
    dispatch(setErrors(err));
  }
};

export const submitVote = (postId, vote) => async dispatch => {
  const voteTypes = {
    '1': 'upvote',
    '0': 'unvote',
    '-1': 'downvote'
  };
  const voteType = voteTypes[vote];
  try {
    await axios.get(`/api/posts/${voteType}/${postId}`);
  } catch (err) {
    dispatch(setErrors(err));
  }
};

export const setErrors = err => ({
  type: SET_ERRORS,
  payload: err.response.data
});

export const clearErrors = () => ({
  type: CLEAR_ERRORS
});

export const setPostLoading = { type: SET_POST_LOADING };

export const setCommentLoading = { type: SET_COMMENT_LOADING };
