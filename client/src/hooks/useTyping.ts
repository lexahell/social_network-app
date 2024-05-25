import {useEffect, useState} from "react";
import {WebSocketService} from "../services/WebSocketService.ts";
import {UserTypingStatus} from "../types/UserTypingStatus.ts";

export const useTyping = (value: string, recipientUsername: string, senderUsername: string): void => {
    const [isUserTyping, setIsUserTyping] = useState<boolean>(false)

    useEffect(() => {
        let timer: NodeJS.Timeout
        if (value.trim() === "") {
            setIsUserTyping(false)
        } else {
            timer = setTimeout(() => {
                setIsUserTyping(false)
            }, 8000)
            setIsUserTyping(true)
        }
        return () => {
            clearTimeout(timer)
        }
    }, [value])

    useEffect(() => {
        if (isUserTyping) {
            WebSocketService.sendTypingStatus(recipientUsername, senderUsername, UserTypingStatus.TYPING)
        } else {
            WebSocketService.sendTypingStatus(recipientUsername, senderUsername, UserTypingStatus.NOT_TYPING)
        }
    }, [isUserTyping])
}