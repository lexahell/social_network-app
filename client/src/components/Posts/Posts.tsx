import React from 'react';
import styles from './Posts.module.css'
interface PostsProps {
    children: React.ReactNode;
}
const Posts : React.FC<PostsProps> = ({children}) => {
    return (
        <div className={styles.posts}>
            {children}
        </div>
    );
};

export default Posts;