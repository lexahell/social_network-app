import {FC} from 'react';
import styles from "./styles.module.css"
import {User} from "../../types/User.ts";
import UserCard from "../UserCard/UserCard.tsx";

interface SubscribersProps {
    subscribers: User[] | undefined;
}

const Subscribers: FC<SubscribersProps> = ({subscribers}) => {

    if (subscribers === undefined || subscribers.length === 0) {
        return null
    }

    return (
        <div className={styles.subscribers}>
            <h2 className={styles.title}>Subscribers</h2>
            {subscribers.map((user) => (
                <UserCard
                    user={user}
                    key={user.username}
                />
            ))}
        </div>
    );
};

export default Subscribers;