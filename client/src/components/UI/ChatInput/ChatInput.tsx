import React, {ChangeEvent, KeyboardEventHandler, MouseEventHandler, useEffect, useRef, useState} from 'react';
import styles from './ChatInput.module.css'
import {FiSend} from "react-icons/fi";
import {MdOutlineEmojiEmotions} from "react-icons/md";
import {TextareaAutosize} from '@mui/base/TextareaAutosize';
import EmojiPicker from "../../EmojiPicker/EmojiPicker.tsx";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux.ts";
import {addMessage} from "../../../store/slices/messageSlice.ts";
import {WebSocketService} from "../../../services/WebSocketService.ts";

const ChatInput: React.FC = () => {
    const [message, setMessage] = useState<string>("")
    const [isShownEmojiPicker, setIsShownEmojiPicker] = useState<boolean>(false)
    const emojiPickerRef = useRef<HTMLDivElement>(null)
    const emojiPickerSwitcher = useRef<HTMLDivElement>(null)
    const dispatch = useAppDispatch()
    const {username} = useAppSelector(state => state.authReducer)
    const {recipientUsername} = useAppSelector(state => state.chatReducer)
    const registerWindowClick = (e: MouseEvent) => {
        if (emojiPickerRef.current) {
            if (e.clientX < emojiPickerRef.current.getBoundingClientRect().left
            || e.clientX > emojiPickerRef.current.getBoundingClientRect().right
            || e.clientY < emojiPickerRef.current.getBoundingClientRect().top
            || e.clientY > emojiPickerRef.current.getBoundingClientRect().bottom) {
                setIsShownEmojiPicker(false)
            }
        }
    }
    const toggleEmojiPicker: MouseEventHandler<HTMLDivElement> = (e) => {
        e.stopPropagation()
        setIsShownEmojiPicker(!isShownEmojiPicker)
    }
    const handleInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(e.currentTarget.value)
    }
    const handleEmojiClick = (emoji: string) => {
        setMessage(message + emoji)
    }
    const sendMessage = () => {
        const chatMessage = {
            content: message.trim(),
            senderUsername: username,
            recipientUsername,
            timestamp: new Date()
        }
        WebSocketService.sendMessage(chatMessage)
        dispatch(addMessage(chatMessage))
        setMessage("")
    }
    const handleKeyDownClick: KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
        if (e.shiftKey && e.key === "Enter") {
            e.preventDefault()
            setMessage(message + '\n')
        } else if (e.key === "Enter") {
            e.preventDefault()
            if (message.trim() !== "") {
                sendMessage()
            }
        }

    }
    useEffect(() => {
        if (isShownEmojiPicker) {
            window.addEventListener("click", registerWindowClick)
        }
        return () => window.removeEventListener("click", registerWindowClick)
    }, [isShownEmojiPicker])
    return (
        <div className={styles.chatInput}>
            <form className={styles.chatInputForm}>
                <div className={styles.inputGroup}>
                    <div className={styles.inputTextArea}>
                        <TextareaAutosize placeholder={'Type your message'} minRows={1} maxRows={7}
                                          onChange={handleInput} value={message} onKeyDown={handleKeyDownClick}/>
                        <div className={styles.emojiPickerImg} onClick={toggleEmojiPicker} ref={emojiPickerSwitcher}>
                            <MdOutlineEmojiEmotions color={'hsla(0,0%,100%,.9)'} size={22}/>
                        </div>
                    </div>
                    <button type={'button'} disabled={message.trim() === ""} onClick={sendMessage}>
                        <FiSend color={'hsla(0,0%,100%,.9)'} size={20}/>
                    </button>
                </div>
            </form>
            {isShownEmojiPicker && <EmojiPicker handleEmojiClick={handleEmojiClick} ref={emojiPickerRef}/>}
        </div>
    );
};

export default ChatInput;