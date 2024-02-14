import React from 'react';
import styles from './FriendItem.module.css';

const FriendItem: React.FC = () => {
  return (
    <div>
      <div>
        <div className={styles.avatarContainer}>
          <img
            src={
              'https://masterpiecer-images.s3.yandex.net/633ff90a78fd11ee90cb1e5d9776cfa6:upscaled'
            }
            alt='avatar'
          />
        </div>
        <div>
          <div>Travis Skot</div>
          <div>
            <div>Write message</div>
          </div>
        </div>
      </div>
      <div>
        <button>:</button>
      </div>
    </div>
  );
};
export default FriendItem;
