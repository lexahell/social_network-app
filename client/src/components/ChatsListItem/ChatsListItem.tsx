import React, {useEffect} from 'react';
import styles from './ChatsListItem.module.css'
import {Avatar, Badge, styled} from "@mui/material";
import {useAppDispatch} from "../../hooks/redux.ts";
import {
    setIsChatSelected,
    setRecipientAvatar,
    setRecipientNickname,
    setRecipientUsername,
    setRecipientStatus
} from "../../store/slices/chatSlice.ts";
import {UserStatus} from '../../types/UserStatus.ts'
const StyledBadge = styled(Badge)(() => ({
    '& .MuiBadge-badge': {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 1px rgba(23, 23, 23, .9)`,
    }
}));
interface ChatsListItemProps {
    nickname: string;
    username: string;
    status: UserStatus;
    avatar: string;
    isUserTyping: boolean;
}
const ChatsListItem : React.FC<ChatsListItemProps> = ({
    nickname,
    username,
    status,
    avatar,
    isUserTyping
}) => {
    const dispatch = useAppDispatch()
    const redirectToChat = () => {
        dispatch(setIsChatSelected(true))
        dispatch(setRecipientAvatar(avatar))
        dispatch(setRecipientNickname(nickname))
        dispatch(setRecipientUsername(username))
        dispatch(setRecipientStatus(status))
    }
    useEffect(() => {
        dispatch(setRecipientStatus(status))
    }, [status])
    return (
        <div className={styles.chatsListItem} onClick={redirectToChat}>
            <div className={styles.avatar}>
                {
                    status === UserStatus.ONLINE
                        ? <StyledBadge
                            overlap="circular"
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            variant="dot"
                        >
                            <Avatar alt={nickname} src={avatar}/>
                        </StyledBadge>
                        : <Avatar alt={nickname} src={avatar}/>
                }
            </div>
            <div className={styles.chatsListItemInfo}>
                <div className={styles.userInfo}>
                    <span>{nickname}</span>
                </div>
                <div className={styles.userStatus}>
                    {
                        isUserTyping
                            ? <div className={styles.typingStatus}>
                                <span>{"is typing"}</span>
                                <div className={styles.typingLoader}>
                                    <div className={styles.typingLoaderDot}></div>
                                    <div className={styles.typingLoaderDot}></div>
                                    <div className={styles.typingLoaderDot}></div>
                                </div>
                            </div>
                            : <span>{status === UserStatus.OFFLINE ? "offline" : "online"}</span>
                    }
                </div>
            </div>
        </div>
    );
};

export default ChatsListItem;