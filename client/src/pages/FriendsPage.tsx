import React, {FormEvent, useCallback, useEffect, useState} from 'react';
import Layout from '../components/Layout/Layout.tsx';
import styles from '../pagesStyles/FriendsPage.module.css';
import Friends from '../components/Friends/Friends.tsx';
import Search from '../components/UI/Search/Search.tsx';
import {
    useGetAllUsersQuery,
    useGetFriendsQuery,
    useGetSubscribersQuery,
    useGetSubscriptionsQuery, useLazySearchUsersByNicknameQuery
} from "../services/socialAppService.ts";
import {useAppDispatch, useAppSelector} from "../hooks/redux.ts";
import Loader from "../components/UI/Loader/Loader.tsx";
import {setIsAuthNotificationShown} from "../store/slices/authSlice.ts";
import Subscriptions from "../components/Subscriptions/Subscriptions.tsx";
import {useDebounce} from "../hooks/useDebounce.ts";
import {User} from "../types/User.ts";
import FoundUsers from "../components/FoundUsers/FoundUsers.tsx";
import Subscribers from "../components/Subscribers/Subscribers.tsx";

const FriendsPage: React.FC = () => {
    const dispatch = useAppDispatch()
    const {username} = useAppSelector(state => state.authReducer)
    const {execTime} = useAppSelector(state => state.friendsReducer)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [isFriendsListEmpty, setIsFriendsLisEmpty] = useState<boolean>(false)
    const [searchValue, setSearchValue] = useState<string>("")
    const [foundUsers, setFoundUsers] = useState<User[]>([])
    const debouncedSearchValue = useDebounce<string>(searchValue, 500)
    const {data: friends, isFetching: isFriendsLoading} = useGetFriendsQuery({
        username,
        date: execTime,
        token: localStorage.getItem("token") ?? ""
    }, {
        skip: !localStorage.getItem("token")
    })

    const {data: subscriptions, isFetching: isSubscriptionsLoading} = useGetSubscriptionsQuery({
        username,
        date: execTime,
        token: localStorage.getItem("token") ?? ""
    }, {
        skip: !localStorage.getItem("token")
    })

    const {data: subscribers, isFetching: isSubscribersLoading} = useGetSubscribersQuery({
        username,
        date: execTime,
        token: localStorage.getItem("token") ?? ""
    }, {
        skip: !localStorage.getItem("token")
    })

    const [searchUsers, {data: searchedUsers}] = useLazySearchUsersByNicknameQuery()

    const {data: allUsers, isFetching: isAllUsersLoading} = useGetAllUsersQuery(localStorage.getItem("token") ?? "", {
        skip: !localStorage.getItem("token")
    })

    const filterAllUsers = (searchValue: string): User[] => {
        return (allUsers as User[]).filter((user) => user.nickname.startsWith(searchValue) && user.username !== username)
    }

    const handleInput = (e: FormEvent<HTMLInputElement>) => {
        setSearchValue(e.currentTarget.value)
    }

    const isFriend = useCallback((user: User): boolean => {
        return (friends as User[]).find((friend) => friend.username === user.username) !== undefined
    }, [friends])

    const isSubscriber = useCallback((user: User): boolean => {
        return (subscribers as User[]).find((subscriber) => subscriber.username === user.username) !== undefined
    }, [subscribers])

    const isSubscribed = useCallback((username: string): boolean => {
        return (subscriptions as User[]).find((subscription) => subscription.username === username) !== undefined
    }, [subscriptions])


    const fetchUsersByNickname = (search: string) => {
        searchUsers({
            nickname: search,
            token: localStorage.getItem("token") ?? ""
        })
    }

    useEffect(() => {
        dispatch(setIsAuthNotificationShown(true))
    }, []);


    useEffect(() => {
        if (!isFriendsLoading && !isSubscriptionsLoading && !isSubscribersLoading) {
            setIsLoading(false)
        }
    }, [isFriendsLoading, isSubscribersLoading, isSubscriptionsLoading]);

    useEffect(() => {
        if (friends === undefined && subscribers === undefined && subscriptions === undefined && foundUsers.length === 0) {
            setIsFriendsLisEmpty(true)
        } else if (friends !== undefined && friends.length === 0 && subscribers !== undefined && subscribers.length === 0 && subscriptions !== undefined && subscriptions.length === 0 && foundUsers.length === 0) {
            setIsFriendsLisEmpty(true)
        } else {
            setIsFriendsLisEmpty(false)
        }
    }, [friends, subscribers, subscriptions, foundUsers])

    useEffect(() => {
        if (debouncedSearchValue.trim() === "") {
            setFoundUsers([])
        } else {
            setFoundUsers(filterAllUsers(debouncedSearchValue))
        }
    }, [debouncedSearchValue]);




  return (
        isLoading
        ? <Loader size={55}/>
          : <Layout>
              <div className={styles.searchContainer}>
                  <Search
                      searchValue={searchValue}
                      updateSearchValue={handleInput}
                      placeholder={'Search users'}
                  />
              </div>
                {
                    isFriendsListEmpty && <span className={styles.emptyList}>You have no friends yet 🤪</span>
                }
                {
                    foundUsers.length !== 0
                        ? <FoundUsers
                            foundUsers={foundUsers}
                            isFriend={isFriend}
                            isSubscriber={isSubscriber}
                            isSubscribed={isSubscribed}
                        />
                        : <div className={styles.userTypes}>
                            <Friends
                                friends={friends}
                                isFriend={isFriend}
                                isSubscriber={isSubscriber}
                                isSubscribed={isSubscribed}
                            />
                            <Subscriptions
                                subscriptions={subscriptions}
                                isFriend={isFriend}
                                isSubscriber={isSubscriber}
                                isSubscribed={isSubscribed}
                            />
                            <Subscribers
                                subscribers={subscribers}
                                isFriend={isFriend}
                                isSubscriber={isSubscriber}
                                isSubscribed={isSubscribed}
                            />
                        </div>
                }
          </Layout>
  );
};

export default FriendsPage;
