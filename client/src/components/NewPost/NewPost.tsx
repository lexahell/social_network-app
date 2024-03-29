import React from 'react';
import styles from './NewPost.module.css';
import { BsThreeDots } from 'react-icons/bs';
import { useState } from 'react';
import { FaPlus } from 'react-icons/fa6';
const NewPost: React.FC = () => {
  const [value, setValue] = useState('');

  const handleClear = (e) => {
    e.preventDefault();
    setValue('');
  };
  const handleChange = (e) => setValue(e.target.value);
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
          <img
            src='https://masterpiecer-images.s3.yandex.net/633ff90a78fd11ee90cb1e5d9776cfa6:upscaled'
            alt='mini-avatar'
          />
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
