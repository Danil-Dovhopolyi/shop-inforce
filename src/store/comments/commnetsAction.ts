import axios from 'axios';
import { Dispatch } from 'redux';
import { AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';
// Action types
export const ADD_COMMENT = 'ADD_COMMENT';
export const FETCH_COMMENTS = 'FETCH_COMMENTS';

// Define a union type for action types
export type CommentActionTypes = typeof ADD_COMMENT | typeof FETCH_COMMENTS;

export const addComment = (
  id: string,
  comment: string
): ThunkAction<void, any, {}, AnyAction> => {
  return (dispatch: Dispatch) => {
    // Perform the API call to add the comment
    axios
      .post('http://localhost:3001/comments', {
        productId: id,
        description: comment,
      })
      .then((response) => {
        // Dispatch the action if the API call is successful
        dispatch({
          type: 'ADD_COMMENT',
          payload: response.data,
        });
      })
      .catch((error) => {
        // Handle the error if the API call fails
        console.error('Error adding comment:', error);
      });
  };
};

export const fetchComments = (
  productId: string
): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: Dispatch) => {
    // Perform the API call to fetch comments
    axios
      .get(`http://localhost:3001/comments?productId=${productId}`)
      .then((response) => {
        // Dispatch the action if the API call is successful
        dispatch({
          type: FETCH_COMMENTS,
          payload: response.data,
        });
      })
      .catch((error) => {
        // Handle the error if the API call fails
        console.error('Error fetching comments:', error);
      });
  };
};
