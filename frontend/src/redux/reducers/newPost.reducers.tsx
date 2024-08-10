import { v4 } from "uuid";



import { TPostData } from "@/src/models/types/PostData.type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import RecApiCallerFactory from "@/src/services/RecApiCallerFactory";


interface PostsState {
  posts: TPostData[];
  newPost: TPostData;
}



const initialState: PostsState = {
  posts: [],
  newPost: {
    body: "",
    author: "",
    created: Date.now(),
    edited: Date.now(),
    id: "",
  },
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<TPostData[]>) => {
      state.posts = action.payload;
    },
    addPost: (state, action: PayloadAction<Partial<TPostData>>) => {
      const newPost: Partial<TPostData> = {
        ...action.payload,
        id: v4(),
        created: Date.now(),
        edited: Date.now(),
      };
      new RecApiCallerFactory().getApiImplementation("posts").addItem(newPost);
    },
    updateNewPost: (state, action: PayloadAction<Partial<TPostData>>) => {
      state.newPost = { ...state.newPost, ...action.payload };
    },
  },
});

export const { setPosts, addPost, updateNewPost } = postsSlice.actions;
export const postsReducer = postsSlice.reducer;