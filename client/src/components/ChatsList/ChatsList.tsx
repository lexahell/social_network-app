import React from 'react';
import Search from "../Search/Search.tsx";
import styles from './ChatsList.module.css'
import ChatsListItem from "../ChatsListItem/ChatsListItem.tsx";
const ChatsList : React.FC = () => {
    return (
        <div className={styles.chatsList}>
            <h1>Chats</h1>
            <Search placeholder={'Search users'}/>
            <div className={styles.usersCards}>
                <ChatsListItem/>
                <ChatsListItem/>
                <ChatsListItem/>
                <ChatsListItem/>
                <ChatsListItem/>
            </div>
        </div>
    );
};

export default ChatsList;