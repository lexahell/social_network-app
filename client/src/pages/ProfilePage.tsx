import React, {useEffect, useState} from 'react';
import Layout from '../components/Layout/Layout.tsx';
import ProfileHeader from '../components/ProfileHeader/ProfileHeader.tsx';
import NewPost from '../components/NewPost/NewPost.tsx';
import styles from '../pagesStyles/ProfilePage.module.css';
import pageCover from '../assets/1644978359_9-www-funnyart-club-p-temno-sinii-fon-anime-krasivo-9.jpg';
import {useAppDispatch, useAppSelector} from "../hooks/redux.ts";
import {useLocation} from "react-router-dom";
import {
    setIsOtherUserProfile,
    setProfileNickname,
    setProfileUsername,
    setUserStatus
} from "../store/slices/profileSlice.ts";
import {setIsAuthNotificationShown} from "../store/slices/authSlice.ts";
import {
    useCreatePostMutation, useLazyCheckRelationQuery,
    useLazyGetUserInfoByUsernameQuery,
    useLazyGetUserPostsQuery
} from "../services/socialAppService.ts";
import {Post} from "../types/Post.ts";
import Loader from "../components/UI/Loader/Loader.tsx";
import Posts from "../components/Posts/Posts.tsx";
import dayjs from "dayjs";
import {User} from "../types/User.ts";

const ProfilePage: React.FC = () => {
    const location = useLocation()
    const dispatch = useAppDispatch()
    const [getUserInfo, {data: user}] = useLazyGetUserInfoByUsernameQuery()
    const {nickname, username} = useAppSelector(state => state.authReducer)
    const {profileNickname, isOtherUserProfile, isThisUserFriend, userStatus, isSubscribed, profileUsername} = useAppSelector(state => state.profileReducer)
    const [posts, setPosts] = useState<Post[]>([])
    const [relation, setRelation] = useState<string>("")
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [createPost] = useCreatePostMutation()
    const [getPosts, {data: userPosts}] = useLazyGetUserPostsQuery()
    const [checkRelation] = useLazyCheckRelationQuery()

    const fetchUser = (username: string) => {
        getUserInfo({
            username,
            token: localStorage.getItem("token") ?? ""
        })
    }

    const getRelations = async (username: string)=> {
        const relation = await checkRelation({
            username,
            token: localStorage.getItem("token") ?? ""
        }).unwrap()

        setRelation(relation.message)
        setIsLoading(false)
    }

    const setProfileInfo = async (user: User) => {
        dispatch(setProfileUsername(user.username))
        dispatch(setProfileNickname(user.nickname))
        dispatch(setUserStatus(user.status))
    }


    const setLastVisitedPage = (path: string) => {
        localStorage.setItem("lastVisitedPage", path)
    }

    const writePost = (post: Post) => {
        createPost({
            ...post,
            token: localStorage.getItem("token") ?? ""
        })
        const newPosts = [...posts, post].map((post) => ({
            ...post,
            author: profileNickname
        }))
        setPosts(newPosts.sort((a, b) => dayjs(b.timestamp).unix() - dayjs(a.timestamp).unix()))
    }

    useEffect(() => {
        if (location.pathname.split("/")[2] === username) {
            dispatch(setProfileUsername(username))
            dispatch(setProfileNickname(nickname))
            setIsLoading(false)
        } else {
            dispatch(setIsOtherUserProfile(true))
            getRelations(decodeURIComponent(location.pathname.split("/")[2]))
            fetchUser(decodeURIComponent(location.pathname.split("/")[2]))
        }
        setLastVisitedPage(location.pathname)
        getPosts({
            username: location.pathname.split("/")[2],
            token: localStorage.getItem("token") ?? ""
        })
    }, [location]);

    useEffect(() => {
        dispatch(setIsAuthNotificationShown(true))
    }, []);

    useEffect(() => {
        if (user) {
            setProfileInfo(user)
        }
    }, [user])

    useEffect(() => {
        if (userPosts) {
            const updatedPosts = userPosts.map(post => ({
                ...post,
                author: profileNickname
            }));

            const sortedPosts = updatedPosts.sort((a, b) => dayjs(b.timestamp).unix() - dayjs(a.timestamp).unix());
            setPosts(sortedPosts);
        }
    }, [userPosts]);


  return (
      isLoading
        ? <Loader size={55}/>
          : <Layout>
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
                      isThisUserFriend={isThisUserFriend || relation === "Friends"}
                      isSubscribed={isSubscribed || relation === "Subscribed" || relation === "Friends"}
                  />
                  {
                      !isOtherUserProfile && <div className={styles.posts}>
                          <NewPost
                              nickname={nickname}
                              avatar={'/broken-image.jpg'}
                              writePost={writePost}
                          />
                          {
                              posts.length !== 0 && <>
                                  <h2>My posts</h2>
                                  <Posts
                                      posts={posts}
                                      isOtherUserPosts={false}
                                  />
                              </>
                          }
                      </div>
                  }
              </div>
          </Layout>
  );
};

export default ProfilePage;
