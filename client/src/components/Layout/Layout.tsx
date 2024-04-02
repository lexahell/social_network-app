import React, {useEffect} from 'react';
import styles from './Layout.module.css'
import Header from "../Header/Header.tsx";
import {useLocation} from "react-router-dom";
import {toast, Toaster} from "sonner";
import {useAppDispatch, useAppSelector} from "../../hooks/redux.ts";
import {AuthType} from "../../types/AuthType.ts";
import {setIsAuthNotificationShown} from "../../store/slices/authSlice.ts";

interface LayoutProps {
    children?: React.ReactNode;
}

const Layout : React.FC<LayoutProps> = ({children}) => {
    const location = useLocation()
    const {authType, isAuthNotificationShown} = useAppSelector(state => state.authReducer)
    const dispatch = useAppDispatch()
    useEffect(() => {
        if (authType !== AuthType.NOT_AUTHED && !isAuthNotificationShown) {
            toast.success(
                authType === AuthType.LOGIN
                    ? 'You have successfully logged in'
                    : 'You have successfully registered'
            );
            dispatch(setIsAuthNotificationShown(true))
        }
    }, [authType, isAuthNotificationShown]);
    useEffect(() => {
        localStorage.setItem("lastVisitedPage", location.pathname)
    }, []);
    return (
        <div className={styles.layout}>
            <Header/>
            <Toaster position="bottom-right" richColors/>
            <main className={styles.pageContent}>
                {children}
            </main>
        </div>
    );
};

export default Layout;