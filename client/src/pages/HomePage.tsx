import React, {useEffect, useState} from 'react';
import Layout from '../components/Layout/Layout.tsx';
import styles from '../pagesStyles/HomePage.module.css';
import {setIsAuthNotificationShown} from "../store/slices/authSlice.ts";
import {useAppDispatch, useAppSelector} from "../hooks/redux.ts";
import {
    useGetFriendsQuery,
    useGetSubscriptionsQuery,
    useLazyGetUserInfoByUsernameQuery, useLazyGetUserPostsQuery
} from "../services/socialAppService.ts";
import Loader from "../components/UI/Loader/Loader.tsx";
import {Post} from "../types/Post.ts";
import {User} from "../types/User.ts";
import dayjs from "dayjs";
import Posts from "../components/Posts/Posts.tsx";
const HomePage: React.FC = () => {
    const dispatch = useAppDispatch()
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [posts, setPosts] = useState<Post[]>([])
    const {username} = useAppSelector(state => state.authReducer)
    const {data: friends} = useGetFriendsQuery({
        username,
        token: localStorage.getItem("token") ?? ""
    }, {
        skip: !localStorage.getItem("token")
    })

    const {data: subscriptions} = useGetSubscriptionsQuery({
        username,
        token: localStorage.getItem("token") ?? ""
    }, {
        skip: !localStorage.getItem("token")
    })

    const [getUserPosts] = useLazyGetUserPostsQuery()


    const getAllFriendsAndSubscriptionsPosts = async (friends: User[], subscriptions: User[]) => {
        const allPosts: Post[] = []
        for (let i = 0; i < friends.length; i++) {
            const userPosts = (await getUserPosts({
                username: friends[i].username,
                token: localStorage.getItem("token") ?? ""
            }).unwrap()).map(post => ({
                ...post,
                author: friends[i].username
            }));

            allPosts.push(...userPosts)
        }

        for (let i = 0; i < subscriptions.length; i++) {
            const userPosts = (await getUserPosts({
                username: subscriptions[i].username,
                token: localStorage.getItem("token") ?? ""
            }).unwrap()).map(post => ({
                ...post,
                author: subscriptions[i].username
            }));

            allPosts.push(...userPosts)
        }

        allPosts.sort((a, b) => dayjs(b.timestamp).unix() - dayjs(a.timestamp).unix())
        setPosts(allPosts)
        setIsLoading(false)
    }

    useEffect(() => {
        dispatch(setIsAuthNotificationShown(true))
    }, []);

    useEffect(() => {
        if (friends && subscriptions) {
            getAllFriendsAndSubscriptionsPosts(friends, subscriptions)
        }
    }, [friends, subscriptions]);

  return (
      isLoading
        ? <Loader size={55}/>
          : <Layout>
              <h1 className={styles.pageTitle}>Posts</h1>
              {
                  posts.length === 0
                      ? <span className={styles.emptyPostsList}>It looks empty here... Follow someone to see their posts here!</span>
                      : <Posts isOtherUserPosts={true} posts={posts}/>
              }
          </Layout>
  );
};

export default HomePage;
