import styles from "./styles.module.css"
import {useAppDispatch} from "../../hooks/redux.ts";
import {useNavigate} from "react-router-dom";
import {
    setIsOtherUserProfile,
    setIsThisUserFriend, setIsThisUserSubscriber,
    setProfileNickname,
    setProfileUsername, setUserStatus
} from "../../store/slices/profileSlice.ts";
import {RouteNames} from "../../router/routes.tsx";
import {Avatar} from "@mui/material";
import {User} from "../../types/User.ts";
import {FC} from "react";

interface FoundUserProps {
    foundUser: User;
    isFriend: (user: User) => boolean;
    isSubscriber: (user: User) => boolean;
    isSubscribed: (user: User) => boolean;
}

const FoundUser: FC<FoundUserProps> = ({foundUser, isFriend, isSubscriber}) => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const redirectToProfile = (username: string, nickname: string) => {
        dispatch(setProfileUsername(username))
        dispatch(setProfileNickname(nickname))
        dispatch(setUserStatus(foundUser.status))
        dispatch(setIsOtherUserProfile(true))
        dispatch(setIsThisUserFriend(isFriend(foundUser)))
        dispatch(setIsThisUserSubscriber(isSubscriber(foundUser)))
        navigate(`${RouteNames.PROFILE}/${username}`)
    }

    return (
        <div className={styles.foundUserItemContainer}>
            <div className={styles.foundUserItemInfo}>
                <div className={styles.avatarContainer}>
                    <Avatar alt={foundUser.nickname} src={'/broken-image.jpg'} sx={{width: 70, height: 70}}/>
                </div>
                <div className={styles.foundUserTextContainer}>
                    <div className={styles.foundUserName}>{foundUser.nickname}</div>
                    <div className={styles.onlineStatus}>
                        <span>{foundUser.status}</span>
                    </div>
                </div>
            </div>
            <div className={styles.SubscribeBtnContainer}>
                <button className={styles.viewProfileButton} onClick={() => redirectToProfile(foundUser.username, foundUser.nickname)}>
                    View profile
                </button>
            </div>
        </div>
    )
};

export default FoundUser;