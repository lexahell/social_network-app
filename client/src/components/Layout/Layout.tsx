import React from 'react';
import styles from './Layout.module.css'
import Header from "../Header/Header.tsx";
import Modal from "../UI/Modal/Modal.tsx";
import {useAppSelector} from "../../hooks/redux.ts";
interface LayoutProps {
    children?: React.ReactNode;
}

const Layout : React.FC<LayoutProps> = ({children}) => {
    const {isVisible, content} = useAppSelector(state => state.modalReducer)
    return (
        <div className={styles.layout}>
            <Modal isVisible={isVisible} children={content}/>
            <Header/>
            <main className={styles.pageContent}>
                {children}
            </main>
        </div>
    );
};

export default Layout;