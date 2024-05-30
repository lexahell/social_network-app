import React, {FormEvent, useEffect, useState} from 'react';
import Search from "../UI/Search/Search.tsx";
import styles from './ChatsList.module.css'
import ChatsListItem from "../ChatsListItem/ChatsListItem.tsx";
import {User} from "../../types/User.ts";
import {useAppSelector} from "../../hooks/redux.ts";
import {UserTypingStatus} from "../../types/UserTypingStatus.ts";
import {useDebounce} from "../../hooks/useDebounce.ts";
import {useLazyCheckRelationQuery, useLazySearchUsersByNicknameQuery} from "../../services/socialAppService.ts";
import {CircularProgress} from "@mui/material";
interface ChatsListProps {
    users: User[];
}
const ChatsList : React.FC<ChatsListProps> = ({users}) => {
    const {username} = useAppSelector(state => state.authReducer)
    const [searchValue, setSearchValue] = useState<string>("")
    const [chatListUsers, setChatListUsers] = useState<User[]>(users)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const debouncedSearchValue = useDebounce<string>(searchValue, 500)
    const {userTypingStatusInfo} = useAppSelector(state => state.messagesReducer)
    const [searchUsers] = useLazySearchUsersByNicknameQuery()
    const [checkRelation] = useLazyCheckRelationQuery()

    const getUserRelations = async (username: string): Promise<string> => {
        const relation = await checkRelation({
            username,
            token: localStorage.getItem("token") ?? ""
        }).unwrap()

        return relation.message
    }

    const filterUsers = async (users: User[]) => {
        const usersWithRelations = await Promise.all(users.map(async (user) => {
            const relation = await getUserRelations(user.username);
            return { user, relation };
        }));

        const filteredUsers: User[] = usersWithRelations.filter(({ user, relation }) =>
            user.username !== username && relation === "Friends"
        ).map(({ user }) => user);

        setChatListUsers(filteredUsers)
        setIsLoading(false)
    }

    const fetchUsersByNickname = async (search: string) => {
        const users: User[] = await searchUsers({
            nickname: search,
            token: localStorage.getItem("token") ?? ""
        }).unwrap()
        await filterUsers(users)
    }

    const handleInput = (e: FormEvent<HTMLInputElement>) => {
        setSearchValue(e.currentTarget.value)
    }

    useEffect(() => {
        if (debouncedSearchValue.trim() === "") {
            setChatListUsers(users)
        } else {
            setIsLoading(true)
            fetchUsersByNickname(debouncedSearchValue)
        }
    }, [debouncedSearchValue]);

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
                    isLoading
                        ? <CircularProgress size={30} className={styles.loading} color={"inherit"}/>
                        : chatListUsers.length !== 0
                            ? <>
                                {
                                    chatListUsers.map(user => (
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
                            </> : <span className={styles.emptyChatList}>No users found👻</span>
                }
            </div>
        </div>
    );
};

export default ChatsList;