import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AuthType} from "../../types/AuthType.ts";

interface AuthState {
    nickName: string;
    token: string;
    authType: AuthType;
    isAuthNotificationShown: boolean;
}
const initialState: AuthState = {
    nickName: "",
    token: "",
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
        setToken: (state = initialState, action: PayloadAction<string>) => {
            state.token = action.payload
        },
        setAuthType: (state = initialState, action: PayloadAction<AuthType>) => {
            state.authType = action.payload
        },
        setIsAuthNotificationShown: (state = initialState, action: PayloadAction<boolean>) => {
            state.isAuthNotificationShown = action.payload
        }
    }
})
export const {setNickName, setToken, setAuthType, setIsAuthNotificationShown} = authSlice.actions
export default authSlice.reducer