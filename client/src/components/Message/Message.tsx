import React from 'react';
import styles from './Message.module.css'
interface MessageProps {
    messageContent: string
}
const Message : React.FC<MessageProps> = ({messageContent}) => {
    return (
        <div className={styles.message}>
            {messageContent.split('\n').map(sentence => (
                <span>{sentence}</span>
            ))}
        </div>
    );
};

export default Message;