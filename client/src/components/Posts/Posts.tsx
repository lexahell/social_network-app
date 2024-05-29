import {FC} from 'react';
import styles from './Posts.module.css'
import {Post} from "../../types/Post.ts";
import PostsItem from "../PostItem/PostsItem.tsx";
interface PostsProps {
    isOtherUserPosts: boolean;
    posts: Post[]
}
const Posts : FC<PostsProps> = ({posts, isOtherUserPosts}) => {
    return (
        <div className={styles.posts}>
            {posts.map((post, idx) => (
                <PostsItem
                    authorName={post.author as string}
                    postBody={post.value}
                    img={'/broken-image.jpg'}
                    createDate={post.timestamp}
                    isOtherUserPost={isOtherUserPosts}
                    key={idx}
                />
            ))}
        </div>
    );
};

export default Posts;