import React, {useEffect, useRef} from 'react';
import styles from './MessageList.module.css'
import Message from "../Message/Message.tsx";
import {Message as ChatMessage} from '../../types/Message.ts'
interface MessageListProps {
    messages: ChatMessage[];
}
const MessageList : React.FC<MessageListProps> = ({messages}) => {
    const messageListRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
        if (messageListRef.current) {
            messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
        }
    }, [messages])
    return (
        <div className={styles.messageList} ref={messageListRef}>
            {messages.map((message, index) => (
                <Message messageContent={message.content} senderUsername={message.senderUsername} key={index}/>
            ))}
        </div>
    );
};

export default MessageList;