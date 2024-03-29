import React from 'react';
import styles from './ChatsListItem.module.css'
import {Avatar} from "@mui/material";
import {useAppDispatch} from "../../hooks/redux.ts";
import {setIsChatSelected, setStatus, setUserAvatar, setUserName, UserStatus} from "../../store/slices/chatSlice.ts";
interface ChatsListItemProps {
    userName: string;
    status: UserStatus;
    avatar: string;
}
const ChatsListItem : React.FC<ChatsListItemProps> = ({
    userName,
    status,
    avatar
}) => {
    const dispatch = useAppDispatch()
    const redirectToChat = () => {
        dispatch(setIsChatSelected(true))
        dispatch(setUserAvatar(avatar))
        dispatch(setUserName(userName))
        dispatch(setStatus(status))
    }
    return (
        <div className={styles.chatsListItem} onClick={redirectToChat}>
            <div className={styles.avatar}>
                <Avatar src={avatar}/>
            </div>
            <div className={styles.chatsListItemInfo}>
                <div className={styles.userInfo}>
                    <span>{userName}</span>
                </div>
                <div className={styles.userStatus}>
                    <span>{status === UserStatus.OFFLINE ? "offline" : "online"}</span>
                </div>
            </div>
        </div>
    );
};

export default ChatsListItem;