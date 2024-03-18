import { createSlice, PayloadAction } from '@reduxjs/toolkit';
interface ChatState {
  isChatSelected: boolean;
  userAvatar: string;
  userName: string;
  status: UserStatus;
}
export enum UserStatus {
  ONLINE,
  OFFLINE,
}
const initialState: ChatState = {
  isChatSelected: false,
  userAvatar: '',
  userName: '',
  status: UserStatus.OFFLINE,
};
const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setIsChatSelected: (state, action: PayloadAction<boolean>) => {
      state.isChatSelected = action.payload;
    },
    setUserAvatar: (state, action: PayloadAction<string>) => {
      state.userAvatar = action.payload;
    },
    setUserName: (state, action: PayloadAction<string>) => {
      state.userName = action.payload;
    },
    setStatus: (state, action: PayloadAction<UserStatus>) => {
      state.status = action.payload;
    },
  },
});
export const { setIsChatSelected, setUserAvatar, setUserName, setStatus } =
  chatSlice.actions;
export default chatSlice.reducer;
