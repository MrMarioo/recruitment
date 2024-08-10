import { selectPosts } from "@/src/redux/selectors/newPost.selectors";
import { FC } from "react";
import { useSelector } from "react-redux";
import { Post } from "../Post/Post";

const PostList: FC =() => {
    const data = useSelector(selectPosts);

    return(
        <div>
            {data.map((post) => (
                <Post
                    key={post.id}
                    handle={`@${post.author.toLowerCase().replace(' ', '')}`}
                    likes={'0'}
                    time={new Date(post.created).toLocaleDateString('pl-PL', { day: 'numeric', month: 'short' })}
                    post={post}
                />
            ))}
        </div>
    )
}

export default PostList;