import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AuthType} from "../../types/AuthType.ts";

interface AuthState {
    nickName: string;
    userName: string;
    authType: AuthType;
    isAuthNotificationShown: boolean;
}
const initialState: AuthState = {
    nickName: "",
    userName: "",
    authType: AuthType.NOT_AUTHED,
    isAuthNotificationShown: false
}

const authSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setNickName: (state = initialState, action: PayloadAction<string>) => {
            state.nickName = action.payload
        },
        setUserName: (state = initialState, action: PayloadAction<string>) => {
            state.userName = action.payload
        },
        setAuthType: (state = initialState, action: PayloadAction<AuthType>) => {
            state.authType = action.payload
        },
        setIsAuthNotificationShown: (state = initialState, action: PayloadAction<boolean>) => {
            state.isAuthNotificationShown = action.payload
        }
    }
})
export const {setNickName, setAuthType, setIsAuthNotificationShown, setUserName} = authSlice.actions
export default authSlice.reducer