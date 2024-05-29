import React, { useState } from 'react';
import styles from './PostItem.module.css';
import { GoHeart, GoHeartFill, GoComment } from 'react-icons/go';
import { TbShare3 } from 'react-icons/tb';
import {Avatar} from "@mui/material";
import dayjs from "dayjs";

interface PostItemProps {
  img: string;
  authorName: string;
  postBody: string;
  createDate: Date;
  isOtherUserPost: boolean;
}

const PostsItem: React.FC<PostItemProps> = ({ img, authorName, postBody, createDate, isOtherUserPost }) => {
  const [isLiked, switchIsLiked] = useState(false);

  const printPostCreationDate = (): string => {
      return dayjs(createDate).format("DD.MM.YYYY HH:mm")
  }

  return (
    <div className={styles.post}>
      <div className={styles.postTitle}>
        <div className={styles.imgContainer}>
            <Avatar alt={authorName} src={img} sx={{width: 50, height: 50}}/>
        </div>
          <div className={styles.postInfoContainer}>
              <div className={styles.authorName}>{authorName}</div>
              <span className={styles.createDate}>{printPostCreationDate()}</span>
          </div>
      </div>
        <div className={styles.postBody}>
            <div>{postBody}</div>
        </div>
        {
            isOtherUserPost && <div className={styles.actionsContainer}>
                {isLiked ? (
                    <button
                        className={styles.likeBtnActive + ' ' + styles.actionBtn}
                        onClick={() => {
                            switchIsLiked(false);
                        }}
                    >
                        <GoHeartFill color={'fff'}/>
                    </button>
                ) : (
                    <button
                        className={styles.likeBtnInactive + ' ' + styles.actionBtn}
                        onClick={() => {
                            switchIsLiked(true);
                        }}
                    >
                        <GoHeart color={'fff'}/>
                    </button>
                )}
                <button className={styles.actionBtn}>
                    <GoComment color={'fff'}/>
                </button>
                <button className={styles.actionBtn}>
                    <TbShare3 color={'fff'}/>
                </button>
            </div>
        }
    </div>
  );
};

export default PostsItem;
