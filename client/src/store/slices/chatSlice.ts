import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {UserStatus} from "../../types/UserStatus.ts";

interface ChatState {
  isChatSelected: boolean;
  recipientAvatar: string;
  recipientNickname: string;
  recipientUsername: string;
  recipientStatus: UserStatus;
}
const initialState: ChatState = {
  isChatSelected: false,
  recipientAvatar: '',
  recipientNickname: '',
  recipientUsername: '',
  recipientStatus: UserStatus.OFFLINE
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
    setRecipientStatus: (state, action: PayloadAction<UserStatus>) => {
      state.recipientStatus = action.payload;
    },

  },
});
export const {
  setIsChatSelected,
  setRecipientAvatar,
  setRecipientNickname,
  setRecipientUsername,
  setRecipientStatus,
} = chatSlice.actions;
export default chatSlice.reducer;
