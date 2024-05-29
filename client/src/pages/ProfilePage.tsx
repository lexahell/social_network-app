import React, {useEffect} from 'react';
import Layout from '../components/Layout/Layout.tsx';
import ProfileHeader from '../components/ProfileHeader/ProfileHeader.tsx';
import NewPost from '../components/NewPost/NewPost.tsx';
import styles from '../pagesStyles/ProfilePage.module.css';
import pageCover from '../assets/1644978359_9-www-funnyart-club-p-temno-sinii-fon-anime-krasivo-9.jpg';
import {useAppDispatch, useAppSelector} from "../hooks/redux.ts";
import {useLocation} from "react-router-dom";
import {setProfileNickname, setProfileUsername} from "../store/slices/profileSlice.ts";
import {setIsAuthNotificationShown} from "../store/slices/authSlice.ts";

const ProfilePage: React.FC = () => {
    const location = useLocation()
    const dispatch = useAppDispatch()
    const {nickname, username} = useAppSelector(state => state.authReducer)
    const {profileNickname, isOtherUserProfile, isThisUserSubscriber, isThisUserFriend, userStatus, isSubscribed, profileUsername} = useAppSelector(state => state.profileReducer)
    useEffect(() => {
        if (location.pathname.split("/")[2] === username) {
            dispatch(setProfileUsername(username))
            dispatch(setProfileNickname(nickname))
        }
    }, [location ]);
    useEffect(() => {
        dispatch(setIsAuthNotificationShown(true))
    }, []);
  return (
    <Layout>
      <div className={styles.ProfilePageContent}>
        <ProfileHeader
          avatar={
            '/broken-image.jpg'
          }
          nickname={profileNickname}
          username={profileUsername}
          status={userStatus}
          pageCover={pageCover}
          isOtherUserProfile={isOtherUserProfile}
          isThisUserFriend={isThisUserFriend}
          isThisUserSubscriber={isThisUserSubscriber}
          isSubscribed={isSubscribed}
        />
          {
              !isOtherUserProfile && <NewPost
                  nickname={nickname}
                  avatar={'/broken-image.jpg'}
              />
          }
      </div>
    </Layout>
  );
};

export default ProfilePage;
