import React from 'react';
import styles from './NewPost.module.css';
const NewPost: React.FC = () => {
  return (
    <div className={styles.newPostContainer}>
      <div className={styles.textareaContainer}>
        <textarea
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
