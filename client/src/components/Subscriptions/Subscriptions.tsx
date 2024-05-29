import {User} from "../../types/User.ts";
import {FC} from "react";
import styles from "./styles.module.css"

interface SubscriptionsProps {
    subscriptions: User[] | undefined;
}

const Subscriptions: FC<SubscriptionsProps> = ({subscriptions}) => {

    if (subscriptions === undefined || subscriptions.length === 0) {
        return null
    }

    return (
        <div className={styles.subscriptions}>
            <h2 className={styles.title}>Subscriptions</h2>
        </div>
    );
};

export default Subscriptions;