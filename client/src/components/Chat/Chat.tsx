import React from 'react';
import styles from './Chat.module.css'
import {CiChat1} from "react-icons/ci";
import {useAppSelector} from "../../hooks/redux.ts";
import ChatContent from "../ChatContent/ChatContent.tsx";
const Chat : React.FC = () => {
    const {isChatSelected} = useAppSelector(state => state.chatReducer)
    return (
        <div className={`${styles.chat} ${!isChatSelected && styles.nonSelected}`}>
            {
                !isChatSelected
                    ?
                    <>
                        <CiChat1 color={'#757476'} size={30}/>
                        <p className={styles.nonSelectedChat}>
                            Pick a person from left menu,
                            <br/> and start your conversation.
                        </p>
                    </>
                    : <ChatContent/>
            }
        </div>
    );
};

export default Chat;