import React, { useState } from 'react';
import styles from './PostItem.module.css';
import { GoHeart, GoHeartFill, GoComment } from 'react-icons/go';
import { TbShare3 } from 'react-icons/tb';

interface PostItemProps {
  img: string;
  authorName: string;
  postBody: string;
}

const PostsItem: React.FC<PostItemProps> = ({ img, authorName, postBody }) => {
  const [isLiked, switchIsLiked] = useState(false);
  return (
    <div className={styles.post}>
      <div className={styles.postTitle}>
        <div className={styles.imgContainer}>
          <img src={img} alt='' />
        </div>
        <div className={styles.authorNameContainer}>
          <div className={styles.authorName}>{authorName}</div>
        </div>
      </div>
      <div className={styles.postBody}>
        <div>{postBody}</div>
      </div>
      <div className={styles.actionsContainer}>
        {isLiked ? (
          <button
            className={styles.likeBtnActive + ' ' + styles.actionBtn}
            onClick={() => {
              switchIsLiked(false);
            }}
          >
            <GoHeartFill />
          </button>
        ) : (
          <button
            className={styles.likeBtnInactive + ' ' + styles.actionBtn}
            onClick={() => {
              switchIsLiked(true);
            }}
          >
            <GoHeart />
          </button>
        )}
        <button className={styles.actionBtn}>
          <GoComment />
        </button>
        <button className={styles.actionBtn}>
          <TbShare3 />
        </button>
      </div>
    </div>
  );
};

export default PostsItem;
