import React from 'react';
import styles from './FriendItem.module.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { RouteNames } from '../../router/routes.tsx';

const FriendItem: React.FC = () => {
  const [subscriptionStatus, setSubscriptionStatus] = useState(true);
  const changeSubscriptionStatus = () => {
    setSubscriptionStatus(!subscriptionStatus);
  };
  return (
    <div className={styles.friendItemContainer}>
      <div className={styles.friendItemInfo}>
        <div className={styles.avatarContainer}>
          <img
            src={
              'https://masterpiecer-images.s3.yandex.net/633ff90a78fd11ee90cb1e5d9776cfa6:upscaled'
            }
            alt='avatar'
          />
          <div className={styles.onlineStatus}></div>
        </div>
        <div className={styles.friendTextContainer}>
          <div className={styles.friendName}>Travis Skot</div>
          <div className={styles.writeMessageLinkContainer}>
            {/* пока ведет на главную, потом будет вести к переписке */}
            <Link to={RouteNames.HOME}>Write message</Link>
          </div>
        </div>
      </div>
      <div className={styles.followBtnContainer}>
        <button onClick={changeSubscriptionStatus} className={styles.followBtn}>
          {subscriptionStatus ? 'Unfollow' : 'Follow'}
        </button>
      </div>
    </div>
  );
};
export default FriendItem;
