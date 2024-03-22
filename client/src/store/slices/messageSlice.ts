import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Message} from "../../types/Message.ts";
interface MessagesState {
    messages: Message[];
}
const initialState: MessagesState = {
    messages: []
}
const messagesSlice = createSlice({
    name: "messages",
    initialState,
    reducers: {
        addMessage: (state = initialState, action: PayloadAction<Message>) => {
            state.messages.push(action.payload)
        }
    }
})
export const {addMessage} = messagesSlice.actions
export default messagesSlice.reducer