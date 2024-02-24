import React from 'react';
// import styles from './PostItem.module.css';
interface ProfileHeaderProps {
  avatar?: string;
  userName?: string;
  pageCover?: string;
}
import styles from './ProfileHeader.module.css';
import { BiMessageDetail } from 'react-icons/bi';
import { BsThreeDots } from 'react-icons/bs';

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  avatar,
  userName,
  pageCover,
}) => {
  return (
    <div className={styles.profileHeader}>
      <div className={styles.coverContainer}>
        <img src={pageCover} className={styles.pageCover} />
      </div>
      <div className={styles.profileInfo}>
        <div className={styles.mainInfo}>
          <div>
            <img src={avatar} alt='' className={styles.profileAvatar} />
          </div>
          <div className={styles.mainInfoUserName}>{userName}</div>
        </div>
        <div className={styles.profileButtons}>
          <button className={styles.subscribeButton}>Subsciribe</button>
          <button className={styles.squareButton}>
            <BiMessageDetail />
          </button>
          <button className={styles.squareButton}>
            <BsThreeDots />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
