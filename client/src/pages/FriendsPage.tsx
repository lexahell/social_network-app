import React from 'react';
import Layout from '../components/Layout/Layout.tsx';
import styles from '../pagesStyles/FriendsPage.module.css';
import FriendItem from '../components/FriendItem/FriendItem.tsx';
import Friends from '../components/Friends/Friends.tsx';
import Search from '../components/Search/Search.tsx';

const FriendsPage: React.FC = () => {
  return (
    <Layout>
      <h1 className={styles.pageTitle}>Friends</h1>
      <div className={styles.searchContainer}>
        <Search placeholder={'Search users'} />
      </div>
      <Friends>
        <FriendItem />
        <FriendItem />
        <FriendItem />
        <FriendItem />
        <FriendItem />
        <FriendItem />
        <FriendItem />
        <FriendItem />
      </Friends>
      {/* <h2 className={styles.}>All search</h2> */}
    </Layout>
  );
};

export default FriendsPage;
