import {FC} from 'react';
import styles from "./styles.module.css"
import {User} from "../../types/User.ts";
import FoundUser from "../FoundUser/FoundUser.tsx";

interface FoundUsersProps {
    foundUsers: User[];
    isFriend: (user: User) => boolean;
    isSubscriber: (user: User) => boolean;
    isSubscribed: (user: User) => boolean;
}

const FoundUsers: FC<FoundUsersProps> = ({foundUsers, isFriend, isSubscriber, isSubscribed}) => {
    return (
        <div className={styles.foundUsers}>
            <h2 className={styles.title}>Found users</h2>
            {foundUsers.map((foundUser)  => (
                <FoundUser
                    foundUser={foundUser}
                    isFriend={isFriend}
                    isSubscriber={isSubscriber}
                    is
                    key={foundUser.username}
                />
            ))}
        </div>
    );
};

export default FoundUsers;