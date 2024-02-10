import React from 'react';
import styles from './PostItem.module.css'
interface PostItemProps {
    img: string;
    authorName: string;
    postBody: string;
}

const PostsItem : React.FC<PostItemProps> = ({
    img,
    authorName,
    postBody
}) => {
    return (
        <div className={styles.post}>
            <div className={styles.postTitle}>
                <div className={styles.imgContainer}>
                    <img
                        src={img}
                        alt=''
                    />
                </div>
                <div className={styles.authorNameContainer}>
                    <div className={styles.authorName}>{authorName}</div>
                </div>
            </div>
            <div className={styles.postBody}>
                <div>
                    {postBody}
                </div>
            </div>
        </div>
    );
};

export default PostsItem;