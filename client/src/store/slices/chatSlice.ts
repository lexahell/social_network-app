import {createSlice, PayloadAction} from "@reduxjs/toolkit";
interface ChatState {
    isChatSelected: boolean;
}
const initialState: ChatState = {
    isChatSelected: false
}
const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        setIsChatSelected: (state, action: PayloadAction<boolean>) => {
            state.isChatSelected = action.payload
        }
    }
})
export const { setIsChatSelected } = chatSlice.actions
export default chatSlice.reducer