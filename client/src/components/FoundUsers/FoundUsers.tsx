import {FC} from 'react';
import styles from "./styles.module.css"
import UserCard from "../UserCard/UserCard.tsx";
import {User} from "../../types/User.ts";

interface FoundUsersProps {
    foundUsers: User[];
    isFriend: (user: User) => boolean;
    isSubscriber: (user: User) => boolean;
    isSubscribed: (username: string) => boolean;
}

const FoundUsers: FC<FoundUsersProps> = ({foundUsers, isFriend, isSubscriber, isSubscribed}) => {
    return (
        <div className={styles.foundUsers}>
            <h2 className={styles.title}>Found users</h2>
            {foundUsers.map((user)  => (
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

export default FoundUsers;