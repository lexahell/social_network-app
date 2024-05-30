import styles from "./styles.module.css"
import {useAppDispatch} from "../../hooks/redux.ts";
import {useNavigate} from "react-router-dom";
import {
    setIsOtherUserProfile,
    setIsSubscribed,
    setIsThisUserFriend,
    setProfileNickname,
    setProfileUsername,
    setUserStatus
} from "../../store/slices/profileSlice.ts";
import {RouteNames} from "../../router/routes.tsx";
import {Avatar, Badge, CircularProgress, styled} from "@mui/material";
import {User} from "../../types/User.ts";
import {FC, useEffect, useState} from "react";
import {BiMessageDetail} from "react-icons/bi";
import {UserStatus} from "../../types/UserStatus.ts";
import {useLazyCheckRelationQuery, useSubscribeMutation} from "../../services/socialAppService.ts";
import {
    setIsChatSelected,
    setRecipientAvatar,
    setRecipientNickname,
    setRecipientStatus,
    setRecipientUsername
} from "../../store/slices/chatSlice.ts";
import dayjs from "dayjs";
import {setExecTime} from "../../store/slices/friendsSlice.ts";


const StyledBadge = styled(Badge)(() => ({
    '& .MuiBadge-badge': {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 1px rgba(23, 23, 23, .9)`,
    }
}));

interface UserCardProps {
    user: User;
}

const UserCard: FC<UserCardProps> = ({user}) => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const [subscribe, {isLoading: isSubscriptionLoading}] = useSubscribeMutation()
    const [checkRelation] = useLazyCheckRelationQuery()
    const [relation, setRelation] = useState<string>("")

    useEffect(() => {
        getRelations(user.username)
    }, [])

    const getRelations = async (username: string) => {
        const relation = await checkRelation({
            username,
            token: localStorage.getItem("token") ?? ""
        }).unwrap()

        setRelation(relation.message)
    }

    const confirmClick = async () => {
        await subscribe({
            username: user.username,
            date: dayjs().unix(),
            token: localStorage.getItem("token") ?? ""
        })
        dispatch(setExecTime(dayjs().unix()))
    }

    const redirectToProfile = (username: string, nickname: string) => {
        dispatch(setProfileUsername(username))
        dispatch(setProfileNickname(nickname))
        dispatch(setUserStatus(user.status))
        dispatch(setIsOtherUserProfile(true))
        dispatch(setIsThisUserFriend(relation === "Friends"))
        dispatch(setIsSubscribed(relation === "Subscribed" || relation === "Friends"))
        navigate(`${RouteNames.PROFILE}/${username}`)
    }

    const redirectToChat = () => {
        dispatch(setIsChatSelected(true))
        dispatch(setRecipientAvatar('/broken-image.jpg'))
        dispatch(setRecipientNickname(user.nickname))
        dispatch(setRecipientUsername(user.username))
        dispatch(setRecipientStatus(user.status))
        navigate(RouteNames.DIALOGS)
    }

    return (
        <div className={styles.userItemContainer}>
            <div className={styles.userItemInfo}>
                <div className={styles.avatarContainer}>
                    {
                        user.status === UserStatus.ONLINE
                            ? <StyledBadge
                                overlap="circular"
                                anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                                variant="dot"
                            >
                                <Avatar alt={user.nickname} src={'/broken-image.jpg'} sx={{width: 70, height: 70}}/>
                            </StyledBadge>
                            : <Avatar alt={user.nickname} src={'/broken-image.jpg'} sx={{width: 70, height: 70}}/>
                    }
                </div>
                <div className={styles.userTextContainer}>
                    <div className={styles.userName}>{user.nickname}</div>
                    <div className={styles.onlineStatus}>
                        <span>{user.status === UserStatus.ONLINE ? "online" : "offline"}</span>
                    </div>
                </div>
            </div>
            <div className={styles.SubscribeBtnContainer}>
                <button className={styles.viewProfileButton} onClick={() => redirectToProfile(user.username, user.nickname)}>
                    View profile
                </button>
                {
                    relation === "Subscriber" && <button className={styles.friendRequestButton} onClick={confirmClick}>
                        {
                            isSubscriptionLoading
                                ? <CircularProgress size={25} color={"inherit"}/>
                                : 'Subscribe'
                        }
                    </button>
                }
                {
                    relation === "Friends" && <button className={styles.messageButton} onClick={redirectToChat}>
                        <BiMessageDetail/>
                    </button>
                }
            </div>
        </div>
    )
};

export default UserCard;