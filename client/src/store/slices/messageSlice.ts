import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Message} from "../../types/Message.ts";
interface MessagesState {
    messages: Message[];
    lastReceivedMessage: Message;
}
const initialState: MessagesState = {
    messages: [],
    lastReceivedMessage: {} as Message
}
const messagesSlice = createSlice({
    name: "messages",
    initialState,
    reducers: {
        addMessage: (state = initialState, action: PayloadAction<Message>) => {
            state.messages.push(action.payload)
        },
        setHistoryOfChat: (state = initialState, action: PayloadAction<Message[]>) => {
            state.messages = action.payload
        },
        setLastReceivedMessage: (state = initialState, action: PayloadAction<Message>) => {
            state.lastReceivedMessage = action.payload
        }
    }
})
export const {
    addMessage,
    setHistoryOfChat,
    setLastReceivedMessage
} = messagesSlice.actions
export default messagesSlice.reducer