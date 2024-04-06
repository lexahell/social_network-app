import React from 'react';
import styles from './Message.module.css'
import {useAppSelector} from "../../hooks/redux.ts";
interface MessageProps {
    messageContent: string;
    senderUsername: string;
}
const Message : React.FC<MessageProps> = ({messageContent, senderUsername}) => {
    const {username} = useAppSelector(state => state.authReducer)
    return (
        <div className={`${styles.message} ${senderUsername !== username ? styles.friendMessage : ''}`}>
            {messageContent.split('\n').map((sentence, index) => (
                <span key={index}>{sentence}</span>
            ))}
        </div>
    );
};

export default Message;