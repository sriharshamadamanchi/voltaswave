import { CommentType, PostType } from "../../common/store/types";
import { action } from "../../common/store/typeSafe";

export const fetchPostsAction = (): any => action('src/authentication/redux/actions/fetchPostsAction');

export type storePostsActionType = {
  posts: PostType[]
}

export const storePostsAction = (payload: storePostsActionType): any => action('src/authentication/redux/actions/storePostsAction', payload);

export const fetchCommentsByPostAction = (payload: { postId: number }): any => action('src/authentication/redux/actions/fetchCommentsByPostAction', payload);

export const storeCommentsByPostAction = (payload: { postId: number, comments: CommentType[] }): any => action('src/authentication/redux/actions/storeCommentsByPostAction', payload);

export const addPostAction = (payload: { title: string, body: string }): any => action('src/authentication/redux/actions/addPostAction', payload);

export const updatePostAction = (payload: { postId: number, title: string, body: string }): any => action('src/authentication/redux/actions/updatePostAction', payload);

export const deletePostAction = (payload: { postId: number }): any => action('src/authentication/redux/actions/deletePostAction', payload);

export const addCommentAction = (payload: any): any => action('src/authentication/redux/actions/addCommentAction', payload);

export const updateCommentAction = (payload: any): any => action('src/authentication/redux/actions/updateCommentAction', payload);

export const deleteCommentAction = (payload: any): any => action('src/authentication/redux/actions/deleteCommentAction', payload);
