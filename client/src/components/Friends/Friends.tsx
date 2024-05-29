import React from 'react';
import styles from './Friends.module.css';
import {User} from "../../types/User.ts";
import UserCard from "../UserCard/UserCard.tsx";
interface FriendsProps {
  friends: User[] | undefined;
  isFriend: (user: User) => boolean;
  isSubscriber: (user: User) => boolean;
  isSubscribed: (username: string) => boolean;
}
const Friends: React.FC<FriendsProps> = ({ friends, isFriend, isSubscriber, isSubscribed }) => {

  if (friends === undefined || friends.length === 0) {
    return null
  }

  return (
      <div className={styles.friends}>
        <h2 className={styles.title}>Friends</h2>
        {friends.map((user) => (
            <UserCard
                user={user}
                isFriend={isFriend}
                isSubscriber={isSubscriber}
                isSubscribed={isSubscribed}
                key={user.username}
            />
        ))}
      </div>
  );
};

export default Friends;
