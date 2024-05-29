import {FC} from 'react';
import styles from "./styles.module.css"
import {BsThreeDots} from "react-icons/bs";
import {BiMessageDetail} from "react-icons/bi";
import {useSubscribeMutation} from "../../services/socialAppService.ts";

interface ProfileHeaderButtonsProps {
    username: string;
    isOtherUserProfile: boolean;
    isFriend: boolean;
    isSubscriber: boolean;
    isSubscribed: boolean;
}

const ProfileHeaderButtons: FC<ProfileHeaderButtonsProps> = ({username, isOtherUserProfile, isFriend, isSubscriber, isSubscribed}) => {
    const [subscribe] = useSubscribeMutation()

    const confirmSubscribe = () => {
        subscribe({
            username,
            token: localStorage.getItem("token") ?? ""
        })
    }

    if (!isOtherUserProfile) {
        return (
            <button className={styles.squareButton}>
                <BsThreeDots/>
            </button>
        )
    }

    return (
        <div className={styles.profileButtons}>
            <button className={styles.subscribeButton}>{isSubscribed ? 'Unsubscribe' : 'Subscribe'}</button>
            {
                isFriend && <button className={styles.squareButton} onClick={confirmSubscribe}>
                    <BiMessageDetail/>
                </button>
            }
        </div>
    );
};

export default ProfileHeaderButtons;