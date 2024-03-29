import React from 'react';
// import styles from './PostItem.module.css';
import styles from './ProfileHeader.module.css';
import { BiMessageDetail } from 'react-icons/bi';
import { BsThreeDots } from 'react-icons/bs';
interface ProfileHeaderProps {
  avatar?: string;
  userName?: string;
  pageCover?: string;
  about?: string;
}
const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  avatar,
  userName,
  pageCover,
  about,
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
          <div>
            <div className={styles.mainInfoUserName}>{userName}</div>
            <div className={styles.mainInfoAbout}>{about}</div>
          </div>
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
