import {ChangeEventHandler, FC, MouseEventHandler} from 'react';
import styles from './NewPost.module.css';
import { BsThreeDots } from 'react-icons/bs';
import { useState } from 'react';
import { FaPlus } from 'react-icons/fa6';
import {Avatar} from "@mui/material";

interface NewPostProps {
  nickname: string;
  avatar: string;
}

const NewPost: FC<NewPostProps> = ({nickname, avatar}) => {
  const [value, setValue] = useState('');

  const handleClear: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    setValue('');
  };
  const handleChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => setValue(e.target.value);
  return (
    <div className={styles.newPostContainer}>
      <div className={styles.buttonsCreatePost}>
        <button className={styles.sendNewPostButton} onClick={handleClear}>
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
          value={value}
          onChange={handleChange}
          className={styles.newPostInput}
          placeholder='Enter your post'
          cols={10}
        ></textarea>
      </div>
      {/* <button className={styles.btnAddPost}>Add post</button> */}
    </div>
  );
};

export default NewPost;
