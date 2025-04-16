import { call, put, takeLatest } from "redux-saga/effects";
import { failedLoadingAction, startLoadingAction, successLoadingAction } from "../../common/loaderRedux/actions";
import { getActionType } from "../../common/store/typeSafe";
import { addPostAction, deletePostAction, fetchCommentsByPostAction, fetchPostsAction, storeCommentsByPostAction, storePostsAction, updatePostAction } from "./actions";
import { addPostAPI, deletePostAPI, fetchCommentsByPostAPI, fetchPostsAPI, updatePostAPI } from "./api";
import { popToTop } from "../../common/navigation/navigationService";
import Utility from "../../common/Utility";

function* fetchPostsSaga(): any {
  try {
    yield put(startLoadingAction({ name: "FetchPosts", msg: "pending" }));
    const response = yield call(fetchPostsAPI)
    yield put(storePostsAction({ posts: response ?? [] }))
    yield put(successLoadingAction({ name: "FetchPosts", msg: "success" }));
  } catch (error: any) {
    console.log("error in fetchPostsSaga", error);
    if (error?.message) {
      Utility.showMessage("Alert", error?.message)
    }
    yield put(failedLoadingAction({ name: "FetchPosts", msg: error?.message ?? "" }));
  }
}

function* fetchCommentsByPostSaga(action: { payload: { postId: number } }): any {
  try {
    yield put(startLoadingAction({ name: "FetchComments", msg: "pending" }));
    const response = yield call(fetchCommentsByPostAPI, { postId: action.payload.postId })
    yield put(storeCommentsByPostAction({ postId: action.payload.postId, comments: response ?? [] }))
    yield put(successLoadingAction({ name: "FetchComments", msg: "success" }));
  } catch (error: any) {
    console.log("error in fetchCommentsByPostSaga", error);
    if (error?.message) {
      Utility.showMessage("Alert", error?.message)
    }
    yield put(failedLoadingAction({ name: "FetchComments", msg: error?.message ?? "" }));
  }
}

function* addPostSaga(action: { payload: { title: string, body: string } }): any {
  try {
    yield put(startLoadingAction({ name: "AddPost", msg: "pending" }));
    yield call(addPostAPI, action.payload)
    yield call(fetchPostsSaga)
    yield put(successLoadingAction({ name: "AddPost", msg: "success" }));
    Utility.showMessage("Success", "Successfully added!!")
    popToTop()
  } catch (error: any) {
    console.log("error in addPostSaga", error);
    if (error?.message) {
      Utility.showMessage("Alert", error?.message)
    }
    yield put(failedLoadingAction({ name: "AddPost", msg: error?.message ?? "" }));
  }
}

function* updatePostSaga(action: { payload: { postId: number, title: string, body: string } }): any {
  try {
    yield put(startLoadingAction({ name: "UpdatePost", msg: "pending" }));
    yield call(updatePostAPI, { postId: action.payload.postId, payload: { title: action.payload.title, body: action.payload.body } })
    yield call(fetchPostsSaga)
    yield put(successLoadingAction({ name: "UpdatePost", msg: "success" }));
    Utility.showMessage("Success", "Successfully updated!!")
    popToTop()
  } catch (error: any) {
    console.log("error in updatePostSaga", error);
    if (error?.message) {
      Utility.showMessage("Alert", error?.message)
    }
    yield put(failedLoadingAction({ name: "UpdatePost", msg: error?.message ?? "" }));
  }
}

function* deletePostSaga(action: { payload: { postId: number } }): any {
  try {
    yield put(startLoadingAction({ name: "DeletePost", msg: "pending" }));
    yield call(deletePostAPI, action.payload)
    yield call(fetchPostsSaga)
    yield put(successLoadingAction({ name: "DeletePost", msg: "success" }));
    Utility.showMessage("Success", "Successfully deleted!!")
  } catch (error: any) {
    console.log("error in deletePostSaga", error);
    if (error?.message) {
      Utility.showMessage("Alert", error?.message)
    }
    yield put(failedLoadingAction({ name: "DeletePost", msg: error?.message ?? "" }));
  }
}

const homeSagas = [
  takeLatest(getActionType(fetchPostsAction), fetchPostsSaga),
  takeLatest(getActionType(fetchCommentsByPostAction), fetchCommentsByPostSaga),
  takeLatest(getActionType(addPostAction), addPostSaga),
  takeLatest(getActionType(updatePostAction), updatePostSaga),
  takeLatest(getActionType(deletePostAction), deletePostSaga)
]

export default homeSagas
