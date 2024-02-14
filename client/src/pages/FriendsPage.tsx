import React from 'react';
import Layout from '../components/Layout/Layout.tsx';
import styles from '../pagesStyles/ProfilePage.module.css';
import FriendItem from '../components/FriendItem/FriendItem.tsx';

const FriendsPage: React.FC = () => {
  return (
    <Layout>
      <h1 className={styles.pageTitle}>Friends</h1>
      <div>
        <input type='search' name='' id='' placeholder='Search users' />
      </div>
      <div>
        <FriendItem />
        <FriendItem />
        <FriendItem />
        <FriendItem />
        <FriendItem />
      </div>
    </Layout>
  );
};

export default FriendsPage;
