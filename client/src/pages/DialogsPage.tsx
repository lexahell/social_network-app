import React, {useEffect} from 'react';
import Layout from "../components/Layout/Layout.tsx";
import ChatsList from "../components/ChatsList/ChatsList.tsx";
import Chat from "../components/Chat/Chat.tsx";
import styles from '../pagesStyles/DialogsPage.module.css'
import {useGetFriendsQuery} from "../services/socialAppService.ts";
import Loader from "../components/UI/Loader/Loader.tsx";
import {User} from "../types/User.ts";
import {useAppDispatch, useAppSelector} from "../hooks/redux.ts";
import {setIsAuthNotificationShown} from "../store/slices/authSlice.ts";
import dayjs from "dayjs";
import {setIsChatSelected} from "../store/slices/chatSlice.ts";
const DialogsPage : React.FC = () => {
    const {username} = useAppSelector(state => state.authReducer)
    const {data: friends, isLoading} = useGetFriendsQuery({
        username,
        date: dayjs().unix(),
        token: localStorage.getItem("token") ?? ""
    }, {
        skip: !localStorage.getItem("token")
    })
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(setIsAuthNotificationShown(true))
        dispatch(setIsChatSelected(false))
    }, []);
    return (
        isLoading
            ? <Loader size={55}/>
            : <Layout>
                <div className={styles.dialogsPageContent}>
                    <ChatsList users={friends as User[]}/>
                    <Chat/>
                </div>
            </Layout>
    )
};

export default DialogsPage;