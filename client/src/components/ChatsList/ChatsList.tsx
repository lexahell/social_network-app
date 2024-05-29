import React, {FormEvent, useState} from 'react';
import Search from "../UI/Search/Search.tsx";
import styles from './ChatsList.module.css'
import ChatsListItem from "../ChatsListItem/ChatsListItem.tsx";
import {User} from "../../types/User.ts";
import {useAppSelector} from "../../hooks/redux.ts";
import {UserTypingStatus} from "../../types/UserTypingStatus.ts";
import {useDebounce} from "../../hooks/useDebounce.ts";
interface ChatsListProps {
    users: User[];
}
const ChatsList : React.FC<ChatsListProps> = ({users}) => {
    const {username} = useAppSelector(state => state.authReducer)
    const [searchValue, setSearchValue] = useState<string>("")
    const debouncedSearchValue = useDebounce<string>(searchValue, 500)
    const {userTypingStatusInfo} = useAppSelector(state => state.messagesReducer)

    const filterFetchedUsers = (users: User[]) => {
        return users.filter(user => user.username !== username)
    }
    const handleInput = (e: FormEvent<HTMLInputElement>) => {
        setSearchValue(e.currentTarget.value)
    }

    return (
        <div className={styles.chatsList}>
            <h1>Chats</h1>
            <Search
                placeholder={'Search users'}
                searchValue={searchValue}
                updateSearchValue={handleInput}
            />
            <div className={styles.usersCards}>
                {
                    users.map(user => (
                        <ChatsListItem
                            avatar={'/broken-image.jpg'}
                            nickname={user.nickname}
                            username={user.username}
                            status={user.status}
                            key={user.username}
                            isUserTyping={userTypingStatusInfo.senderUsername === user.username
                                && userTypingStatusInfo.userTypingStatus === UserTypingStatus.TYPING}
                        />
                    ))
                }
            </div>
        </div>
    );
};

export default ChatsList;