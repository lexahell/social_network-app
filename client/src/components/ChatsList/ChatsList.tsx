import React from 'react';
import Search from "../UI/Search/Search.tsx";
import styles from './ChatsList.module.css'
import ChatsListItem from "../ChatsListItem/ChatsListItem.tsx";
import {UserStatus} from "../../store/slices/chatSlice.ts";
const ChatsList : React.FC = () => {
    return (
        <div className={styles.chatsList}>
            <h1>Chats</h1>
            <Search placeholder={'Search users'}/>
            <div className={styles.usersCards}>
                <ChatsListItem
                    avatar={'https://masterpiecer-images.s3.yandex.net/633ff90a78fd11ee90cb1e5d9776cfa6:upscaled'}
                    userName={'Travis Scott'}
                    status={UserStatus.OFFLINE}
                />
                <ChatsListItem
                    avatar={'https://masterpiecer-images.s3.yandex.net/633ff90a78fd11ee90cb1e5d9776cfa6:upscaled'}
                    userName={'Travis Scott'}
                    status={UserStatus.OFFLINE}
                />
                <ChatsListItem
                    avatar={'https://masterpiecer-images.s3.yandex.net/633ff90a78fd11ee90cb1e5d9776cfa6:upscaled'}
                    userName={'Travis Scott'}
                    status={UserStatus.OFFLINE}
                />
                <ChatsListItem
                    avatar={'https://masterpiecer-images.s3.yandex.net/633ff90a78fd11ee90cb1e5d9776cfa6:upscaled'}
                    userName={'Travis Scott'}
                    status={UserStatus.OFFLINE}
                />
                <ChatsListItem
                    avatar={'https://masterpiecer-images.s3.yandex.net/633ff90a78fd11ee90cb1e5d9776cfa6:upscaled'}
                    userName={'Travis Scott'}
                    status={UserStatus.OFFLINE}
                />
                <ChatsListItem
                    avatar={'https://masterpiecer-images.s3.yandex.net/633ff90a78fd11ee90cb1e5d9776cfa6:upscaled'}
                    userName={'Travis Scott'}
                    status={UserStatus.OFFLINE}
                />
                <ChatsListItem
                    avatar={'https://masterpiecer-images.s3.yandex.net/633ff90a78fd11ee90cb1e5d9776cfa6:upscaled'}
                    userName={'Travis Scott'}
                    status={UserStatus.OFFLINE}
                />
                <ChatsListItem
                    avatar={'https://masterpiecer-images.s3.yandex.net/633ff90a78fd11ee90cb1e5d9776cfa6:upscaled'}
                    userName={'Travis Scott'}
                    status={UserStatus.OFFLINE}
                />
                <ChatsListItem
                    avatar={'https://masterpiecer-images.s3.yandex.net/633ff90a78fd11ee90cb1e5d9776cfa6:upscaled'}
                    userName={'Travis Scott'}
                    status={UserStatus.OFFLINE}
                />
                <ChatsListItem
                    avatar={'https://masterpiecer-images.s3.yandex.net/633ff90a78fd11ee90cb1e5d9776cfa6:upscaled'}
                    userName={'Travis Scott'}
                    status={UserStatus.OFFLINE}
                />
                <ChatsListItem
                    avatar={'https://masterpiecer-images.s3.yandex.net/633ff90a78fd11ee90cb1e5d9776cfa6:upscaled'}
                    userName={'Travis Scott'}
                    status={UserStatus.OFFLINE}
                />
                <ChatsListItem
                    avatar={'https://masterpiecer-images.s3.yandex.net/633ff90a78fd11ee90cb1e5d9776cfa6:upscaled'}
                    userName={'Travis Scott'}
                    status={UserStatus.OFFLINE}
                />
            </div>
        </div>
    );
};

export default ChatsList;