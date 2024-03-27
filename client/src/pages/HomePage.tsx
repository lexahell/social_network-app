import React, {useEffect} from 'react';
import Layout from '../components/Layout/Layout.tsx';
import Posts from '../components/Posts/Posts.tsx';
import PostsItem from '../components/PostItem/PostsItem.tsx';
import styles from '../pagesStyles/HomePage.module.css';
import {useAppDispatch, useAppSelector} from "../hooks/redux.ts";
import {AuthType} from "../types/AuthType.ts";
import {toast, Toaster} from "sonner";
import {setIsAuthNotificationShown} from "../store/slices/authSlice.ts";
const HomePage: React.FC = () => {
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
  return (
    <Layout>
      <h1 className={styles.pageTitle}>Posts</h1>
      <Posts>
        <PostsItem
          img={
            'https://masterpiecer-images.s3.yandex.net/633ff90a78fd11ee90cb1e5d9776cfa6:upscaled'
          }
          authorName={'Travis Scot'}
          postBody={
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga iure\n' +
            '              autem dolorum doloremque, distinctio repellat esse error expedita!\n' +
            '              Dolore, cum?'
          }
        />
        <PostsItem
          img={
            'https://masterpiecer-images.s3.yandex.net/633ff90a78fd11ee90cb1e5d9776cfa6:upscaled'
          }
          authorName={'Travis Scot'}
          postBody={
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia\n' +
            '              esse molestiae corrupti consequuntur quis commodi a, maxime error\n' +
            '              eos quae, perspiciatis et adipisci sunt voluptatem vero? Alias\n' +
            '              perferendis aliquid dolor! Quibusdam ipsum quae quam unde error\n' +
            '              praesentium voluptas placeat, atque, rerum culpa iste asperiores\n' +
            '              ea, dignissimos sequi earum dolore architecto nesciunt sunt hic\n' +
            '              reiciendis nisi. Facere nobis nam ut voluptas. Modi, accusamus!\n' +
            '              Natus doloribus consequuntur voluptates laborum quae cupiditate\n' +
            '              distinctio laboriosam unde, quisquam quaerat libero iure error\n' +
            '              architecto nostrum assumenda adipisci perspiciatis, nemo\n' +
            '              voluptatum consectetur omnis. Quibusdam, quos nemo voluptatibus\n' +
            '              necessitatibus, beatae eos fugit incidunt voluptatum voluptas\n' +
            '              animi earum hic.'
          }
        />
        <PostsItem
          img={
            'https://masterpiecer-images.s3.yandex.net/633ff90a78fd11ee90cb1e5d9776cfa6:upscaled'
          }
          authorName={'Travis Scot'}
          postBody={
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga iure\n' +
            '              autem dolorum doloremque, distinctio repellat esse error expedita!\n' +
            '              Dolore, cum?'
          }
        />
        <PostsItem
          img={
            'https://masterpiecer-images.s3.yandex.net/633ff90a78fd11ee90cb1e5d9776cfa6:upscaled'
          }
          authorName={'Travis Scot'}
          postBody={
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga iure\n' +
            '              autem dolorum doloremque, distinctio repellat esse error expedita!\n' +
            '              Dolore, cum?'
          }
        />
        <PostsItem
          img={
            'https://masterpiecer-images.s3.yandex.net/633ff90a78fd11ee90cb1e5d9776cfa6:upscaled'
          }
          authorName={'Travis Scot'}
          postBody={
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga iure\n' +
            '              autem dolorum doloremque, distinctio repellat esse error expedita!\n' +
            '              Dolore, cum?'
          }
        />
      </Posts>
        <Toaster position="bottom-right" richColors/>
    </Layout>
  );
};

export default HomePage;
