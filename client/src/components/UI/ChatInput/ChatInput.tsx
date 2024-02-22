import React, {useEffect, useRef, useState} from 'react';
import styles from './ChatInput.module.css'
import {FiSend} from "react-icons/fi";
import {MdOutlineEmojiEmotions} from "react-icons/md";
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import EmojiPicker from "../../EmojiPicker/EmojiPicker.tsx";
const ChatInput : React.FC = () => {
    const [message, setMessage] = useState<string>("")
    const [isShownEmojiPicker, setIsShownEmojiPicker] = useState<boolean>(false)
    const toggleEmojiPicker = () => {
        setIsShownEmojiPicker(!isShownEmojiPicker)
    }
    const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
        setMessage(e.currentTarget.value)
    }
    const handleEmojiClick = (emoji: string) => {
        setMessage(message + emoji)
    }
    return (
        <div className={styles.chatInput}>
            <form className={styles.chatInputForm}>
                <div className={styles.inputGroup}>
                    <div className={styles.inputTextArea}>
                        <TextareaAutosize placeholder={'Type your message'} minRows={1} maxRows={7} onChange={handleInput} value={message}/>
                        <div className={styles.emojiPickerImg} onClick={toggleEmojiPicker}>
                            <MdOutlineEmojiEmotions color={'hsla(0,0%,100%,.9)'} size={20}/>
                        </div>
                    </div>
                    <button type={'button'}>
                        <FiSend color={'hsla(0,0%,100%,.9)'} size={16}/>
                    </button>
                </div>
            </form>
            {isShownEmojiPicker && <EmojiPicker handleEmojiClick={handleEmojiClick}/>}
        </div>
    );
};

export default ChatInput;