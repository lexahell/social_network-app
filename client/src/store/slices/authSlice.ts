import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AuthType} from "../../types/AuthType.ts";
import {UserStatus} from "../../types/UserStatus.ts";

interface AuthState {
    nickname: string;
    username: string;
    authType: AuthType;
    userStatus: UserStatus;
    isAuthNotificationShown: boolean;
}
const initialState: AuthState = {
    nickname: "",
    username: "",
    userStatus: UserStatus.OFFLINE,
    authType: AuthType.NOT_AUTHED,
    isAuthNotificationShown: false
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setNickname: (state, action: PayloadAction<string>) => {
            state.nickname = action.payload
        },
        setUsername: (state, action: PayloadAction<string>) => {
            state.username = action.payload
        },
        setUserStatus: (state, action: PayloadAction<UserStatus>) => {
            state.userStatus = action.payload
        },
        setAuthType: (state, action: PayloadAction<AuthType>) => {
            state.authType = action.payload
        },
        setIsAuthNotificationShown: (state, action: PayloadAction<boolean>) => {
            state.isAuthNotificationShown = action.payload
        }
    }
})
export const {
    setNickname,
    setAuthType,
    setIsAuthNotificationShown,
    setUsername,
    setUserStatus
} = authSlice.actions
export default authSlice.reducer