import React from 'react';
import styles from './Friends.module.css';
import {User} from "../../types/User.ts";
interface FriendsProps {
  friends: User[] | undefined;
}
const Friends: React.FC<FriendsProps> = ({ friends }) => {

  if (friends === undefined || friends.length === 0) {
    return null
  }

  return (
      <div className={styles.friends}>

      </div>
  );
};

export default Friends;
