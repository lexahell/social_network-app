import {FC, useState} from 'react';
import styles from "./styles.module.css"
import {BsThreeDots} from "react-icons/bs";
import {BiMessageDetail} from "react-icons/bi";
import {useSubscribeMutation, useUnsubscribeMutation} from "../../services/socialAppService.ts";
import {CircularProgress} from "@mui/material";
import {
    setIsChatSelected,
    setRecipientAvatar,
    setRecipientNickname, setRecipientStatus,
    setRecipientUsername
} from "../../store/slices/chatSlice.ts";
import {RouteNames} from "../../router/routes.tsx";
import {useAppDispatch} from "../../hooks/redux.ts";
import {UserStatus} from "../../types/UserStatus.ts";
import {useNavigate} from "react-router-dom";


interface ProfileHeaderButtonsProps {
    username: string;
    nickname: string;
    userStatus: UserStatus;
    isOtherUserProfile: boolean;
    isFriend: boolean;
    isSubscribed: boolean;
}

const ProfileHeaderButtons: FC<ProfileHeaderButtonsProps> = ({username, isOtherUserProfile, isFriend, isSubscribed, userStatus, nickname}) => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const [subscribe, {isLoading: isSubscriptionLoading}] = useSubscribeMutation()
    const [unsubscribe, {isLoading: isUnsubscriptionLoading}] = useUnsubscribeMutation()
    const [isUserSubscribed, setIsUserSubscribed] = useState<boolean>(isSubscribed || isFriend)
    const confirmClick = async () => {
        if (isSubscribed || isFriend) {
            await unsubscribe({
                username,
                token: localStorage.getItem("token") ?? ""
            })
        } else {
            await subscribe({
                username,
                token: localStorage.getItem("token") ?? ""
            })
        }

        setIsUserSubscribed(!isUserSubscribed)
    }

    const redirectToChat = () => {
        dispatch(setIsChatSelected(true))
        dispatch(setRecipientAvatar('/broken-image.jpg'))
        dispatch(setRecipientNickname(nickname))
        dispatch(setRecipientUsername(username))
        dispatch(setRecipientStatus(userStatus))
        navigate(RouteNames.DIALOGS)
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
            <button className={styles.subscribeButton} onClick={confirmClick} disabled={isSubscriptionLoading || isUnsubscriptionLoading}>
                {
                    isSubscriptionLoading || isUnsubscriptionLoading
                        ? <CircularProgress size={25} color={"inherit"}/>
                        : isUserSubscribed ? 'Unsubscribe' : 'Subscribe'
                }
            </button>
            {
                isFriend && <button className={styles.squareButton} onClick={redirectToChat}>
                    <BiMessageDetail/>
                </button>
            }
        </div>
    );
};

export default ProfileHeaderButtons;