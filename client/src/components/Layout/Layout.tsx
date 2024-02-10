import React from 'react';
import styles from './Layout.module.css'
import Header from "../Header/Header.tsx";
interface LayoutProps {
    children?: React.ReactNode;
}

const Layout : React.FC<LayoutProps> = ({children}) => {
    return (
        <div className={styles.layout}>
            <Header/>
            <main className={styles.pageContent}>
                {children}
            </main>
        </div>
    );
};

export default Layout;