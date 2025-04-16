import { resetReducersAction } from "../../common/loaderRedux/actions";
import { CommentType, homeReducerStateType } from "../../common/store/types";
import { createReducer, resetState } from "../../common/store/typeSafe";
import { storeCommentsByPostAction, storePostsAction, storePostsActionType } from "./actions";

const initialState = {
  posts: [],
  comments: {}
};

export const homeReducer = createReducer(initialState)
  .handleAction(
    storePostsAction,
    (state: homeReducerStateType, action: { payload: storePostsActionType }) => {
      state.posts = action.payload.posts
    })
  .handleAction(
    storeCommentsByPostAction,
    (state: homeReducerStateType, action: { payload: { postId: number, comments: CommentType[] } }) => {
      state.comments[action.payload.postId] = action.payload.comments
    })
  .handleAction(resetReducersAction, resetState(initialState));
