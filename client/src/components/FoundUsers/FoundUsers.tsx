import {FC} from 'react';
import styles from "./styles.module.css"
import UserCard from "../UserCard/UserCard.tsx";
import {User} from "../../types/User.ts";
import {CircularProgress} from "@mui/material";

interface FoundUsersProps {
    foundUsers: User[];
    isLoading: boolean;
    isFriend: (user: User) => boolean;
    isSubscriber: (user: User) => boolean;
    isSubscribed: (username: string) => boolean;
}

const FoundUsers: FC<FoundUsersProps> = ({foundUsers, isFriend, isSubscriber, isSubscribed, isLoading}) => {
    return (
        <div className={styles.foundUsers}>
            <h2 className={styles.title}>Found users</h2>
            {
                isLoading
                    ? <CircularProgress size={40} className={styles.loading} color={"inherit"}/>
                    : foundUsers && foundUsers.length !== 0 ? <>
                        {foundUsers.map((user)  => (
                            <UserCard
                                user={user}
                                isFriend={isFriend}
                                isSubscriber={isSubscriber}
                                isSubscribed={isSubscribed}
                                key={user.username}
                            />
                        ))}
                    </> : <span className={styles.emptySearchList}>No users found👻</span>
            }
        </div>
    );
};

export default FoundUsers;