import React from 'react';
import styles from './ChatContent.module.css'
import {Avatar} from "@mui/material";
import {UserStatus} from "../../store/slices/chatSlice.ts";
import {useAppSelector} from "../../hooks/redux.ts";
import ChatInput from "../UI/ChatInput/ChatInput.tsx";
import MessageList from "../MessageList/MessageList.tsx";

const ChatContent : React.FC = () => {
    const {userName, userAvatar, status} = useAppSelector(state => state.chatReducer)
    return (
        <div className={styles.chatContent}>
            <div className={styles.chatInfo}>
                <div className={styles.avatar}>
                    <Avatar src={userAvatar}/>
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
            <MessageList/>
            <ChatInput/>
        </div>
    );
};

export default ChatContent;