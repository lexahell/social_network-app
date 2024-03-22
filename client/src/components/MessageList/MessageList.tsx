import React, {useEffect, useRef} from 'react';
import {useAppSelector} from "../../hooks/redux.ts";
import styles from './MessageList.module.css'
import Message from "../Message/Message.tsx";
const MessageList : React.FC = () => {
    const {messages} = useAppSelector(state => state.messagesReducer)
    const messageListRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
        if (messageListRef.current) {
            messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
        }
    }, [messages])
    return (
        <div className={styles.messageList} ref={messageListRef}>
            {messages.map(message => (
                <Message messageContent={message.messageContent}/>
            ))}
        </div>
    );
};

export default MessageList;