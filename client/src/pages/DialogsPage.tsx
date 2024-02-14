import React from 'react';
import Layout from "../components/Layout/Layout.tsx";
import ChatsList from "../components/ChatsList/ChatsList.tsx";
import Chat from "../components/Chat/Chat.tsx";
import styles from '../pagesStyles/DialogsPage.module.css'
const DialogsPage : React.FC = () => {
    return (
        <Layout>
            <div className={styles.dialogsPageContent}>
                <ChatsList/>
                <Chat/>
            </div>
        </Layout>
    );
};

export default DialogsPage;