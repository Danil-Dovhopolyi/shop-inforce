import { CommentState, CommentAction } from '../typesComments';
import { ADD_COMMENT, FETCH_COMMENTS } from './commnetsAction';

const initialState: CommentState = {
  comments: [],
};

const commentsReducer = (
  state = initialState,
  action: CommentAction
): CommentState => {
  switch (action.type) {
    case ADD_COMMENT:
      return {
        ...state,
        comments: [...state.comments, action.payload],
      };
    case FETCH_COMMENTS:
      return {
        ...state,
        comments: action.payload,
      };
    default:
      return state;
  }
};

export default commentsReducer;
