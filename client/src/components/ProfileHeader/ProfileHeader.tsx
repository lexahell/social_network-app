import React from 'react';
// import styles from './PostItem.module.css';
interface ProfileHeaderProps {
  avatar?: string;
  userName?: string;
}
import styles from './ProfileHeader.module.css';

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ avatar, userName }) => {
  return (
    <div className={styles.profileHeader}>
      <div className={styles.profileInfo}>
        <div className={styles.imgContainer}>
          <img src={avatar} alt='avatar' />
        </div>
        <div className={styles.usernameContainer}>
          <div className={styles.userName}>{userName}</div>
        </div>
      </div>
      <button className={styles.btnChangeAvatar}>Change avatar</button>
    </div>
  );
};

export default ProfileHeader;
