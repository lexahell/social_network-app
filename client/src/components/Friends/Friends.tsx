import React from 'react';
import styles from './Friends.module.css';
interface FriendsProps {
  children: React.ReactNode;
}
const Friends: React.FC<FriendsProps> = ({ children }) => {
  return <div className={styles.friends}>{children}</div>;
};

export default Friends;
