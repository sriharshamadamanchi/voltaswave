import { mainAxios } from "../../common/apiWrapper"

export const fetchPostsAPI = async () => {

  const { data } = await mainAxios.get("posts")

  return data
}

export const fetchCommentsByPostAPI = async ({ postId }:{ postId: number }) => {

  const { data } = await mainAxios.get(`comments?postId=${postId}`)

  return data
}

export const addPostAPI = async (payload: { title: string, body: string }) => {

  const { data } = await mainAxios.post("posts", payload)

  return data
}

export const updatePostAPI = async ({ postId, payload }:{ postId: number, payload: { title: string, body: string } }) => {

  const { data } = await mainAxios.put(`posts/${postId}`, payload)

  return data
}

export const deletePostAPI = async ({ postId }:{ postId: number }) => {

  const { data } = await mainAxios.delete(`posts/${postId}`)

  return data
}
