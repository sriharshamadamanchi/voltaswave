export type loaderType = {
  loading: boolean,
  success?: {
    status: boolean,
    msg: string
  },
  failure?: {
    status: boolean,
    msg: string,
    id?: string
  },
  msg?: string
};

export type loaderReducerStateType = {
  loading: boolean,
  loaders: Record<string, loaderType>
};

export type homeReducerStateType = {
  posts: PostType[]
  comments: Record<number, CommentType[]>
};

export type storeType = {
  loader: loaderReducerStateType,
  home: homeReducerStateType
}

export type PostType = {
  userId: number
  id: number
  title: string
  body: string
}

export type CommentType = {
  postId: number
  id: number
  name: string
  email: string
  body: string
}
