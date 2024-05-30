import {FC} from 'react';
import styles from "./styles.module.css"
import UserCard from "../UserCard/UserCard.tsx";
import {User} from "../../types/User.ts";
import {CircularProgress} from "@mui/material";

interface FoundUsersProps {
    foundUsers: User[];
    isLoading: boolean;
}

const FoundUsers: FC<FoundUsersProps> = ({foundUsers,isLoading}) => {
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
                                key={user.username}
                            />
                        ))}
                    </> : <span className={styles.emptySearchList}>No users found👻</span>
            }
        </div>
    );
};

export default FoundUsers;