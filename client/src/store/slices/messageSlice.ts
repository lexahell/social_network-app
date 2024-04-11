import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Message} from "../../types/Message.ts";
import {UserTypingStatusInfo} from "../../types/UserTypingStatusInfo.ts";
interface MessagesState {
    messages: Message[];
    lastReceivedMessage: Message;
    userTypingStatusInfo: UserTypingStatusInfo
}
const initialState: MessagesState = {
    messages: [],
    lastReceivedMessage: {} as Message,
    userTypingStatusInfo: {} as UserTypingStatusInfo
}
const messagesSlice = createSlice({
    name: "messages",
    initialState,
    reducers: {
        addMessage: (state, action: PayloadAction<Message>) => {
            state.messages.push(action.payload)
        },
        setHistoryOfChat: (state, action: PayloadAction<Message[]>) => {
            state.messages = action.payload
        },
        setLastReceivedMessage: (state, action: PayloadAction<Message>) => {
            state.lastReceivedMessage = action.payload
        },
        setUserTypingStatusInfo: (state, action: PayloadAction<UserTypingStatusInfo>) => {
            state.userTypingStatusInfo = action.payload
        }
    }
})
export const {
    addMessage,
    setHistoryOfChat,
    setLastReceivedMessage,
    setUserTypingStatusInfo
} = messagesSlice.actions
export default messagesSlice.reducer