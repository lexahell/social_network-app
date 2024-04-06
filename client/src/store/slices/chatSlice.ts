import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {UserStatus} from "../../types/UserStatus.ts";

interface ChatState {
  isChatSelected: boolean;
  recipientAvatar: string;
  recipientNickname: string;
  recipientUsername: string;
  status: UserStatus;
}
const initialState: ChatState = {
  isChatSelected: false,
  recipientAvatar: '',
  recipientNickname: '',
  recipientUsername: '',
  status: UserStatus.OFFLINE
};
const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setIsChatSelected: (state, action: PayloadAction<boolean>) => {
      state.isChatSelected = action.payload;
    },
    setRecipientAvatar: (state, action: PayloadAction<string>) => {
      state.recipientAvatar = action.payload;
    },
    setRecipientNickname: (state, action: PayloadAction<string>) => {
      state.recipientNickname = action.payload;
    },
    setRecipientUsername: (state = initialState, action: PayloadAction<string>) => {
      state.recipientUsername = action.payload
    },
    setStatus: (state, action: PayloadAction<UserStatus>) => {
      state.status = action.payload;
    },
  },
});
export const {
  setIsChatSelected,
  setRecipientAvatar,
  setRecipientNickname,
  setRecipientUsername,
  setStatus
} = chatSlice.actions;
export default chatSlice.reducer;
