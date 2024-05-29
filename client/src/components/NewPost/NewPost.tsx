import {ChangeEventHandler, FC, MouseEventHandler} from 'react';
import styles from './NewPost.module.css';
import { BsThreeDots } from 'react-icons/bs';
import { useState } from 'react';
import { FaPlus } from 'react-icons/fa6';
import {Avatar} from "@mui/material";
import {Post} from "../../types/Post.ts";

interface NewPostProps {
  nickname: string;
  avatar: string;
  writePost: (post: Post) => void;
}

const NewPost: FC<NewPostProps> = ({nickname, avatar, writePost}) => {
  const [text, setText] = useState<string>('');

  const confirmPostCreation: MouseEventHandler<HTMLButtonElement> = () => {
    writePost({
      value: text,
      timestamp: new Date()
    })
    setText("")
  };
  const handleChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => setText(e.target.value);
  return (
    <div className={styles.newPostContainer}>
      <div className={styles.buttonsCreatePost}>
        <button className={styles.sendNewPostButton} onClick={confirmPostCreation}>
          <div>
            <FaPlus />
          </div>
          <span>Create Post</span>
        </button>
        <button className={styles.squareButton}>
          <BsThreeDots />
        </button>
      </div>
      <div className={styles.textareaContainer}>
        <div className={styles.miniAvatar}>
          <Avatar alt={nickname} src={avatar}/>
        </div>

        <textarea
          value={text}
          onChange={handleChange}
          className={styles.newPostInput}
          placeholder='Enter your post'
          cols={10}
        ></textarea>
      </div>
    </div>
  );
};

export default NewPost;
