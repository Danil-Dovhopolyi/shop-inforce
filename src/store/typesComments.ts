import { ADD_COMMENT, FETCH_COMMENTS } from './comments/commnetsAction';
export interface IComment {
  id: number;
  productId: number;
  description: string;
  date: string;
}
export interface CommentState {
  comments: IComment[];
}

export type AddCommentAction = {
  type: typeof ADD_COMMENT;
  payload: IComment;
};

export type FetchCommentsAction = {
  type: typeof FETCH_COMMENTS;
  payload: IComment[];
};

export type CommentAction = AddCommentAction | FetchCommentsAction;
