import React, {useEffect} from 'react';
import styles from './ChatContent.module.css'
import {Avatar, Badge, styled} from "@mui/material";
import {UserStatus} from "../../types/UserStatus.ts";
import {useAppDispatch, useAppSelector} from "../../hooks/redux.ts";
import ChatInput from "../UI/ChatInput/ChatInput.tsx";
import MessageList from "../MessageList/MessageList.tsx";
import {useGetChatHistoryQuery} from "../../services/socialAppService.ts";
import {addMessage, setHistoryOfChat, setLastReceivedMessage} from "../../store/slices/messageSlice.ts";
import Loader from "../UI/Loader/Loader.tsx";
import {WebSocketService} from "../../services/WebSocketService.ts";
import {Message} from "../../types/Message.ts";
const StyledBadge = styled(Badge)(() => ({
    '& .MuiBadge-badge': {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 1px rgba(23, 23, 23, .9)`,
    }
}));
const ChatContent : React.FC = () => {
    const {recipientNickname, recipientAvatar, status, recipientUsername} = useAppSelector(state => state.chatReducer)
    const {username} = useAppSelector(state => state.authReducer)
    const {data, isLoading} = useGetChatHistoryQuery({
        senderUsername: username,
        recipientUsername,
        token: localStorage.getItem("token") ?? ""
    }, {
        skip: !localStorage.getItem("token"),
        refetchOnFocus: true
    })
    const {messages, lastReceivedMessage} = useAppSelector(state => state.messagesReducer)
    const dispatch = useAppDispatch()
    WebSocketService.setDispatch(dispatch)
    useEffect(() => {
        if(data) {
            dispatch(setHistoryOfChat(data))
        }
    }, [data]);
    useEffect(() => {
        if (lastReceivedMessage.senderUsername === recipientUsername) {
            dispatch(addMessage(lastReceivedMessage))
            dispatch(setLastReceivedMessage({} as Message))
        }
    }, [lastReceivedMessage]);
    return (
        <div className={styles.chatContent}>
            {
                isLoading
                    ? <Loader size={50}/>
                    : <>
                        <div className={styles.chatInfo}>
                            <div className={styles.avatar}>
                                {
                                    status === UserStatus.ONLINE
                                        ? <StyledBadge
                                            overlap="circular"
                                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                            variant="dot"
                                        >
                                            <Avatar alt={recipientNickname} src={recipientAvatar}/>
                                        </StyledBadge>
                                        : <Avatar alt={recipientNickname} src={recipientAvatar}/>
                                }
                            </div>
                            <div className={styles.chatsListItemInfo}>
                                <div className={styles.userInfo}>
                                    <span>{recipientNickname}</span>
                                </div>
                                <div className={styles.userStatus}>
                                    <span>{status === UserStatus.OFFLINE ? "offline" : "online"}</span>
                                </div>
                            </div>
                        </div>
                        <MessageList messages={messages}/>
                        <ChatInput/>
                    </>
            }
        </div>
    );
};

export default ChatContent;