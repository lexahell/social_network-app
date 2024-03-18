import React from 'react';
import styles from './NewPost.module.css';
import { BsThreeDots } from 'react-icons/bs';
import { useState } from 'react';
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
            <svg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
              <path d='M7.29289322,18 L18.7928932,6.5 L16.5,4.20710678 L5,15.7071068 L5,18 L7.29289322,18 Z M4,18.5 L4,15.5 C4,15.3673918 4.05267842,15.2402148 4.14644661,15.1464466 L16.1464466,3.14644661 C16.3417088,2.95118446 16.6582912,2.95118446 16.8535534,3.14644661 L19.8535534,6.14644661 C20.0488155,6.34170876 20.0488155,6.65829124 19.8535534,6.85355339 L7.85355339,18.8535534 C7.7597852,18.9473216 7.63260824,19 7.5,19 L4.5,19 C4.22385763,19 4,18.7761424 4,18.5 Z M4.5,21 C4.22385763,21 4,20.7761424 4,20.5 C4,20.2238576 4.22385763,20 4.5,20 L14.5069431,20 C14.7830855,20 15.0069431,20.2238576 15.0069431,20.5 C15.0069431,20.7761424 14.7830855,21 14.5069431,21 L4.5,21 Z' />
            </svg>
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
