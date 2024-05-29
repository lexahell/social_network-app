import {User} from "../../types/User.ts";
import {FC} from "react";
import styles from "./styles.module.css"
import UserCard from "../UserCard/UserCard.tsx";

interface SubscriptionsProps {
    subscriptions: User[] | undefined;
    isFriend: (user: User) => boolean;
    isSubscriber: (user: User) => boolean;
    isSubscribed: (username: string) => boolean;
}

const Subscriptions: FC<SubscriptionsProps> = ({subscriptions, isFriend, isSubscriber, isSubscribed}) => {

    if (subscriptions === undefined || subscriptions.length === 0) {
        return null
    }

    return (
        <div className={styles.subscriptions}>
            <h2 className={styles.title}>Subscriptions</h2>
            {subscriptions.map((user) => (
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

export default Subscriptions;