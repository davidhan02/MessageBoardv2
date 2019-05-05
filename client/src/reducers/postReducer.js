import {
  SET_ERRORS,
  GET_POST,
  GET_POSTS,
  SET_POST_LOADING,
  SET_COMMENT_LOADING
} from '../actions/types';

const initialState = {
  post: null,
  posts: null,
  postLoading: false,
  commentLoading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_POST:
      return {
        ...state,
        post: action.payload,
        postLoading: false
      };
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload,
        postLoading: false
      };
    case SET_POST_LOADING:
      return {
        ...state,
        postLoading: true
      };
    case SET_COMMENT_LOADING:
      return {
        ...state,
        commentLoading: true
      };
    default:
      return state;
  }
};
