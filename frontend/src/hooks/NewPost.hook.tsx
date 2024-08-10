import React, { useState } from "react"
import { TPostData } from "../models/types/PostData.type";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../redux/store/newPost.store";
import { addPost, updateNewPost } from "../redux/reducers/newPost.reducers";
import { selectNewPost } from "../redux/selectors/newPost.selectors";

 const HNewPost = () => {
    const dispatch = useDispatch<AppDispatch>();
    const newPostData = useSelector(selectNewPost);

    const handleContentChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(updateNewPost({ [field]: event.target.value }));
      };
    const handleAddPost = () => {
        dispatch(addPost({
            body: newPostData.body, author: "User@mail.com",
        }))
    }

    return {
        newPostData,
        dispatch,
        handleContentChange,
        handleAddPost
    }
}
export default HNewPost;