import { RootState } from "../store/newPost.store";

export const selectPosts = (state: RootState) => state.posts.posts;
export const selectNewPost = (state: RootState) => state.posts.newPost;
