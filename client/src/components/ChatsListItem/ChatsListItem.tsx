import React from 'react';
import styles from './ChatsListItem.module.css'
import {Avatar, Badge, styled} from "@mui/material";
import {useAppDispatch} from "../../hooks/redux.ts";
import {setIsChatSelected, setStatus, setRecipientAvatar, setRecipientNickname, setRecipientUsername} from "../../store/slices/chatSlice.ts";
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
}
const ChatsListItem : React.FC<ChatsListItemProps> = ({
    nickname,
    username,
    status,
    avatar
}) => {
    const dispatch = useAppDispatch()
    const redirectToChat = () => {
        dispatch(setIsChatSelected(true))
        dispatch(setRecipientAvatar(avatar))
        dispatch(setRecipientNickname(nickname))
        dispatch(setRecipientUsername(username))
        dispatch(setStatus(status))
    }
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
                    <span>{status === UserStatus.OFFLINE ? "offline" : "online"}</span>
                </div>
            </div>
        </div>
    );
};

export default ChatsListItem;