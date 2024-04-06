import React, {useEffect} from 'react';
import Layout from "../components/Layout/Layout.tsx";
import ChatsList from "../components/ChatsList/ChatsList.tsx";
import Chat from "../components/Chat/Chat.tsx";
import styles from '../pagesStyles/DialogsPage.module.css'
import {useGetAllUsersQuery} from "../services/socialAppService.ts";
import Loader from "../components/UI/Loader/Loader.tsx";
import {User} from "../types/User.ts";
import {useAppDispatch} from "../hooks/redux.ts";
import {setIsAuthNotificationShown} from "../store/slices/authSlice.ts";
const DialogsPage : React.FC = () => {
    const {data, isLoading} = useGetAllUsersQuery(localStorage.getItem("token") ?? "", {
        skip: !localStorage.getItem("token")
    })
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(setIsAuthNotificationShown(true))
    }, []);
    return (
        isLoading
            ? <Loader size={55}/>
            : <Layout>
                <div className={styles.dialogsPageContent}>
                    <ChatsList users={data as User[]}/>
                    <Chat/>
                </div>
            </Layout>
    )
};

export default DialogsPage;